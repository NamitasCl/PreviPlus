import { Router } from "express";
import usuariosRoutes from "./usuariosRoutes";
import negociosRoutes from "./negociosRoutes";
import trabajadoresRoutes from "./trabajadoresRoutes";
import statsRoutes from "./statsRoutes";
import archivoPreviredRoutes from "./archivosPreviredRoutes";

const indexRoutes = Router();

indexRoutes.use("/usuarios", usuariosRoutes);
indexRoutes.use("/negocios", negociosRoutes);
indexRoutes.use("/trabajadores", trabajadoresRoutes);
indexRoutes.use("/stats", statsRoutes);
indexRoutes.use("/archivosprevired", archivoPreviredRoutes)


export { indexRoutes };