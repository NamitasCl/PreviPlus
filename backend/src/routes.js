const express = require("express");
const router = express.Router();

// Importar controladores
const usuarioController = require("./controllers/usuarioController");
const negocioController = require("./controllers/negocioController");
const trabajadorController = require("./controllers/trabajadorController");
const historialController = require("./controllers/historialRemuneracionesController");
const creditosController = require("./controllers/creditosController");
const archivoPreviredController = require("./controllers/archivoPreviredController");
const statsController = require("./controllers/statsController");

// Asignar las rutas a los controladores
router.use("/usuarios", usuarioController);
router.use("/negocios", negocioController)
router.use("/trabajadores", trabajadorController)
router.use("/historial", historialController)
router.use("/creditos", creditosController)
router.use("/archprev", archivoPreviredController)
router.use("/stats", statsController)

module.exports = router;
