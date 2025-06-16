import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ProductDto } from 'src/product/dto/product.dto';

export class ArticleDto {
    @ApiProperty({ example: 'article for technology' })
    @IsString()
    @IsNotEmpty({
        message: 'the title field is required',
    })
    title: string;

    @ApiProperty({ example: 'file' })
    @IsString()
    @IsNotEmpty({
        message: 'the slug field is required',
    })
    slug: string;

    @ApiProperty({ example: 'article for technology' })
    @IsString()
    @IsNotEmpty({
        message: 'the description field is required',
    })
    description: string;

    @ApiProperty({ example: '3141414109' })
    @IsString()
    @IsNotEmpty({
        message: 'the content field is required',
    })
    content: string;

    @ApiProperty({ example: 'technology' })
    @IsArray()
    tag: string[];

    @ApiProperty({ example: '1' })
    @IsString()
    @IsNotEmpty({
        message: 'the category field is required',
    })
    fk_category: string;

    @ApiProperty({
        type: ProductDto,
        isArray: true,
        example: [
            {
                price: '30',
                link: 'http://33',
                image: '1234',
            },
        ],
    })
    @IsNotEmpty({
        message: 'the products is required',
    })
    products: ProductDto[];
}

export class ArticleResponse {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    tag: string[];
    products: ProductDto[];
}
