import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleDto, ArticleResponse } from './dto/article.dto';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';
import { plainToInstance } from 'class-transformer';
import { ProductDto, ProductResponse } from 'src/product/dto/product.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        private readonly productService: ProductService,
    ) {}

    async create(articleDto: ArticleDto) {
        const save_products: ProductEntity[] = [];

        for (let products_dto of articleDto.products) {
            const save_product = await this.productService.create(products_dto);
            save_products.push(save_product);
        }

        let new_article = this.articleRepository.create(articleDto);
        new_article.products = save_products;
        await this.articleRepository.save(new_article);
    }

    async findAll(page: number, limit: number) {
        const [articles, total] = await this.articleRepository
            .createQueryBuilder('article')
            .innerJoinAndSelect('article.products', 'product')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        const articles_response: ArticleResponse[] = [];

        if (articles.length > 0) {
            for (let article of articles) {
                let products_response = plainToInstance(
                    ProductResponse,
                    article.products,
                );
                let article_response = plainToInstance(
                    ArticleResponse,
                    article,
                );
                article_response.products = products_response;
                articles_response.push(article_response);
            }
        }

        return {
            items: articles_response,
            total,
            page,
            limit,
        };
    }
}
