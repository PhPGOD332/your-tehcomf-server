import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FilterLayout} from "./entities/FilterLayout";

@Injectable()
export class FilterLayoutsService {
    constructor(
        @InjectRepository(FilterLayout)
        private filterLayoutRepository: Repository<FilterLayout>
    ) {}

    async getFilterLayouts(): Promise<FilterLayout[]> {
        return await this.filterLayoutRepository.find();
    }
}
