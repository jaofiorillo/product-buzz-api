import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
    async create(@Body() articleDto: ArticleDto) {
        await this.articleService.create(articleDto);
    }

    @Get()
    async getAll() {
        return await this.articleService.findAll();
    }
}
