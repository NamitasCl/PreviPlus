const express = require("express");
const router = express.Router();

// Importar controladores
const usuarioController = require("./controllers/usuarioController");
const negocioController = require("./controllers/negocioController");

// Asignar las rutas a los controladores
router.use("/usuarios", usuarioController);
router.use("/negocios", negocioController)

module.exports = router;
