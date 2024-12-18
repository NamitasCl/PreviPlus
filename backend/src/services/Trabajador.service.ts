import { Repository, QueryRunner, FindOptionsWhere, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../db";
import { Trabajador } from "../entities/Trabajador.entity";
import { Negocio } from "../entities/Negocio.entity";
import { InformacionLaboral } from "../entities/InformacionLaboral.entity";
import { Salud } from "../entities/Salud.entity";
import { AFP } from "../entities/AFP.entity";

export class TrabajadorService {
  private trabajadorRepository: Repository<Trabajador>;
  private negocioRepository: Repository<Negocio>;
  private informacionLaboralRepository: Repository<InformacionLaboral>;
  private saludRepository: Repository<Salud>;
  private afpRepository: Repository<AFP>;

  constructor() {
    this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
    this.negocioRepository = AppDataSource.getRepository(Negocio);
    this.informacionLaboralRepository = AppDataSource.getRepository(InformacionLaboral);
    this.saludRepository = AppDataSource.getRepository(Salud);
    this.afpRepository = AppDataSource.getRepository(AFP);
  }

  // Función auxiliar para obtener una entidad relacionada
  private async obtenerEntidad<T extends ObjectLiteral>(
    repository: Repository<T>,
    campo: keyof T,
    valor: any,
    nombre: string
  ): Promise<T> {
    const entidad = await repository.findOneBy({ [campo]: valor } as FindOptionsWhere<T>);
    if (!entidad) {
      throw new Error(`${nombre} con ${campo.toString()}: ${valor} no encontrado`);
    }
    return entidad;
  }
  

  // Método para crear un trabajador
  async crearTrabajador(datos: any): Promise<Trabajador> {
    const { personalInfo, contractualInfo, previsionalInfo, negocioId } = datos;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verificar si el trabajador ya existe
      const existente = await queryRunner.manager.getRepository(Trabajador).findOneBy({ rut: personalInfo.rut });
      if (existente) {
        throw new Error("El RUT especificado ya existe");
      }

      // Obtener las entidades relacionadas
      const saludEntity = await this.obtenerEntidad(this.saludRepository, "codigoSalud", previsionalInfo.salud, "Institución de Salud");
      console.log("Codigo de salud:", previsionalInfo.salud);
      console.log("Salud obtenida:", saludEntity);
      console.log("Codigo de AFP:", previsionalInfo.afp);
      const afpEntity = await this.obtenerEntidad(this.afpRepository, "codigoAfp", previsionalInfo.afp, "AFP");
      console.log("AFP obtenida:", afpEntity);
      const negocioObtenido = await this.obtenerEntidad(this.negocioRepository, "id", negocioId, "Negocio");
      console.log("Negocio obtenido:", negocioObtenido);

      // Crear la información laboral
      const informacionLaboral = this.informacionLaboralRepository.create({
        puesto: contractualInfo.puesto,
        departamento: contractualInfo.departamento || null,
        fechaInicioLabores: contractualInfo.fechaInicio || null,
        tipoContrato: contractualInfo.tipoContrato,
        tipoTrabajador: parseInt(contractualInfo.tipoTrabajador, 10),
        regimenPrevisional: previsionalInfo.afp ? "AFP" : "",
        tasaTrabajadorCesantia: contractualInfo.tipoContrato === "indefinido" ? 0.06 : 0,
        tasaEmpleadorCesantia: contractualInfo.tipoContrato === "indefinido" ? 0.024 : 0.03,
        sueldoImponible: contractualInfo.salario || 0,
        valorColacion: contractualInfo.colacion || null,
        valorMovilizacion: contractualInfo.movilizacion || null,
        haveAsignacionFamiliar: contractualInfo.asignacionFamiliar || false,
        tramoAsignacionFamiliar: contractualInfo.tramoAsignacionFamiliar || "",
        resolucionAsignacionFamiliar: contractualInfo.resolucionAsignacionFamiliar || "",
        isTiempoCompleto: contractualInfo.tiempoCompleto || false,
        isPensionado: contractualInfo.tipoTrabajador === "pensionado",
        negocio: negocioObtenido
      });

      


      // Crear el trabajador
      const nuevoTrabajador = this.trabajadorRepository.create({
        rut: personalInfo.rut,
        dv: personalInfo.dv,
        patlastname: personalInfo.patlastname,
        matlastname: personalInfo.matlastname,
        names: personalInfo.names,
        genero: personalInfo.genero,
        isExtranjero: personalInfo.isExtranjero,
        nationality: personalInfo.nationality,
        salud: saludEntity,
        afp: afpEntity,
        informacionLaboral: [informacionLaboral],
      });

      console.log("Datos de trabajador guardados:", nuevoTrabajador);


      // Guardar el trabajador
      await queryRunner.manager.save(nuevoTrabajador); 

      // Confirmar la transacción
      await queryRunner.commitTransaction();

      return nuevoTrabajador;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // Obtener todos los trabajadores
  async obtenerTrabajadores(): Promise<Trabajador[]> {
    return await this.trabajadorRepository.find({ relations: ["informacionLaboral", "salud", "afp"] });
  }

  // Obtener un trabajador por su RUT
  async obtenerTrabajadorPorRut(rut: string): Promise<Trabajador | null> {
    return await this.trabajadorRepository.findOne({
      where: { rut },
      relations: ["informacionLaboral", "salud", "afp"],
    });
  }

  // Actualizar un trabajador
  async actualizarTrabajador(rut: string, datos: Partial<Trabajador>): Promise<Trabajador | null> {
    const trabajador = await this.obtenerTrabajadorPorRut(rut);
    if (!trabajador) return null;

    this.trabajadorRepository.merge(trabajador, datos);
    return await this.trabajadorRepository.save(trabajador);
  }

  // Eliminar un trabajador
  async eliminarTrabajador(rut: string): Promise<Boolean> {
    const trabajador = await this.obtenerTrabajadorPorRut(rut);
    if (!trabajador) {
      throw new Error("Trabajador no encontrado");
    }
    await this.trabajadorRepository.remove(trabajador);
    return true
  }

  // Obtener trabajadores por negocio
  async obtenerTrabajadoresPorNegocio(idNegocio: number): Promise<InformacionLaboral[]> {
    return await this.informacionLaboralRepository.find({
      where: { negocio: { id: idNegocio }},
      relations: ["trabajador"],
    });
  }
}
