const express = require("express");
const router = express.Router();
const TrabajadorService = require("../services/trabajadorService");
const verifyJwt = require('../middlewares/authenticateJWT');
const { check, validationResult } = require('express-validator');

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyJwt);

//Creo la instancia del servicio de trabajadores
const trabajadorService = new TrabajadorService();

// Ruta para obtener todos los trabajadores
router.get("/", async (req, res) => {
    try {
        const trabajadores = await trabajadorService.obtenerTrabajadores();
        res.json(trabajadores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un trabajador por RUT
router.get("/:rutTrabajador", async (req, res) => {
    try {
        const trabajador = await trabajadorService.obtenerTrabajadorPorRut(req.params.rutTrabajador);
        if (trabajador) {
            res.json(trabajador);
        } else {
            res.status(404).json({ message: "Trabajador no existe" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener trabajadores por negocio
router.get("/business/:negocioId", async (req, res) => {
    const negocioId = parseInt(req.params.negocioId);
    if (isNaN(negocioId)) {
        return res.status(400).json({ message: "El ID del negocio debe ser un número válido." });
    }
    try {
        const trabajadores = await trabajadorService.obtenerTrabajadoresPorNegocio(negocioId);
        if (trabajadores.length > 0) {
            res.json(trabajadores);
        } else {
            res.status(404).json({ message: "No hay trabajadores en este negocio" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para crear un nuevo trabajador
router.post("/", async (req, res) => {
        
        try {
            const newTrabajador = await trabajadorService.crearTrabajador(req.body);
            res.status(201).json(newTrabajador);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// Ruta para actualizar un trabajador
router.put("/:rutTrabajador", async (req, res) => {
        // Manejo de errores de validación
        
        try {
            const updatedTrabajador = await trabajadorService.updateTrabajador(req.params.rutTrabajador, req.body);
            if (updatedTrabajador) {
                res.json(updatedTrabajador);
            } else {
                res.status(404).json({ message: "Trabajador no existe" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

// Ruta para eliminar un trabajador
router.delete("/:rutTrabajador", async (req, res) => {
    try {
        const deletedTrabajador = await trabajadorService.deleteTrabajador(req.params.rutTrabajador);
        if (deletedTrabajador) {
            res.json({ message: "Trabajador eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Trabajador no existe" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
