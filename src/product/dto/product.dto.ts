import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ProductDto {
    @IsString()
    price: string;

    @IsString()
    link: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({
        message: 'A categoria do produto é obrigatório',
    })
    category: string;

    image: string;
}
