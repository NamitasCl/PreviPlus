import { Request, Response } from "express";
import {HistorialRemuneraciones} from "../services/index";

const histRemService = new HistorialRemuneraciones();

export default class HistorialRemuneracionesController {
    constructor() {}

    getHistorialPorTrabajador = async (req: Request, res: Response): Promise<void> => {
        const trabajadorId = parseInt(req.params.trabajadorId, 10);

        if (isNaN(trabajadorId)) {
            res.status(400).json({ message: "El ID del trabajador debe ser un número válido." });
            return;
        }

        try {
            const historial = await histRemService.getHistorialRemuneracionesPorTrabajador(trabajadorId);
            if (historial.length === 0) {
                res.status(404).json({ message: "No hay remuneraciones registradas para este trabajador" });
                return;
            }
            res.status(200).json(historial);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el historial de remuneración", error: (error as Error).message });
        }
    };

    getHistorialPorMes = async (req: Request, res: Response): Promise<void> => {
        const mes = req.params.mes;

        if (!mes || mes.length !== 6) {
            res.status(400).json({ message: "El mes debe tener el formato 'mmaaaa'." });
            return;
        }

        try {
            const historial = await histRemService.getHistorialRemuneracionesPorMes(mes);
            if (historial.length === 0) {
                res.status(404).json({ message: "No hay remuneraciones registradas para este mes" });
                return;
            }
            res.status(200).json(historial);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el historial de remuneración", error: (error as Error).message });
        }
    };

    getHistorialPorMesYTrabajador = async (req: Request, res: Response): Promise<void> => {
        const mes = req.params.mes;
        const trabajadorId = parseInt(req.params.trabajadorId, 10);

        if (!mes || mes.length !== 6) {
            res.status(400).json({ message: "El mes debe tener el formato 'mmaaaa'." });
            return;
        }

        if (isNaN(trabajadorId)) {
            res.status(400).json({ message: "El ID del trabajador debe ser un número válido." });
            return;
        }

        try {
            const historial = await histRemService.getHistorialRemuneracionesPorMesYTrabajador(mes, trabajadorId);
            if (historial.length === 0) {
                res.status(404).json({ message: "No hay remuneraciones registradas para este trabajador en este mes" });
                return;
            }
            res.status(200).json(historial);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el historial de remuneración", error: (error as Error).message });
        }
    };
}
