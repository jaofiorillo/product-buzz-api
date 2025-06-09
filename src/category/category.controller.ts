import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Public } from 'src/decorators/decorators';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(@Body('name') name: string) {
        await this.categoryService.create(name);
    }

    @Get()
    @Public()
    async getAll() {
        return await this.categoryService.findAll();
    }

    @Get(':id')
    @Public()
    async findById(@Param('id') id: string) {
        return await this.categoryService.findById(id);
    }
}
