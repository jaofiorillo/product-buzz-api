import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserDto {
    @IsString()
    @IsNotEmpty({
        message: 'O nome é obrigatório',
    })
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({
        message: 'O email é obrigatório',
    })
    email: string;

    @IsString()
    @IsNotEmpty({
        message: 'A senha é obrigatório',
    })
    password: string;
}

export class UserResponse {
    id: string;
    name: string;
    email: string;
    @Exclude()
    password: string;
}
