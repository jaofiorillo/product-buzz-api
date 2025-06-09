import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { Public } from 'src/decorators/decorators';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
    async create(@Body() articleDto: ArticleDto) {
        await this.articleService.create(articleDto);
    }

    @Public()
    @Get()
    async getAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return await this.articleService.findAll(page, limit);
    }
}
