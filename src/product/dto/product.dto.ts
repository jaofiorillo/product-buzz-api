import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ProductDto {
    @ApiProperty({ example: '20' })
    @IsString()
    price: string;

    @ApiProperty({ example: 'http://produto.com.br' })
    @IsString()
    link: string;

    @ApiProperty({ example: '3141414109' })
    @IsString()
    image: string;
}

export class ProductResponse {
    id: string;
    price: string;
    link: string;
    image: string;
}
