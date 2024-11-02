const express = require("express");
const router = express.Router();
const verifyJwt = require('../middlewares/authenticateJWT');

router.use(verifyJwt);

// Ruta para obtener creditos por usuario
router.get("/:usuarioId", async (req, res) => {
    try {
        const creditos = await req.creditosService.obtenerComprasCreditosPorUsuario(req.params.usuarioId);
        res.json(creditos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para comprar creditos
router.post("/comprar", async (req, res) => {
    try {
        const creditosComprados = await req.creditosService.comprarCreditos(req.body);
        res.json(creditosComprados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para gastar creditos
router.post("/gastar", async (req, res) => {
    try {
        const creditosGastados = await req.creditosService.gastarCreditos(req.body);
        res.json(creditosGastados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;