import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FilterStyle} from "./entities/FilterStyle";

@Injectable()
export class FilterStylesService {
    constructor(
        @InjectRepository(FilterStyle)
        private filterStyleRepository: Repository<FilterStyle>
    ) {}

    async getFilterStyles(): Promise<FilterStyle[]> {
        return await this.filterStyleRepository.find();
    }
}
