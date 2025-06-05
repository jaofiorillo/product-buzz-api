import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1749086878202 implements MigrationInterface {
    name = 'PostRefactoring1749086878202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" character varying(100) NOT NULL, "link" character varying(100) NOT NULL, "image" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fkArticleId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "slug" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "content" character varying(100) NOT NULL, "tag" text NOT NULL, "categoryId" uuid, "fkAuthorId" uuid, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ac911be28ba892e9a30d17faa6f" FOREIGN KEY ("fkArticleId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_12824e4598ee46a0992d99ba553" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_606eb8c849a13520af23798a7e7" FOREIGN KEY ("fkAuthorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_606eb8c849a13520af23798a7e7"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_12824e4598ee46a0992d99ba553"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ac911be28ba892e9a30d17faa6f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
