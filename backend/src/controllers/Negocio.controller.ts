import { Request, Response, RequestHandler } from "express";
import { NegocioService } from "../services/index";

const negocioService = new NegocioService();

export default class NegocioController {
    constructor() {}

    getNegocios: RequestHandler = async (req, res) => {
        try {
            const negocios = await negocioService.obtenerNegocios();
            res.json(negocios);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    getNegocioPorUsuario: RequestHandler = async (req, res) => {
        const usuarioId = parseInt(req.params.usuarioId, 10);

        if (isNaN(usuarioId)) {
            res.status(400).json({ message: "El ID del usuario debe ser un número válido." });
            return;
        }

        try {
            const negociosUsuario = await negocioService.obtenerNegocioPorUsuario(usuarioId);
            if (negociosUsuario) {
                res.json(negociosUsuario);
            } else {
                res.status(404).json({ message: "Usuario no tiene negocios" });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    crearNegocio: RequestHandler = async (req, res) => {
        try {
            console.log("Datos recibidos:", req.body);
            const nuevoNegocio = await negocioService.crearNegocio(req.body, req.body.userId);
            res.status(201).json(nuevoNegocio);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    actualizarNegocio: RequestHandler = async (req, res) => {
        const negocioId = parseInt(req.params.id, 10);

        if (isNaN(negocioId)) {
            res.status(400).json({ message: "El ID del negocio debe ser un número válido." });
        }

        try {
            const negocioActualizado = await negocioService.actualizarNegocio(negocioId, req.body);
            res.json(negocioActualizado);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    eliminarNegocio: RequestHandler = async (req, res) => {
        const negocioId = parseInt(req.params.id, 10);

        if (isNaN(negocioId)) {
            res.status(400).json({ message: "El ID del negocio debe ser un número válido." });
        }

        try {
            const mensaje = await negocioService.eliminarNegocio(negocioId);
            res.status(200).json({ message: mensaje });
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };
}
