import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeToRelations1734656286298 implements MigrationInterface {
    name = 'AddCascadeToRelations1734656286298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salud" ALTER COLUMN "tasaSalud" SET DEFAULT '0.07'`);
        await queryRunner.query(`ALTER TABLE "salud" ALTER COLUMN "tasaSaludCcaf" SET DEFAULT '0.016'`);
        await queryRunner.query(`ALTER TABLE "informacion_laboral" ALTER COLUMN "tasaTrabajadorCesantia" SET DEFAULT '0.006'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "informacion_laboral" ALTER COLUMN "tasaTrabajadorCesantia" SET DEFAULT 0.006`);
        await queryRunner.query(`ALTER TABLE "salud" ALTER COLUMN "tasaSaludCcaf" SET DEFAULT 0.016`);
        await queryRunner.query(`ALTER TABLE "salud" ALTER COLUMN "tasaSalud" SET DEFAULT 0.07`);
    }

}
