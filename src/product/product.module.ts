import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ArticleService } from 'src/article/article.service';
import { ArticleEntity } from 'src/article/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, ArticleEntity])],
    controllers: [ProductController],
    providers: [ProductService, ArticleService],
})
export class ProductModule {}
