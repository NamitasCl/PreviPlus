const AppDataSource = require("../datasource");
const Negocio = require("../entities/Negocio");
const Usuario = require("../entities/Usuario");

class NegocioService {
    constructor() {
        this.negocioRepository = AppDataSource.getRepository(Negocio);
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    // Método para crear un negocio
    // Método para crear un nuevo negocio
    async crearNegocio(negocioData, userId) {
        // Obtener el usuario autenticado
        const usuario = await this.usuarioRepository.findOneBy({ id: userId });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Crear el negocio asociado al usuario
        const nuevoNegocio = this.negocioRepository.create({
            ...negocioData,
            usuario: usuario
        });

        return await this.negocioRepository.save(nuevoNegocio);
    }

    // Método para obtener todos los negocios
    async obtenerNegocios() {
        return await this.negocioRepository.find();
    }

    // Método para obtener negocios por usuario
    async obtenerNegocioPorUsuario(id) {
        const respuesta = await this.negocioRepository.find(
            {
                where: { usuario: { id: id } },
                relations: ['usuario']
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

module.exports = NegocioService;
