const AppDataSource = require("../datasource");
const HistorialRemuneraciones = require("../entities/Remuneraciones/HisotrialRemuneracion");

class HistorialRemuneracionesService {
    constructor() {
        this.historialRepository = AppDataSource.getRepository(HistorialRemuneraciones);
    }

    async getHistorialRemuneracionesPorTrabajador(id) {
        const historial = await this.historialRepository.find({
            where: { trabajador: { id } },
            relations: ["trabajador", "informacionLaboral"]  // Traemos también las relaciones
        });

        return historial;
    }

    async getHistorialRemuneracionesPorMesYTrabajador(mes, id) {
        const historial = await this.historialRepository.find({
            where: {
                mes_remuneracion: mes,
                trabajador: {
                    id: id
                }
            },
            relations: ["trabajador", "informacionLaboral"]  // Traemos también las
        });

        return historial;

    }

    async getHistorialRemuneracionesPorMes(mes) {
        const historial = await this.historialRepository.find({
            where: {
                mes_remuneracion: mes
            },
            relations: ["trabajador", "informacionLaboral"]  // Traemos también las
        });

        return historial;
    }
}

module.exports = new HistorialRemuneracionesService();
