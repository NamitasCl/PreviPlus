const AppDataSource = require("../datasource");
const Trabajador = require("../entities/Trabajador");
const Negocio = require("../entities/Negocio");

class TrabajadorService {
    constructor() {
        this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
        this.negocioRepository = AppDataSource.getRepository(Negocio);
    }

    // Método para crear un trabajador
    async crearTrabajador(datos) {
        // Obtener la información contractual del trabajador
        const contractualInfo = datos.contractualInfo;
        

        // Verificar si el negocio existe
        const negocio = await this.negocioRepository.findOneBy({ id: datos.negocioId });
        if (!negocio) {
            throw new Error("El negocio especificado no existe");
        }



        const nuevoTrabajador = this.trabajadorRepository.create({
            ...datos,
            negocio: negocio
        });
        return await this.trabajadorRepository.save(nuevoTrabajador);
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
        return await this.trabajadorRepository.find({
            where: { negocio: { id: idNegocio } },
            relations: ['negocio']
        });
    }
}

module.exports = TrabajadorService;