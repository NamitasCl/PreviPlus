const AppDataSource = require("../datasource");
const Negocio = require("../entities/Negocio");

class NegocioService {
    constructor() {
        this.negocioRepository = AppDataSource.getRepository(Negocio);
    }

    // Método para crear un negocio
    async crearNegocio(datos) {
        const nuevoNegocio = this.negocioRepository.create(datos);
        return await this.negocioRepository.save(nuevoNegocio);
    }

    // Método para obtener todos los negocios
    async obtenerNegocios() {
        return await this.negocioRepository.find();
    }

    // Método para obtener negocios por usuario
    async obtenerNegocioPorUsuario(id) {
        console.log(id)
        const respuesta = await this.negocioRepository.find(
            {
                where: { usuario: { id: id } },
            }
        );
        return respuesta
    }

    // Método para actualizar un negocio
    async actualizarNegocio(id, datosActualizados) {
        const negocio = await this.negocioRepository.findOneBy({ id });
        if (negocio) {
            Object.assign(negocio, datosActualizados);  // Actualizar con los nuevos datos
            return await this.negocioRepository.save(negocio);
        } else {
            throw new Error("Negocio no encontrado");
        }
    }

    // Método para eliminar un negocio
    async eliminarNegocio(id) {
        const resultado = await this.negocioRepository.delete(id);
        if (resultado.affected > 0) {
            return "Negocio eliminado con éxito";
        } else {
            throw new Error("Negocio no encontrado");
        }
    }
}

module.exports = new NegocioService();
