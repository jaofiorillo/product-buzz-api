import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,
    ) {}

    async findAll(): Promise<CategoryEntity[]> {
        return await this.categoryRepository.find();
    }

    async findById(id: string) {
        return this.categoryRepository
            .findOneByOrFail({ id: id })
            .catch(() => {
                throw new NotFoundException('Category not found');
            })
            .then((card) => {
                return card;
            });
    }

    async create(name: string) {
        const category = new CategoryEntity();
        category.name = name;
        return await this.categoryRepository.save(category);
    }
}
