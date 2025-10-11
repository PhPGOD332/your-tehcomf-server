import {Controller, Get} from '@nestjs/common';
import {QuestionsService} from "./questions.service";
import {Category} from "./entities/Category";

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {
    }

    @Get('categories')
    async getAllCategories(): Promise<Category[]> {
        return await this.questionsService.getAllCategories();
    }

    @Get('categoriesWithQuestions')
    async getAllQuestionsByCategories(): Promise<Category[]> {
        return await this.questionsService.getQuestionsByCategories();
    }
}
