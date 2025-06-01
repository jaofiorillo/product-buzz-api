import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, ProductEntity])],
    controllers: [ArticleController],
    providers: [ArticleService, ProductService],
})
export class ArticleModule {}
