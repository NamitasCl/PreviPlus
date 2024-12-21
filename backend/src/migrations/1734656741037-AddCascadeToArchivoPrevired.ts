import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeToArchivoPrevired implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Elimina la clave foránea actual
    await queryRunner.query(
      `ALTER TABLE "archivo_previred_generado" DROP CONSTRAINT "FK_70c7ed9f707354ebd733d751e96"`
    );

    // Agrega la nueva clave foránea con ON DELETE CASCADE
    await queryRunner.query(
      `ALTER TABLE "archivo_previred_generado" ADD CONSTRAINT "FK_70c7ed9f707354ebd733d751e96" FOREIGN KEY ("negocio_id") REFERENCES "negocio"("id") ON DELETE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir el cambio en caso de que se deshaga la migración
    await queryRunner.query(
      `ALTER TABLE "archivo_previred_generado" DROP CONSTRAINT "FK_70c7ed9f707354ebd733d751e96"`
    );

    await queryRunner.query(
      `ALTER TABLE "archivo_previred_generado" ADD CONSTRAINT "FK_70c7ed9f707354ebd733d751e96" FOREIGN KEY ("negocio_id") REFERENCES "negocio"("id")`
    );
  }
}
