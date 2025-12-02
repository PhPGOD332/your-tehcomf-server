import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FilterType} from "./entites/FilterType";

@Injectable()
export class FilterTypesService {
    constructor(
        @InjectRepository(FilterType)
        private typeRepository: Repository<FilterType>
    ) {}

    async getFilterTypes(): Promise<FilterType[]> {
        return await this.typeRepository.find();
    }
}
