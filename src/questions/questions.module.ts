import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "./entities/Category";
import {Question} from "./entities/Question";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Question])],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
