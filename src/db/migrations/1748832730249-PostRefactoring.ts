import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1748832730249 implements MigrationInterface {
    name = 'PostRefactoring1748832730249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "articlesId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_c78d10544fa53d1f1f82abeed01" FOREIGN KEY ("articlesId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_c78d10544fa53d1f1f82abeed01"`);
        await queryRunner.query(`ALTER TABLE "article" ADD "category" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
