import { Router } from "express";
import usuariosRoutes from "./usuariosRoutes.js";
import negociosRoutes from "./negociosRoutes.js";
import trabajadoresRoutes from "./trabajadoresRoutes.js";
import statsRoutes from "./statsRoutes.js";

const indexRoutes = Router();

indexRoutes.use("/usuarios", usuariosRoutes);
indexRoutes.use("/negocios", negociosRoutes);
indexRoutes.use("/trabajadores", trabajadoresRoutes);
indexRoutes.use("/stats", statsRoutes);


export default indexRoutes;