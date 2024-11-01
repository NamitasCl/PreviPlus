const express = require("express");
const router = express.Router();
const NegocioService = require("../services/negocioService");
const authenticateJWT = require('../middlewares/authenticateJWT');

const negocioService = new NegocioService();

// Ruta para obtener todos los usuarios
router.get("/", authenticateJWT, async (req, res) => {
    try {
        const usuarios = await negocioService.obtenerNegocios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener negocios por usuario
router.get("/:usuarioId", authenticateJWT, async (req, res) => {

    const usuarioId = parseInt(req.params.usuarioId)
    console.log(usuarioId)
    
    try {
        const negociosUsuario = await negocioService.obtenerNegocioPorUsuario(usuarioId);
        if (negociosUsuario) {
            res.json(negociosUsuario);
        } else {
            res.status(404).json({ message: "Usuario no tiene negocios" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para crear un nuevo negocio
router.post("/", authenticateJWT, async (req, res) => {
    try {
        const nuevoNegocio = await negocioService.crearNegocio(req.body);
        res.status(201).json(nuevoNegocio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar un negocio
router.put("/:id", authenticateJWT, async (req, res) => {
    try {
        const negocioActualizado = await negocioService.actualizarNegocio(req.params.id, req.body);
        res.json(negocioActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un negocio
router.delete("/:id", authenticateJWT, async (req, res) => {
    try {
        const mensaje = await negocioService.eliminarNegocio(req.params.id);
        res.status(200).json({ message: mensaje });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
