import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'email' })
export class EmailEntity {
    @PrimaryColumn()
    email: string;
}
