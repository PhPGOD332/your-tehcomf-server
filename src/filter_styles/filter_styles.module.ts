import { Module } from '@nestjs/common';
import { FilterStylesController } from './filter_styles.controller';
import { FilterStylesService } from './filter_styles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterStyle } from './entities/FilterStyle';

@Module({
  imports: [TypeOrmModule.forFeature([FilterStyle])],
  controllers: [FilterStylesController],
  providers: [FilterStylesService],
})
export class FilterStylesModule {}
