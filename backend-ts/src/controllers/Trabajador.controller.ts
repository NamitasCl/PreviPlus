import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {TrabajadorService} from "../services/Trabajador.service.js";

const trabajadorService = new TrabajadorService();

export default class TrabajadorController {
    constructor() {}

    obtenerTrabajadores = async (_req: Request, res: Response): Promise<void> => {
        try {
            const trabajadores = await trabajadorService.obtenerTrabajadores();
            res.json(trabajadores);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    obtenerTrabajadorPorRut = async (req: Request, res: Response): Promise<void> => {
        try {
            const trabajador = await trabajadorService.obtenerTrabajadorPorRut(req.params.rutTrabajador);
            if (trabajador) {
                res.json(trabajador);
            } else {
                res.status(404).json({ message: "Trabajador no existe" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    obtenerTrabajadoresPorNegocio = async (req: Request, res: Response): Promise<void> => {
        const negocioId = parseInt(req.params.negocioId, 10);
        if (isNaN(negocioId)) {
            res.status(400).json({ message: "El ID del negocio debe ser un número válido." });
            return;
        }
        try {
            const trabajadores = await trabajadorService.obtenerTrabajadoresPorNegocio(negocioId);
            if (trabajadores.length > 0) {
                res.json(trabajadores);
            } else {
                res.status(404).json({ message: "No hay trabajadores en este negocio" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    crearTrabajador = async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        try {
            const newTrabajador = await trabajadorService.crearTrabajador(req.body);
            res.status(201).json(newTrabajador);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    actualizarTrabajador = async (req: Request, res: Response): Promise<void> => {
        try {
            const updatedTrabajador = await trabajadorService.actualizarTrabajador(req.params.rutTrabajador, req.body);
            if (updatedTrabajador) {
                res.json(updatedTrabajador);
            } else {
                res.status(404).json({ message: "Trabajador no existe" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    eliminarTrabajador = async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedTrabajador = await trabajadorService.eliminarTrabajador(req.params.rutTrabajador);
            if (deletedTrabajador) {
                res.json({ message: "Trabajador eliminado exitosamente" });
            } else {
                res.status(404).json({ message: "Trabajador no existe" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}
