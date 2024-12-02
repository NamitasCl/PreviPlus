const express = require("express");
const router = express.Router();
const verifyJwt = require('../middlewares/authenticateJWT');
const MembresiaService = require("../services/membresiaService");

router.use(verifyJwt);

const membresiaService = new MembresiaService();

// Ruta para crear usuario en Flow
router.post("/create", async (req, res) => {
    try {
        const usuarioId = parseInt(req.body.userId);
        const url = await membresiaService.iniciarRegistroTarjeta(usuarioId);
        res.status(200).json({ url });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// Ruta callback para Flow
router.post("/callback", async (req, res) => {
    try {
        const token = req.body.token;
        const resp = await membresiaService.procesarCallback(token);
        res.status(200).json(resp);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener el estado de la membresía
router.get("/status", async (req, res) => {
    try {
        const usuarioId = parseInt(req.user.id); // Asume que el middleware JWT añade req.user
        const status = await membresiaService.obtenerEstadoMembresia(usuarioId);
        res.status(200).json(status);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;