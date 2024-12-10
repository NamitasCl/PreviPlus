import { DataSource, EntityManager } from "typeorm";
import { InformacionLaboral } from "../entities/InformacionLaboral.entity.js";

export class InformacionLaboralService {
  constructor(private readonly dataSource: DataSource) {}

  async activarContrato(trabajadorId: number, negocioId: number, contratoId: number) {
    await this.dataSource.manager.transaction(async (manager: EntityManager) => {
      // Desactivar otros contratos activos
      await manager.update(
        InformacionLaboral,
        { trabajador: { id: trabajadorId }, negocio: { id: negocioId }, isContratoActivo: true },
        { isContratoActivo: false }
      );

      // Activar el nuevo contrato
      await manager.update(InformacionLaboral, { id: contratoId }, { isContratoActivo: true });
    });
  }

  async finiquitarContrato(contratoId: number) {
    await this.dataSource.manager.update(InformacionLaboral, { id: contratoId }, { isContratoActivo: false });
  }
}
