import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FilterColor} from "./entities/FilterColor";

@Injectable()
export class FilterColorsService {
    constructor(
        @InjectRepository(FilterColor)
        private filterColorRepository: Repository<FilterColor>
    ) {}

    async getFilterColors(): Promise<FilterColor[]> {
        return await this.filterColorRepository.find();
    }
}
