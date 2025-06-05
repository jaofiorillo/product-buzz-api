import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './config/db.config.service';
import { ProductModule } from './product/product.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [
        UserModule,
        ProductModule,
        ArticleModule,
        CategoryModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: PostgresConfigService,
            inject: [PostgresConfigService],
        }),
    ],
})
export class AppModule {}
