import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AdminAccess } from '@/auth/decorators/admin-access.decorator';
import { MediaService } from './media.service';
import { UploadGalleryImageDto } from './dto/upload-gallery-image.dto';
import { UpdateGalleryImageDto } from './dto/update-gallery-image.dto';
import { GalleryImageEntity } from './entities/gallery-image.entity';
import { Image } from '@prisma/client';

@ApiTags('Gallery')
@ApiBearerAuth('access-token')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@AdminAccess()
@Controller('gallery')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({
    summary: 'Получить все изображения галереи',
    description:
      'Возвращает изображения с уже готовым абсолютным URL для вставки в HTML редактор',
  })
  @ApiResponse({ status: 200, type: [GalleryImageEntity] })
  @Get('')
  async listGalleryImages(): Promise<Image[]> {
    return this.mediaService.listGalleryImages();
  }

  @ApiOperation({ summary: 'Загрузить изображение в S3 и сохранить в галерее' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        imageAlt: { type: 'string' },
        folder: { type: 'string', example: 'tehcomf/media/kitchens' },
        order: { type: 'number' },
        width: { type: 'number' },
        height: { type: 'number' },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, type: GalleryImageEntity })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadGalleryImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadGalleryImageDto,
  ): Promise<Image> {
    return this.mediaService.uploadGalleryImage(file, uploadDto);
  }

  @ApiOperation({
    summary: 'Загрузить несколько изображений в S3 и сохранить в галерее',
    description:
      'Загружает массив файлов. Поле items — JSON-массив с метаданными для каждого файла по индексу',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        items: {
          type: 'string',
          description:
            'JSON-массив: [{"imageAlt":"...", "folder":"...", "order":1, "width":1920, "height":1080}]',
          example:
            '[{"imageAlt":"Фото 1","folder":"tehcomf/media/kitchens","order":1,"width":1920,"height":1080},{"imageAlt":"Фото 2","folder":"tehcomf/media/kitchens","order":2,"width":1280,"height":720}]',
        },
      },
      required: ['files', 'items'],
    },
  })
  @ApiResponse({ status: 201, type: [GalleryImageEntity] })
  @UseInterceptors(FilesInterceptor('files', 50))
  @Post('upload-multiple')
  async uploadGalleryImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('items') itemsRaw: string,
  ): Promise<Image[]> {
    const uploadItems = this.parseUploadItems(itemsRaw, files?.length ?? 0);
    return this.mediaService.uploadGalleryImages(files, uploadItems);
  }

  @ApiOperation({ summary: 'Изменить метаданные изображения галереи' })
  @ApiResponse({ status: 200, type: GalleryImageEntity })
  @Patch(':id')
  async updateGalleryImage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGalleryImageDto,
  ): Promise<Image> {
    return this.mediaService.updateGalleryImage(id, updateDto);
  }

  @ApiOperation({
    summary: 'Удалить изображение галереи (и отвязать от портфолио)',
  })
  @ApiResponse({ status: 200, description: 'Изображение удалено' })
  @Delete(':id')
  async deleteGalleryImage(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: true }> {
    await this.mediaService.deleteGalleryImage(id);
    return { success: true };
  }

  private parseUploadItems(
    itemsRaw: unknown,
    filesCount: number,
  ): UploadGalleryImageDto[] {
    if (!itemsRaw) {
      throw new BadRequestException(
        'Поле items обязательно и должно быть JSON-массивом',
      );
    }

    let parsedItems: unknown = itemsRaw;

    if (typeof itemsRaw === 'string') {
      try {
        parsedItems = JSON.parse(itemsRaw);
      } catch {
        throw new BadRequestException(
          'Поле items должно быть валидным JSON-массивом',
        );
      }
    }

    if (!Array.isArray(parsedItems)) {
      throw new BadRequestException('Поле items должно быть массивом');
    }

    if (parsedItems.length !== filesCount) {
      throw new BadRequestException(
        `Количество элементов items (${parsedItems.length}) должно совпадать с количеством файлов (${filesCount})`,
      );
    }

    return parsedItems.map((item, index) =>
      this.validateUploadItem(item, index),
    );
  }

  private validateUploadItem(
    item: unknown,
    index: number,
  ): UploadGalleryImageDto {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new BadRequestException(`items[${index}] должен быть объектом`);
    }

    const uploadItem = plainToInstance(UploadGalleryImageDto, item);
    const errors = validateSync(uploadItem, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const messages = errors
        .flatMap((error) => Object.values(error.constraints ?? {}))
        .join('; ');
      throw new BadRequestException(
        `Некорректные данные в items[${index}]: ${messages || 'ошибка валидации'}`,
      );
    }

    return uploadItem;
  }
}
