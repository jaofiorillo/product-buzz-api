import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ArticleFilters {
    @ApiProperty({ example: 'article for technology' })
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @ApiProperty({ example: '1' })
    @IsString()
    category?: string;
}
