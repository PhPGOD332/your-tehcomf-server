import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class ClaimDto {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  mobilePhone: string;
  @ApiProperty()
  @IsString()
  note: string;
  @ApiProperty()
  @IsDate()
  date: Date;
  @ApiProperty()
  @IsBoolean()
  callDesign: boolean;
  @ApiProperty()
  @IsBoolean()
  discussProject: boolean;

  constructor(data: ClaimDto) {
    this.firstName = data.firstName;
    this.mobilePhone = data.mobilePhone;
    this.note = data.note;
    this.date = data.date;
    this.callDesign = data.callDesign;
    this.discussProject = data.discussProject;
  }
}
