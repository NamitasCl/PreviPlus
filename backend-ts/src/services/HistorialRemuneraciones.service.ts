import { Repository } from "typeorm";
import { AppDataSource } from "../datasource.js";
import { HistorialRemuneracion } from "../entities/HistorialRemuneracion.entity.js";

export class HistorialRemuneraciones {
  private historialRepository: Repository<HistorialRemuneracion>;

  constructor() {
    this.historialRepository = AppDataSource.getRepository(HistorialRemuneracion);
  }

  /**
   * Obtiene el historial de remuneraciones de un trabajador por su ID.
   * @param id - ID del trabajador.
   * @returns Historial de remuneraciones del trabajador.
   */
  async getHistorialRemuneracionesPorTrabajador(id: number): Promise<HistorialRemuneracion[]> {
    const historial = await this.historialRepository.find({
      where: { trabajador: { id } },
      relations: ["trabajador", "informacionLaboral"], // Traemos también las relaciones
    });

    return historial;
  }

  /**
   * Obtiene el historial de remuneraciones de un trabajador por un mes específico.
   * @param mes - Mes de la remuneración (formato `mmyyyy`).
   * @param id - ID del trabajador.
   * @returns Historial de remuneraciones del trabajador en el mes especificado.
   */
  async getHistorialRemuneracionesPorMesYTrabajador(mes: string, id: number): Promise<HistorialRemuneracion[]> {
    const historial = await this.historialRepository.find({
      where: {
        mesRemuneracion: mes,
        trabajador: {
          id: id,
        },
      },
      relations: ["trabajador", "informacionLaboral"], // Traemos también las relaciones
    });

    return historial;
  }

  /**
   * Obtiene el historial de remuneraciones para un mes específico.
   * @param mes - Mes de la remuneración (formato `mmyyyy`).
   * @returns Historial de remuneraciones en el mes especificado.
   */
  async getHistorialRemuneracionesPorMes(mes: string): Promise<HistorialRemuneracion[]> {
    const historial = await this.historialRepository.find({
      where: {
        mesRemuneracion: mes,
      },
      relations: ["trabajador", "informacionLaboral"], // Traemos también las relaciones
    });

    return historial;
  }
}
