import { Router } from "express";
import { StatsController } from "../controllers/index";
import verifyJwt from "../middlewares/authenticateJWT.midd";

const statsRoutes = Router();
const statsController = new StatsController();

statsRoutes.use(verifyJwt);

statsRoutes.get("/usuarios", statsController.getCantidadUsuarios);
statsRoutes.get("/usuarios/mes", statsController.getCantidadUsuariosPorMes);
statsRoutes.get("/usuarios/list", statsController.getUsuariosConStatus);
statsRoutes.get("/negocios", statsController.getCantidadNegociosTrabajadores);
statsRoutes.get("/negocios/list", statsController.getListaNegocios);

export default statsRoutes;
