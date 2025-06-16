import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CategoryModule } from 'src/category/category.module';
import { EmailService } from 'src/emails/email.service';
import { EmailModule } from 'src/emails/email.module';
import { EmailEntity } from 'src/emails/email.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ArticleEntity,
            ProductEntity,
            CategoryEntity,
            EmailEntity,
        ]),
        CategoryModule,
        EmailModule,
    ],
    controllers: [ArticleController],
    providers: [ArticleService, ProductService],
})
export class ArticleModule {}
