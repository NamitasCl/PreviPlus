import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { Negocio } from "../entities/Negocio.entity";
import { Usuario } from "../entities/Usuario.entity";
import { Mutualidad } from "../entities/Mutualidad.entity";
import { CCAF } from "../entities/CCAF.entity";

export class NegocioService {
  private negocioRepository: Repository<Negocio>;
  private usuarioRepository: Repository<Usuario>;
  private mutualidadRepository: Repository<Mutualidad>;
  private ccafRepository: Repository<CCAF>;

  constructor() {
    this.negocioRepository = AppDataSource.getRepository(Negocio);
    this.usuarioRepository = AppDataSource.getRepository(Usuario);
    this.mutualidadRepository = AppDataSource.getRepository(Mutualidad);
    this.ccafRepository = AppDataSource.getRepository(CCAF);
  }

  /**
   * Crear un nuevo negocio.
   * @param negocioData - Datos del negocio.
   * @param userId - ID del usuario autenticado.
   * @returns Negocio creado.
   */
  async crearNegocio(negocioData: {
    rut: string;
    negocioName: string;
    address?: string;
    repLegal?: string;
    rutRepLegal?: string;
    dvRepLegal?: string;
    tieneMutual: boolean;
    mutualNombre: string;
    tieneCcaf: boolean;
    ccafNombre: string;
    isActive: boolean;
  }, userId: number): Promise<Negocio> {
    const {
      rut,
      negocioName,
      address,
      repLegal,
      rutRepLegal,
      dvRepLegal,
      tieneMutual,
      mutualNombre,
      tieneCcaf,
      ccafNombre,
      isActive,
    } = negocioData;

    const existingNegocio = await this.negocioRepository.findOneBy({ rut });
    if (existingNegocio) {
      throw new Error("Negocio con este RUT ya existe.");
    }

    // Parsear los códigos de mutualidad y CCAF
    const codigoMutual = parseInt(mutualNombre.split("-")[0], 10);
    const codigoCcaf = parseInt(ccafNombre.split("-")[0], 10);

    // Buscar mutualidad
    const mutualidad = await this.mutualidadRepository.findOneBy({ codigomutual: codigoMutual });
    if (!mutualidad) {
      throw new Error("Mutualidad no encontrada");
    }

    // Buscar CCAF
    const ccaf = await this.ccafRepository.findOneBy({ codigoccaf: codigoCcaf });
    if (!ccaf) {
      throw new Error("CCAF no encontrada");
    }

    // Obtener el usuario autenticado
    const usuario = await this.usuarioRepository.findOneBy({ id: userId });
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    // Crear el negocio
    const nuevoNegocio = this.negocioRepository.create({
      rut,
      negocioName,
      address,
      repLegal,
      rutRepLegal,
      dvRepLegal,
      isActive,
      mutualidad,
      ccaf,
      usuario,
      tieneCcaf,
      tieneMutual,
    });

    return await this.negocioRepository.save(nuevoNegocio);
  }

  /**
   * Obtener todos los negocios.
   * @returns Lista de negocios.
   */
  async obtenerNegocios(): Promise<Negocio[]> {
    return await this.negocioRepository.find();
  }

  /**
   * Obtener negocios por usuario.
   * @param id - ID del usuario.
   * @returns Lista de negocios asociados al usuario.
   */
  async obtenerNegocioPorUsuario(id: number): Promise<Negocio[]> {
    const respuesta = await this.negocioRepository.find({
      where: { usuario: { id } },
      relations: ["usuario"],
    });

    return respuesta;
  }

  /**
   * Actualizar un negocio.
   * @param id - ID del negocio.
   * @param datosActualizados - Nuevos datos del negocio.
   * @returns Negocio actualizado.
   */
  async actualizarNegocio(id: number, datosActualizados: Partial<Negocio>): Promise<Negocio> {
    const negocio = await this.negocioRepository.findOneBy({ id });

    console.log("Datos actualizados:", datosActualizados);

    if (negocio) {
      Object.assign(negocio, datosActualizados); // Actualizar con los nuevos datos
      return await this.negocioRepository.save(negocio);
    } else {
      throw new Error("Negocio no encontrado");
    }
  }

  /**
   * Eliminar un negocio.
   * @param id - ID del negocio.
   * @returns Mensaje de confirmación.
   */
  async eliminarNegocio(negocioId: number): Promise<void> {
    try {
      const negocio = await this.negocioRepository.findOne({
        where: { id: negocioId },
        relations: ['informacionLaboral', 'archivosPreviredGenerado'],
      });
  
      if (!negocio) {
        throw new Error("Negocio no encontrado");
      }
  
      // Elimina el negocio y los datos relacionados
      await this.negocioRepository.remove(negocio);
      console.log("Negocio y datos relacionados eliminados");
    } catch (error: any) {
      console.error("Error al eliminar el negocio:", error.message);
    }
  }
}

