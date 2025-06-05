import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(@Body('name') name: string) {
        await this.categoryService.create(name);
    }

    @Get()
    async getAll() {
        return await this.categoryService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.categoryService.findById(id);
    }
}
