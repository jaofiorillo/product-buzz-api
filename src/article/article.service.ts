import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleDto } from './dto/article.dto';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';

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
            let save_product = await this.productService.create(products_dto);
            save_products.push(save_product);
        }

        let new_article = this.articleRepository.create(articleDto);
        new_article.products = save_products;
        await this.articleRepository.save(new_article);
    }

    async findAll(): Promise<ArticleEntity[]> {
        return await this.articleRepository.find();
    }
}
