import { Module } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
