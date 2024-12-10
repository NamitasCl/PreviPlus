import { Repository } from "typeorm";
import { AppDataSource } from "../datasource.js";
import { Trabajador } from "../entities/Trabajador.entity.js";


export class RemuneracionService {
  private trabajadorRepository: Repository<Trabajador>;

  constructor() {
    this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
  }

  // Método para procesar las remuneraciones de un trabajador
  async procesarRemuneraciones(trabajadorId: number): Promise<void> {
    const trabajador = await this.trabajadorRepository.findOne({
      where: { id: trabajadorId },
      relations: ["historialRemuneraciones"],
    });

    if (!trabajador) {
      throw new Error("Trabajador no encontrado");
    }

    // Aquí puedes agregar la lógica para procesar las remuneraciones del trabajador
    // Por ejemplo, calcular sueldos, actualizar registros, etc.
  }
}
