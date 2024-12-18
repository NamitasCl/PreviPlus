import { Router } from "express";
import { ArchivoPreviredController } from "../controllers/ArchivoPreviredController";
import verifyJwt from "../middlewares/authenticateJWT.midd";


const archivoPreviredRoutes = Router();
const archivoPreviredController = new ArchivoPreviredController();

archivoPreviredRoutes.use(verifyJwt)

archivoPreviredRoutes.post("/", archivoPreviredController.generarArchivoPrevired);

export default archivoPreviredRoutes;