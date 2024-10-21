const express = require("express");
const router = express.Router();
const histRemService = require("../services/historialRemuneracionesService");


//Obtener historial por trabajador
router.get("/:trabajadorId", async (req, res) => {
    const rutTrabajador = parseInt(req.params.trabajadorId);

    try {
        const historial = await histRemService.getHistorialRemuneracionesPorTrabajador(rutTrabajador);
        if (historial.length === 0) {
            return res.status(404).json({ message: "No hay remuneraciones registradas para este trabajador" })
        }

        res.status(200).json(historial)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el historial de remuneracion" })
    }
})

//Get historial remuneraciones por mes
router.get("/mes/:mes", async (req, res) => {
    const mes = req.params.mes;

    try {
        const historial = await histRemService.getHistorialRemuneracionesPorMes(mes);
        if (historial.length === 0) {
            return res.status(404).json({ message: "No hay remuneraciones registradas para este trabajador en este mes" })
        }
        res.status(200).json(historial)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el historial de remuneracion" })
    }
})

//Get historial remuneraciones por mes y usuario
router.get("/mes/:mes/:trabajadorId", async (req, res) => {
    const mes = req.params.mes;

    const idTrabajador = parseInt(req.params.trabajadorId)

    try {
        const historial = await histRemService.getHistorialRemuneracionesPorMesYTrabajador(mes, idTrabajador);
        if (historial.length === 0) {
            return res.status(404).json({ message: "No hay remuneraciones registradas para este trabajador en este mes" })
        }
        res.status(200).json(historial)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el historial de remuneracion" })
    }
})




module.exports = router;