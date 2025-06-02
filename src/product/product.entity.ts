import { ArticleEntity } from '../article/article.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'price', length: 100, nullable: false })
    price: string;

    @Column({ name: 'link', length: 100 })
    link: string;

    @Column({ name: 'image', length: 500 })
    image: string;

    @ManyToOne(() => ArticleEntity, (article) => article.products)
    fk_article: ArticleEntity;
}
