const AppDataSource = require("../datasource");
const Trabajador = require("../entities/Trabajador/Trabajador");
const Negocio = require("../entities/Negocio/Negocio");
const InformacionLaboral = require("../entities/Negocio/InformacionLaboral");
const Salud = require("../entities/Prevision/Salud");
const AFP = require("../entities/Prevision/AFP");

class TrabajadorService {
    constructor() {
        this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
        this.negocioRepository = AppDataSource.getRepository(Negocio);
        this.informacionLaboralRepository = AppDataSource.getRepository(InformacionLaboral);
        this.saludRepository = AppDataSource.getRepository(Salud);
        this.afpRepository = AppDataSource.getRepository(AFP);
    }

    // Método para crear un trabajador
    async crearTrabajador(datos) {  
      // Extraer información
      const { personalInfo, contractualInfo, previsionalInfo, otraInfo, negocioId } = datos;
      console.log("Obtuve los datos");
      console.log("PersonalInfo:", personalInfo);
      console.log("ContractualInfo:", contractualInfo);
      console.log("PrevisionalInfo:", previsionalInfo);
      console.log("OtraInfo:", otraInfo);
      console.log("NegocioId:", negocioId);

      // Iniciar una transacción
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      try {
        // 1. Obtener el repositorio de Trabajador dentro de la transacción
        const trabajadorRepo = queryRunner.manager.getRepository("Trabajador");
  
        // 2. Verificar si el trabajador ya existe
        const existente = await trabajadorRepo.findOneBy({ rut: personalInfo.rut });
        if (existente) {
          throw new Error("El RUT especificado ya existe");
        }
        console.log("Trabajador encontrado:", existente); // Debería ser null o undefined
  
        // 3. Obtener la entidad Salud
        const saludValue = parseInt(previsionalInfo.codigoSalud, 10); // Asegúrate de que el código exista
        const saludEntity = await queryRunner.manager.getRepository("Salud").findOneBy({ codigoSalud: saludValue });
        console.log("Salud:", saludEntity);
        if (!saludEntity) {
          throw new Error(`Institución de Salud "${saludValue}" no encontrada`);
        }
  
        // 4. Obtener la entidad AFP
        const afpValue = parseInt(previsionalInfo.codigoAfp, 10); // Asegúrate de que el código exista
        const afpEntity = await queryRunner.manager.getRepository("AFP").findOneBy({ codigoAfp: afpValue });
        console.log("AFP:", afpEntity);
        if (!afpEntity) {
          throw new Error(`AFP "${afpValue}" no encontrada`);
        }

        // 5. Obtener el negocio
        const negocioObtenido = await queryRunner.manager.getRepository("Negocio").findOneBy({ id: negocioId });
        if (!negocioObtenido) {
          throw new Error("Negocio no encontrado");
        }

        console.log("Negocio:", negocioObtenido);
  
        // 6. Crear la información laboral
        const informacionLaboralRepo = queryRunner.manager.getRepository("InformacionLaboral");
        const informacionLaboral = informacionLaboralRepo.create({
          puesto: contractualInfo.puesto,
          departamento: contractualInfo.departamento,
          fechaInicioLabores: contractualInfo.fechaInicio,
          tipoContrato: contractualInfo.tipoContrato,
          tipoTrabajador: parseInt(contractualInfo.tipoTrabajador, 10),
          regimenPrevisional: previsionalInfo.afp ? "AFP" : "",
          institucionAfp: previsionalInfo.afp || "",
          codigoAfp: previsionalInfo.codigoAfp || "",
          tipoSalud: previsionalInfo.salud !== "fonasa" ? "ISAPRE" : "FONASA",
          codigoSalud: previsionalInfo.codigoSalud || "",
          institucionSalud: previsionalInfo.salud || "",
          tasaTrabajadorCesantia: contractualInfo.tipoContrato === "indefinido" ? 0.06 : 0,
          tasaEmpleadorCesantia: contractualInfo.tipoContrato === "indefinido" ? 0.24 : 0.3,
          sueldoImponible: contractualInfo.salario,
          valorColacion: contractualInfo.colacion,
          valorMovilizacion: contractualInfo.movilizacion,
          haveAsignacionFamiliar: contractualInfo.asignacionFamiliar,
          tramoAsignacionFamiliar: contractualInfo.tramoAsignacionFamiliar || "",
          resolucionAsignacionFamiliar: contractualInfo.resolucionAsignacionFamiliar || "",
          isTiempoCompleto: contractualInfo.tiempoCompleto,
          isPensionado: contractualInfo.tipoTrabajador === "pensionado",
          numeroFun: previsionalInfo.numeroFun || "",
          tipoMoneda: previsionalInfo.tipoMoneda || "",
          cotizacionPactada: previsionalInfo.cotizacionPactada || "",
          negocio: negocioObtenido
        });
  
        console.log("InformacionLaboral instancia:", informacionLaboral);
  
        // 7. Crear el trabajador y establecer relaciones
        const nuevoTrabajador = trabajadorRepo.create({
          rut: personalInfo.rut,
          dv: personalInfo.dv,
          patlastname: personalInfo.patlastname,
          matlastname: personalInfo.matlastname,
          names: personalInfo.names,
          genero: personalInfo.genero, // Asegúrate de que este valor sea válido (1 carácter)
          nationality: personalInfo.nationality,
          salud: saludEntity, // Relación ManyToOne
          afp: afpEntity,     // Relación ManyToOne
          informacionLaboral: [informacionLaboral], // Relación OneToMany
        });
  
        console.log("Trabajador instancia:", nuevoTrabajador);
  
        // 8. Guardar el trabajador (cascade guarda InformacionLaboral)
        await trabajadorRepo.save(nuevoTrabajador);
  
        // 9. Confirmar la transacción
        await queryRunner.commitTransaction();
  
        return nuevoTrabajador;
      } catch (error) {
        // Revertir la transacción en caso de error
        await queryRunner.rollbackTransaction();
        console.error("Error al crear el trabajador:", error);
        throw error;
      } finally {
        // Liberar el queryRunner
        await queryRunner.release();
      }
    }
  
    
  

    // Método para obtener todos los trabajadores
    async obtenerTrabajadores() {
        return await this.trabajadorRepository.find({ relations: ['negocio'] });
    }

    // Método para obtener un trabajador por su rut
    async obtenerTrabajadorPorRut(rut) {
        return await this.trabajadorRepository.findOne({
            where: { rut },
            relations: ['negocio']
        });
    }

    // Método para actualizar un trabajador
    async updateTrabajador(rut, datos) {
        const trabajador = await this.obtenerTrabajadorPorRut(rut);
        if (trabajador) {
            this.trabajadorRepository.merge(trabajador, datos);
            return await this.trabajadorRepository.save(trabajador);
        } else {
            return null;
        }
    }

    // Método para eliminar un trabajador
    async deleteTrabajador(rut) {
        const trabajador = await this.obtenerTrabajadorPorRut(rut);
        if (trabajador) {
            await this.trabajadorRepository.remove(trabajador);
            return trabajador;
        } else {
            return null;
        }
    }

    // Método para obtener trabajadores por negocio
    async obtenerTrabajadoresPorNegocio(idNegocio) {
        return await this.informacionLaboralRepository.find({
            where: { negocio: { id: idNegocio } },
            relations: ['trabajador']
        });
    }
}

module.exports = TrabajadorService;