import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1749084859519 implements MigrationInterface {
    name = 'PostRefactoring1749084859519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_c78d10544fa53d1f1f82abeed01"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "articlesId"`);
        await queryRunner.query(`ALTER TABLE "article" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_12824e4598ee46a0992d99ba553" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_12824e4598ee46a0992d99ba553"`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "articlesId" uuid`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_c78d10544fa53d1f1f82abeed01" FOREIGN KEY ("articlesId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
