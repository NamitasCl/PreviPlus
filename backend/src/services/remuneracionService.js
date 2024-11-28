const AppDataSource = require("../datasource");
const Trabajador = require("../entities/Trabajador");
const InformacionLaboral = require("../entities/InformacionLaboral");

class RemuneracionService {
    constructor() {
        this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
    }

    // Método para procesar las remuneraciones de un trabajador
    async procesarRemuneraciones(trabajadorId) {
        const trabajador = await this.trabajadorRepository.findOne({
            where: { id: trabajadorId },
            relations: ["historialRemuneraciones"]
        });

        if (!trabajador) {
            throw new Error("Trabajador no encontrado");
        }
    }
}

module.exports = RemuneracionService;