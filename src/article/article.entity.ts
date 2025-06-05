import { CategoryEntity } from '../category/category.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'article' })
export class ArticleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'title', length: 100, nullable: false })
    title: string;

    @Column({ name: 'slug', length: 100, nullable: false })
    slug: string;

    @Column({ name: 'description', length: 100, nullable: false })
    description: string;

    @Column({ name: 'content', length: 100, nullable: false })
    content: string;

    @Column('simple-array', { name: 'tag' })
    tag: string[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, (category) => category.articles)
    category: CategoryEntity;

    @ManyToOne(() => UserEntity, (users) => users.articles)
    fk_author: UserEntity;

    @OneToMany(() => ProductEntity, (products) => products.fk_article)
    products: ProductEntity[];
}
