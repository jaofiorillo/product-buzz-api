import { ArticleEntity } from '../article/article.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => ArticleEntity, (article) => article.products)
    fk_article: ArticleEntity;
}
