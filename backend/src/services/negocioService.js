const AppDataSource = require("../datasource");
const Negocio = require("../entities/Negocio/Negocio");
const Usuario = require("../entities/Previplus/Usuario");
const Mutualidad = require("../entities/Prevision/Mutualidad");
const CCAF = require("../entities/Prevision/CCAF");

class NegocioService {
    constructor() {
        this.negocioRepository = AppDataSource.getRepository(Negocio);
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.mutualidadRepository = AppDataSource.getRepository(Mutualidad);
        this.ccafRepository = AppDataSource.getRepository(CCAF);

    }

    // Método para crear un nuevo negocio
    async crearNegocio(negocioData, userId) {
        //Obtener la data
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
            isActive
        } = negocioData;

        //Verificar si tiene mutual publica o privada
        /*
        Opciones de mutualidad:
        00-Instituto de Seguridad Laboral
        01-Asociación Chilena de Seguridad
        02- Mutual de Seguridad CChC
        03-Instituto de Seguridad del Trabajo
        */
        const codigoMutual = parseInt(mutualNombre.split('-')[0], 10);
        const codigoCcaf = parseInt(ccafNombre.split('-')[0], 10);

        //Busco mutualidad
        const mutualidad = await this.mutualidadRepository.findOneBy({ codigomutual: codigoMutual });
        if (!mutualidad) {
            throw new Error('Mutualidad no encontrada');
        }

        //Busco ccaf
        const ccaf = await this.ccafRepository.findOneBy({ codigoccaf: codigoCcaf });
            if (!ccaf) {
                throw new Error('CCAF no encontrada');
            }
        
        // Obtener el usuario autenticado
        const usuario = await this.usuarioRepository.findOneBy({ id: userId });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Crear el negocio asociado al usuario
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
            tieneMutual
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

        console.log("Respuesta obtenida:", respuesta);
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
