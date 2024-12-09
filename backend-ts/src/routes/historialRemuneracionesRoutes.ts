import { Router } from "express";
import { HistorialRemuneracionesController } from "../controllers/index";
import verifyJwt from "../middlewares/authenticateJWT.midd";

const historialRemuneracionesRoutes = Router();
const historialController = new HistorialRemuneracionesController();

historialRemuneracionesRoutes.use(verifyJwt);

historialRemuneracionesRoutes.get("/:trabajadorId", historialController.getHistorialPorTrabajador);
historialRemuneracionesRoutes.get("/mes/:mes", historialController.getHistorialPorMes);
historialRemuneracionesRoutes.get("/mes/:mes/:trabajadorId", historialController.getHistorialPorMesYTrabajador);

export default historialRemuneracionesRoutes;