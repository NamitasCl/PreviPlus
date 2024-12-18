import { Router } from "express";
import { NegocioController } from "../controllers/index";
import authenticateJWT from "../middlewares/authenticateJWT.midd";

const negociosRoutes = Router();
const negocioController = new NegocioController();

negociosRoutes.use(authenticateJWT);

negociosRoutes.get("/", negocioController.getNegocios);
negociosRoutes.get("/:usuarioId", negocioController.getNegocioPorUsuario);
negociosRoutes.post("/", negocioController.crearNegocio);
negociosRoutes.put("/:id", negocioController.actualizarNegocio);
negociosRoutes.delete("/:id", negocioController.eliminarNegocio);

export default negociosRoutes;
