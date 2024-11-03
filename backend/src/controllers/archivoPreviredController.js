//Controller para el servicio de archivos Previred
const express = require("express");
const router = express.Router();
const ArchivoPreviredService = require("../services/archivoPreviredService");
const verifyJwt = require('../middlewares/authenticateJWT');

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyJwt);

//Creo la instancia del servicio de archivos Previred
const archivoPreviredService = new ArchivoPreviredService();

// Ruta para obtener todos los archivos Previred
router.get("/", async (req, res) => {
    try {
        const archivosPrevired = await archivoPreviredService.obtenerArchivosPrevired();
        res.json(archivosPrevired);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un archivo Previred por ID
router.get("/:id", async (req, res) => {
    try {
        const archivoPrevired = await archivoPreviredService.obtenerArchivoPreviredPorId(req.params.id);
        if (archivoPrevired) {
            res.json(archivoPrevired);
        } else {
            res.status(404).json({ message: "Archivo Previred no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener un archivo Previred por usuario
router.get("/user/:idUsuario", async (req, res) => {
    try {
        const archivosPrevired = await archivoPreviredService.obtenerArchivoPreviredPorUsuario(req.params.idUsuario);
        if (archivosPrevired.length > 0) {
            res.json(archivosPrevired);
        } else {
            res.status(404).json({ message: "No hay archivos Previred asociados a este usuario" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para crear un nuevo archivo Previred
router.post("/", async (req, res) => {
    try {
        const nuevoArchivoPrevired = await archivoPreviredService.crearArchivoPrevired(req.body);
        res.json(nuevoArchivoPrevired);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta de prueba para ver los datos obtenidos en el archivo Previred en el metodo crearArchivoPrevired
router.post("/test", async (req, res) => {
    try {
        const { userid, negocioid } = req.body
        const archivoPrevired = await archivoPreviredService.crearArchivoPrevired(userid, negocioid);
        res.status(200).json({ archivoPrevired });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para actualizar un archivo Previred
router.put("/:id", async (req, res) => {
    try {
        const archivoPreviredActualizado = await archivoPreviredService.actualizarArchivoPrevired(req.params.id, req.body);
        res.json(archivoPreviredActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un archivo Previred
router.delete("/:id", async (req, res) => {
    try {
        const archivoPreviredEliminado = await archivoPreviredService.eliminarArchivoPrevired(req.params.id);
        res.json(archivoPreviredEliminado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;