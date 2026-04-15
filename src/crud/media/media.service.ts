import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/crud/database';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { UploadGalleryImageDto } from './dto/upload-gallery-image.dto';
import { UpdateGalleryImageDto } from './dto/update-gallery-image.dto';
import { resolveAbsoluteMediaUrl } from '@/common/media-url.util';
import { Image, Prisma } from '@prisma/client';

@Injectable()
export class MediaService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly mediaRootFolder: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const region = this.configService.get<string>('S3_REGION') ?? 'ru-central1';
    const endpoint = this.configService.get<string>('S3_ENDPOINT');
    const accessKeyId = this.configService.get<string>('S3_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'S3_SECRET_ACCESS_KEY',
    );
    const forcePathStyle =
      this.configService.get<string>('S3_FORCE_PATH_STYLE') === 'true';

    this.bucket = this.configService.get<string>('S3_BUCKET') ?? '';
    this.mediaRootFolder =
      this.configService.get<string>('S3_MEDIA_ROOT') ??
      'tehcomf/media/kitchens';

    this.s3Client = new S3Client({
      region,
      endpoint: endpoint || undefined,
      forcePathStyle,
      credentials:
        accessKeyId && secretAccessKey
          ? {
              accessKeyId,
              secretAccessKey,
            }
          : undefined,
    });
  }

  async listGalleryImages(): Promise<Image[]> {
    const images = await this.prisma.image.findMany({
      orderBy: [{ order: 'asc' }, { id: 'desc' }],
    });

    return images.map((image) => this.withAbsoluteUrl(image));
  }

  async uploadGalleryImage(
    file: Express.Multer.File,
    uploadDto: UploadGalleryImageDto,
  ): Promise<Image> {
    this.validateUpload(file);
    this.ensureS3Configured();

    console.log('Пришел файл, загружается');
    console.log(file);

    const folder = this.normalizeFolder(
      uploadDto.folder ?? this.mediaRootFolder,
    );
    const key = this.buildObjectKey(folder, file.originalname);

    try {
      console.log('Отправка файла в s3');
      console.log('То что отправляется:');
      console.log(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Ошибка при загрузке файла в S3: ${String(error)}`,
      );
    }

    console.log('файл загрузился, загружается в бд');
    const imageCreateData: Prisma.ImageCreateInput = {
      src: this.buildPublicUrl(key),
      s3Key: key,
      imageAlt: uploadDto.imageAlt?.trim() || file.originalname,
      order: uploadDto.order,
      width: uploadDto.width,
      height: uploadDto.height,
    };

    const image = await this.createImageWithRetry(imageCreateData, key);

    return this.withAbsoluteUrl(image);
  }

  async uploadGalleryImages(
    files: Express.Multer.File[],
    uploadItems: UploadGalleryImageDto[],
  ): Promise<Image[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('Нужно передать хотя бы один файл');
    }

    if (!uploadItems || uploadItems.length !== files.length) {
      throw new BadRequestException(
        'Количество элементов items должно совпадать с количеством файлов',
      );
    }

    const uploadedImages: Image[] = [];

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const uploadDto = uploadItems[index] ?? {};
      const image = await this.uploadGalleryImage(file, uploadDto);
      uploadedImages.push(image);
    }

    return uploadedImages;
  }

  async updateGalleryImage(
    id: number,
    updateDto: UpdateGalleryImageDto,
  ): Promise<Image> {
    await this.ensureImageExists(id);

    const image = await this.prisma.image.update({
      where: { id },
      data: {
        imageAlt: updateDto.imageAlt,
        order: updateDto.order,
        width: updateDto.width,
        height: updateDto.height,
      },
    });

    return this.withAbsoluteUrl(image);
  }

  async deleteGalleryImage(id: number): Promise<void> {
    const image = await this.ensureImageExists(id);

    await this.prisma.$transaction(async (tx) => {
      await tx.portfolioImagesList.deleteMany({
        where: { imageId: id },
      });

      await tx.image.delete({
        where: { id },
      });
    });

    if (!image.s3Key) {
      return;
    }

    this.ensureS3Configured();

    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: image.s3Key,
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Файл в БД удален, но не удалось удалить объект из S3: ${String(error)}`,
      );
    }
  }

  private async ensureImageExists(id: number): Promise<Image> {
    const image = await this.prisma.image.findUnique({ where: { id } });

    if (!image) {
      throw new NotFoundException(`Изображение с id=${id} не найдено`);
    }

    return image;
  }

  private async createImageWithRetry(
    imageCreateData: Prisma.ImageCreateInput,
    s3Key: string,
  ): Promise<Image> {
    try {
      return await this.prisma.image.create({
        data: imageCreateData,
      });
    } catch (error) {
      if (this.isDuplicateImageIdError(error)) {
        try {
          await this.resyncImageIdSequence();
          return await this.prisma.image.create({
            data: imageCreateData,
          });
        } catch (retryError) {
          await this.tryDeleteS3Object(s3Key);
          throw this.createImagePersistException(retryError);
        }
      }

      await this.tryDeleteS3Object(s3Key);
      throw this.createImagePersistException(error);
    }
  }

  private isDuplicateImageIdError(error: unknown): boolean {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
      return false;
    }

    if (error.code !== 'P2002') {
      return false;
    }

    const target = error.meta?.target;

    if (Array.isArray(target)) {
      return target.includes('id');
    }

    return typeof target === 'string' && target.includes('id');
  }

  private async resyncImageIdSequence(): Promise<void> {
    await this.prisma.$executeRaw`
      SELECT setval(
        pg_get_serial_sequence('"nsi_images"', 'id'),
        COALESCE((SELECT MAX(id) FROM "nsi_images"), 0) + 1,
        false
      );
    `;
  }

  private createImagePersistException(
    error: unknown,
  ): InternalServerErrorException {
    return new InternalServerErrorException(
      'Файл загружен в S3, но не удалось сохранить запись в БД',
      { cause: error },
    );
  }

  private async tryDeleteS3Object(key: string): Promise<void> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
    } catch {
      // Игнорируем ошибку очистки, чтобы не потерять первичную причину сбоя записи в БД.
    }
  }

  private withAbsoluteUrl(image: Image): Image {
    return {
      ...image,
      src: resolveAbsoluteMediaUrl(
        image.src,
        this.configService.get<string>('API_URL'),
      ),
    };
  }

  private buildObjectKey(folder: string, originalName: string): string {
    const extension = extname(originalName) || '';
    return `${folder}/${Date.now()}-${randomUUID()}${extension}`;
  }

  private buildPublicUrl(key: string): string {
    const publicBaseUrl = this.configService.get<string>('S3_PUBLIC_BASE_URL');
    const endpoint = this.configService.get<string>('S3_ENDPOINT');

    if (publicBaseUrl) {
      return `${publicBaseUrl.replace(/\/+$/, '')}/${key}`;
    }

    if (endpoint) {
      return `${endpoint.replace(/\/+$/, '')}/${this.bucket}/${key}`;
    }

    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }

  private normalizeFolder(folder: string): string {
    return folder.replace(/^\/+/, '').replace(/\/+$/, '');
  }

  private validateUpload(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('Файл изображения обязателен');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Допускаются только изображения');
    }
  }

  private ensureS3Configured(): void {
    if (!this.bucket) {
      throw new InternalServerErrorException('S3_BUCKET не настроен');
    }
  }
}
