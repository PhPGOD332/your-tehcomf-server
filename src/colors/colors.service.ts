import { Injectable } from '@nestjs/common';
import { Color } from './entities/Color';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  async getColors(): Promise<Color[]> {
    return await this.colorRepository.find();
  }
}
