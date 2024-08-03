import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPublisher1722644260834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO publisher (id, name, "createdAt", "updatedAt") VALUES
            (uuid_generate_v4(), 'Publisher Argentina', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (uuid_generate_v4(), 'Publisher Uruguay', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            (uuid_generate_v4(), 'Publisher Brasil', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM publiser WHERE name IN ('Publisher Argentina', 'Publisher Uruguay', 'Publisher Brasil')`
        );
    }

}
