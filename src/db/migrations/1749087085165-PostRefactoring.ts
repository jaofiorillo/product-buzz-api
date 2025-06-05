import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1749087085165 implements MigrationInterface {
    name = 'PostRefactoring1749087085165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "article" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "created_at"`);
    }

}
