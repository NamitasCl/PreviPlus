import { Router } from "express";
import UsuarioController from "../controllers/Usuario.controller.js";
import verifyJwt from "../middlewares/authenticateJWT.midd.js";

const usuariosRoutes = Router();
const usuarioController = new UsuarioController();

usuariosRoutes.get("/", usuarioController.obtenerUsuarios);
usuariosRoutes.get("/me", verifyJwt, usuarioController.obtenerUsuarioEnRefresco);
usuariosRoutes.get("/:id", usuarioController.obtenerUsuarioPorId);
usuariosRoutes.post("/", usuarioController.crearUsuario);
usuariosRoutes.post("/login", usuarioController.login);
usuariosRoutes.post("/logout", usuarioController.logout);
usuariosRoutes.put("/:id", verifyJwt, usuarioController.actualizarUsuario);
usuariosRoutes.put("/:id/contrasena", verifyJwt, usuarioController.actualizarContrasena);
usuariosRoutes.delete("/:id", verifyJwt, usuarioController.eliminarUsuario);
usuariosRoutes.get("/stats/:usuarioId", verifyJwt, usuarioController.obtenerUsuarioConEstadisticas);

export default usuariosRoutes;
