const AppDataSource = require("../datasource");
const Trabajador = require("../entities/Trabajador");

class NegocioService {
    constructor() {
        this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
    }

    // Método para crear un trabajador
    async crearTrabajador(datos) {
        const nuevoTrabajador = this.trabajadorRepository.create(datos);
        return await this.trabajadorRepository.save(nuevoTrabajador);
    }

    // Método para obtener todos los trabajadores
    async obtenerTrabajadores() {
        return await this.trabajadorRepository.find();
    }

    // Método para obtener un trabajador por su rut
    async obtenerTrabajadorPorRut(rut) {
        return await this.usuarioRepository.findOneBy({ rut });
    }

    //Method to update worker  
    async updateTrabajador(rut, datos) {
        const trabajador = await this.obtenerTrabajadorPorRut(rut);
        if (trabajador) {
            this.trabajadorRepository.merge(trabajador, datos);
            return await this.trabajadorRepository.save(trabajador);
        } else {
            return null;
        }
    }

    //Method  to delete worker
    async deleteTrabajador(rut) {
        const trabajador = await this.obtenerTrabajadorPorRut(rut);
        if (trabajador) {
            return await this.trabajadorRepository.delete(trabajador);
        } else {
            return null;
        }

    }

    //Method to get workers by business
    async obtenerTrabajadoresPorNegocio(idNegocio) {

        return await this.trabajadorRepository.find({
            where: { negocio: { id: idNegocio } },
            relations: ['negocio']
        });
    }
}

module.exports = new NegocioService();