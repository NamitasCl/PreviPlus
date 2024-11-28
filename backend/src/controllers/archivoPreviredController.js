//Controller para el servicio de archivos Previred
const express = require("express");
const router = express.Router();
const ArchivoPreviredService = require("../services/archivoPreviredService");
const verifyJwt = require('../middlewares/authenticateJWT');

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyJwt);

//Creo la instancia del servicio de archivos Previred
const archivoPreviredService = new ArchivoPreviredService();

// Ruta para obtener un archivo Previred por ID
router.post("/descarga", async (req, res) => {
    try {
        const archivoPrevired = await archivoPreviredService.obtenerArchivosPrevired(req.body);
        if (archivoPrevired) {
            res.header("Content-Type", "text/plain");
            res.header("Content-Disposition", "attachment; filename=archivo-previred.txt");
            res.send(archivoPrevired.archivo);
        } else {
            res.status(404).json({ message: "Archivo Previred no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para descargar un archivo Previred por id 
router.get("/descarga/:id", async (req, res) => {
    try {
        const archivoPrevired = await archivoPreviredService.obtenerArchivoPreviredPorId(req.params.id);
        if (archivoPrevired) {
            res.header("Content-Type", "text/plain");
            res.header("Content-Disposition", "attachment; filename=archivo-previred.txt");
            res.send(archivoPrevired.archivo);
        } else {
            res.status(404).json({ message: "Archivo Previred no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 



// Ruta para obtener informacion de archivos Previred
router.post("/info", async (req, res) => {
    try {

        console.log("Datos de entrada:", req.body);
        const archivoPrevired = await archivoPreviredService.obtenerInformacionArchivosPrevired(req.body);
        if (archivoPrevired) {
            // Elimino el campo archivo del objeto
            const archivoPreviredSinArchivo = archivoPrevired.map(archivo => ({ ...archivo, archivo: undefined }));
            // Solo envio negocio y fecha de creacion.
            res.json(archivoPreviredSinArchivo);
        } else {
            res.status(404).json({ message: "Archivo Previred no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta para generar un archivo Previred
router.post("/generate", async (req, res) => {
    try {
        console.log("Entrando al generate")
        const archivoPrevired = await archivoPreviredService.generarArchivoPrevired(req.body);
        res.json(archivoPrevired);
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