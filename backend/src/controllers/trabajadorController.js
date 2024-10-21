const express = require("express");
const router = express.Router();
const trabajadorService = require("../services/trabajadorService");

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await trabajadorService.obtenerTrabajadores();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener negocios por usuario
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

//Path to get workers  by business
router.get("/business/:negocioId", async (req, res) => {
    const negocioId = parseInt(req.params.negocioId)
    try {
        const trabajadores = await trabajadorService.obtenerTrabajadoresPorNegocio(negocioId)
        if (trabajadores) {
            res.json(trabajadores);
        } else {
            res.status(404).json({ message: "No hay trabajadores en este negocio" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Path to create new worker.
router.post("/", async (req, res) => {
    try {
        const newTrabajador = await trabajadorService.crearTrabajador(req.body);
        res.json(newTrabajador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Path to update worker.
router.put("/:rutTrabajador", async (req, res) => {
    try {
        const updatedTrabajador = await trabajadorService.updateTrabajador(req.params.ruttrabajador, req.body);
        if (updatedTrabajador) {
            res.json(updatedTrabajador);
        } else {
            res.status(404).json({ message: "Trabajador no existe" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Path to delete worker.
router.delete("/:rutTrabajador", async (req, res) => {
    try {
        const deletedTrabajador = await trabajadorService.deleteTrabajador(req.params.rutTrabajador)
        if (deletedTrabajador) {
            res.json(deletedTrabajador);
        } else {
            res.status(404).json({ message: "Trabajador no existe" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
