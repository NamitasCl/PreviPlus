import { Repository } from "typeorm";
import { AppDataSource } from "../datasource.js";
import { Usuario } from "../entities/Usuario.entity.js";
import { Negocio } from "../entities/Negocio.entity.js";
import { Trabajador } from "../entities/Trabajador.entity.js";

export class StatsService {
  private usuarioRepository: Repository<Usuario>;
  private negocioRepository: Repository<Negocio>;
  private trabajadorRepository: Repository<Trabajador>;

  constructor() {
    this.usuarioRepository = AppDataSource.getRepository(Usuario);
    this.negocioRepository = AppDataSource.getRepository(Negocio);
    this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
  }

  /**
   * Obtiene la cantidad total de usuarios registrados.
   * @returns Número de usuarios registrados.
   */
  async obtenerCantidadUsuarios(): Promise<number> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.length;
  }

  /**
   * Obtiene la cantidad de usuarios registrados por mes.
   * @returns Arreglo con el formato [{ name: 'Ene', usuarios: 400 }, ...].
   */
  async obtenerCantidadUsuariosPorMes(): Promise<{ name: string; usuarios: number }[]> {
    const usuarios = await this.usuarioRepository.find();
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    // Contar usuarios por mes
    const usuariosPorMes = usuarios.reduce((acc: Record<string, number>, user: Usuario) => {
      const mes = new Date(user.createdAt).getMonth(); // Índice del mes
      const mesCompleto = meses[mes];
      acc[mesCompleto] = (acc[mesCompleto] || 0) + 1;
      return acc;
    }, {});

    // Formatear el resultado en el arreglo deseado
    return meses.map((mes) => ({
      name: mes,
      usuarios: usuariosPorMes[mes] || 0, // Si no hay usuarios en ese mes, se pone 0
    }));
  }

  /**
   * Obtiene usuarios con su estatus.
   * @returns Arreglo con el formato [{ id, name, email, status }, ...].
   */
  async obtenerUsuariosConStatus(): Promise<{ id: number; name: string; email: string; status: string }[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map((usuario) => ({
      id: usuario.id,
      name: usuario.username,
      email: usuario.email,
      status: usuario.isActive ? "Activo" : "Inactivo",
    }));
  }

  /**
   * Obtiene la cantidad de negocios y trabajadores creados.
   * @returns Arreglo con el formato [{ name: 'Negocios', value: X }, { name: 'Trabajadores', value: Y }].
   */
  async obtenerCantidadNegociosTrabajadores(): Promise<{ name: string; value: number }[]> {
    const negocios = await this.negocioRepository.find();
    const trabajadores = await this.trabajadorRepository.find();

    return [
      { name: "Negocios", value: negocios.length },
      { name: "Trabajadores", value: trabajadores.length },
    ];
  }

  /**
 * Obtiene una lista de negocios con detalles.
 * @returns Arreglo con el formato [{ id, name, owner, employees }, ...].
 */
async obtenerListaNegocios(): Promise<{ id: number; name: string; owner: string; employees: number }[]> {
  // Cargar negocios con un conteo de trabajadores asociados usando una consulta directa
  const negocios = await this.negocioRepository
    .createQueryBuilder("negocio")
    .leftJoinAndSelect("negocio.informacionLaboral", "informacionLaboral")
    .leftJoin("informacionLaboral.trabajador", "trabajador")
    .select([
      "negocio.id",
      "negocio.name",
      "negocio.repLegal",
      "COUNT(trabajador.id) AS employees",
    ])
    .groupBy("negocio.id")
    .addGroupBy("negocio.name")
    .addGroupBy("negocio.repLegal")
    .getRawMany();

  // Mapear el resultado en el formato esperado
  return negocios.map((negocio) => ({
    id: negocio.negocio_id,
    name: negocio.negocio_name,
    owner: negocio.negocio_repLegal,
    employees: parseInt(negocio.employees, 10),
  }));
}
}


