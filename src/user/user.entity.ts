import { ArticleEntity } from '../article/article.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 100, nullable: false })
    name: string;

    @Column({ name: 'email', length: 70, nullable: false, unique: true })
    email: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @OneToMany(() => ArticleEntity, (articles) => articles.fk_author)
    articles: ArticleEntity[];
}
