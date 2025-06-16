import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ArticleDto, ArticleResponse } from './dto/article.dto';
import { ProductService } from 'src/product/product.service';
import { plainToInstance } from 'class-transformer';
import { ProductResponse } from 'src/product/dto/product.dto';
import { CategoryService } from 'src/category/category.service';
import { ArticleFilters } from './dto/article.filters';
import { EmailService } from 'src/emails/email.service';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        private readonly productService: ProductService,
        private readonly categoryService: CategoryService,
        private readonly emailService: EmailService,
    ) {}

    async create(articleDto: ArticleDto) {
        const category = await this.categoryService.findById(
            articleDto.fk_category,
        );

        const savedProducts = await Promise.all(
            articleDto.products.map((productDto) =>
                this.productService.create(productDto),
            ),
        );

        const article = this.articleRepository.create(articleDto);
        article.products = savedProducts;
        article.category = category;

        const new_article = await this.articleRepository.save(article);

        this.emailService.sendEmail('New Project!', {
            title: 'New Project!',
            articleName: new_article.title,
            url: 'google.com',
        });
    }

    async findAll(page: number, limit: number, filters: ArticleFilters) {
        const builder = await this.articleRepository
            .createQueryBuilder('article')
            .innerJoinAndSelect('article.products', 'product')
            .innerJoinAndSelect('article.category', 'category');

        this.buildFilters(builder, filters);
        const [articles, total] = await builder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        const items = articles.map((article) => {
            const products = plainToInstance(ProductResponse, article.products);
            const articleResponse = plainToInstance(ArticleResponse, article);
            articleResponse.products = products;
            articleResponse.category = article.category.name;
            return articleResponse;
        });

        return {
            items,
            total,
            page,
            limit,
        };
    }

    private buildFilters(
        builder: SelectQueryBuilder<ArticleEntity>,
        filters: ArticleFilters,
    ) {
        if (filters.title != null) {
            builder.where('article.title ILIKE :title', {
                title: `%${filters.title}%`,
            });
        }
        if (filters.category != null) {
            builder.andWhere('article.category = :category', {
                category: filters.category,
            });
        }
    }

    async findById(id: string) {
        const article = await this.articleRepository
            .createQueryBuilder('article')
            .innerJoinAndSelect('article.products', 'product')
            .innerJoinAndSelect('article.category', 'category')
            .where('article.id = :id', { id })
            .getOneOrFail();

        const products_response = article.products.map((product) =>
            plainToInstance(ProductResponse, product),
        );

        const article_response = plainToInstance(ArticleResponse, article);
        article_response.products = products_response;
        article_response.category = article.category.name;

        return article_response;
    }
}
