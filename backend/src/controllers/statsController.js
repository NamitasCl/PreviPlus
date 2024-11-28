const express = require("express");
const router = express.Router();
const StatsService = require("../services/statsService");
const verifyJwt = require('../middlewares/authenticateJWT');
const { check, validationResult } = require('express-validator');

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyJwt);

//Creo la instancia del servicio de estadísticas
const statsService = new StatsService();

// Ruta para obtener las estadisticas de usuarios
router.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await statsService.obtenerCantidadUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener las estadisticas de usuarios por mes
router.get("/usuarios/mes", async (req, res) => {
    try {
        const usuarios = await statsService.obtenerCantidadUsuariosPorMes();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener lista de usuarios con estado
router.get("/usuarios/list", async (req, res) => {
    try {
        const usuarios = await statsService.obtenerUsuariosConStatus();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener las estadisticas de negocios y trabajadores
router.get("/negocios", async (req, res) => {
    try {
        const negociosTrabajadores = await statsService.obtenerCantidadNegociosTrabajadores();
        res.json(negociosTrabajadores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener lista de negocios
router.get("/negocios/list", async (req, res) => {
    try {
        const negocios = await statsService.obtenerListaNegocios();
        res.json(negocios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
