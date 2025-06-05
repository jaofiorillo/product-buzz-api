import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ArticleEntity,
            ProductEntity,
            CategoryEntity,
        ]),
        CategoryModule,
    ],
    controllers: [ArticleController],
    providers: [ArticleService, ProductService],
})
export class ArticleModule {}
