import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeToInformacionLaboral implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Elimina la clave foránea existente
    await queryRunner.query(
      `ALTER TABLE "informacion_laboral" DROP CONSTRAINT "FK_a8fdee3c02b934e8a50adc1803d"`
    );

    // Agrega la nueva clave foránea con ON DELETE CASCADE
    await queryRunner.query(
      `ALTER TABLE "informacion_laboral" ADD CONSTRAINT "FK_a8fdee3c02b934e8a50adc1803d" FOREIGN KEY ("negocio_id") REFERENCES "negocio"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir el cambio en caso de que se deshaga la migración
    await queryRunner.query(
      `ALTER TABLE "informacion_laboral" DROP CONSTRAINT "FK_a8fdee3c02b934e8a50adc1803d"`
    );

    await queryRunner.query(
      `ALTER TABLE "informacion_laboral" ADD CONSTRAINT "FK_a8fdee3c02b934e8a50adc1803d" FOREIGN KEY ("negocio_id") REFERENCES "negocio"("id")`
    );
  }
}