import { Body, Controller, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async create(@Body() prouctDto: ProductDto) {
        await this.productService.create(prouctDto);
    }
}
