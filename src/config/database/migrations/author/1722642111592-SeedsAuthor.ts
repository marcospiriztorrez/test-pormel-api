import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedsAuthor1722642111592 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO author (id, name, "createdAt", "updatedAt") VALUES
            (uuid_generate_v4(), 'Contexto', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (uuid_generate_v4(), 'Planeta', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (uuid_generate_v4(), 'Sonríe', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM author WHERE name IN ('Contexto', 'Planeta', 'Sonríe')`
        );
    }

}
