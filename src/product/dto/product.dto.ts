import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ProductDto {
    @ApiProperty({ example: '20' })
    @IsString()
    price: string;

    @ApiProperty({ example: 'http://produto.com.br' })
    @IsString()
    link: string;

    @ApiProperty({ example: 'ROUPA' })
    @IsString()
    @IsNotEmpty({
        message: 'A categoria do produto é obrigatório',
    })
    category: string;

    @ApiProperty({ example: '3141414109' })
    @IsString()
    image: string;
}
