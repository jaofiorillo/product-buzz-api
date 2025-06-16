import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ArticleService } from 'src/article/article.service';
import { ArticleEntity } from 'src/article/article.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CategoryModule } from 'src/category/category.module';
import { EmailModule } from 'src/emails/email.module';

@Module({
    imports: [
        CategoryModule,
        EmailModule,
        TypeOrmModule.forFeature([ProductEntity, ArticleEntity]),
    ],
    controllers: [ProductController],
    providers: [ProductService, ArticleService],
    exports: [ProductService],
})
export class ProductModule {}
