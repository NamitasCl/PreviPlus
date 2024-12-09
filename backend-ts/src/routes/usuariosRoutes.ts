import { Router } from "express";
import { UsuarioController } from "../controllers/index";
import verifyJwt from "../middlewares/authenticateJWT.midd";

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

usuarioRoutes.get("/", usuarioController.obtenerUsuarios);
usuarioRoutes.get("/me", verifyJwt, usuarioController.obtenerUsuarioEnRefresco);
usuarioRoutes.get("/:id", usuarioController.obtenerUsuarioPorId);
usuarioRoutes.post("/", usuarioController.crearUsuario);
usuarioRoutes.post("/login", usuarioController.login);
usuarioRoutes.post("/logout", usuarioController.logout);
usuarioRoutes.put("/:id", verifyJwt, usuarioController.actualizarUsuario);
usuarioRoutes.put("/:id/contrasena", verifyJwt, usuarioController.actualizarContrasena);
usuarioRoutes.delete("/:id", verifyJwt, usuarioController.eliminarUsuario);
usuarioRoutes.get("/stats/:usuarioId", verifyJwt, usuarioController.obtenerUsuarioConEstadisticas);

export default usuarioRoutes;
