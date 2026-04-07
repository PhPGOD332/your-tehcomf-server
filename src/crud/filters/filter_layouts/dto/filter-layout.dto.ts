import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFilterLayoutDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  caption: string;

  @ApiProperty({ default: 'layout' })
  @IsString()
  type: string;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order: number;
}

export class UpdateFilterLayoutDto extends PartialType(CreateFilterLayoutDto) {}
