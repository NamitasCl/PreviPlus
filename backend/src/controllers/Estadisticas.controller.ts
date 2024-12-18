import { Request, Response } from "express";
import {StatsService} from "../services/index";

const statsService = new StatsService();

export default class StatsController {
    constructor() {}

    getCantidadUsuarios = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await statsService.obtenerCantidadUsuarios();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    getCantidadUsuariosPorMes = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await statsService.obtenerCantidadUsuariosPorMes();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    getUsuariosConStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await statsService.obtenerUsuariosConStatus();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    getCantidadNegociosTrabajadores = async (req: Request, res: Response): Promise<void> => {
        try {
            const negociosTrabajadores = await statsService.obtenerCantidadNegociosTrabajadores();
            res.json(negociosTrabajadores);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    getListaNegocios = async (req: Request, res: Response): Promise<void> => {
        try {
            const negocios = await statsService.obtenerListaNegocios();
            res.json(negocios);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}
