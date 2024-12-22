import { Router } from "express";
import { ArchivoPreviredController } from "../controllers/ArchivoPreviredController";
import verifyJwt from "../middlewares/authenticateJWT.midd";


const archivoPreviredRoutes = Router();
const archivoPreviredController = new ArchivoPreviredController();

archivoPreviredRoutes.use(verifyJwt)

archivoPreviredRoutes.post("/", archivoPreviredController.generarArchivoPrevired);
archivoPreviredRoutes.get("/", archivoPreviredController.obtenerArchivoPrevired);
archivoPreviredRoutes.post("/filtrado", archivoPreviredController.obtenerArchivoPreviredPorNegocio);
archivoPreviredRoutes.get("/descargar/:id", archivoPreviredController.descargarArchivo);
archivoPreviredRoutes.delete("/borrar/:id", archivoPreviredController.borrarArchivo);

export default archivoPreviredRoutes;