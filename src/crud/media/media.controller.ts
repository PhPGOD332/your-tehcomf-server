import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
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
import { FileInterceptor } from '@nestjs/platform-express';
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
}
