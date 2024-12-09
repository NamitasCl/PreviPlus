import { Router } from "express";
import { check } from "express-validator";
import { TrabajadorController } from "../controllers/index";
import verifyJwt from "../middlewares/authenticateJWT.midd";

const trabajadorRoutes = Router();
const trabajadorController = new TrabajadorController();

// Aplicar middleware de autenticación a todas las rutas
trabajadorRoutes.use(verifyJwt);

trabajadorRoutes.get("/", trabajadorController.obtenerTrabajadores);
trabajadorRoutes.get("/:rutTrabajador", trabajadorController.obtenerTrabajadorPorRut);
trabajadorRoutes.get("/business/:negocioId", trabajadorController.obtenerTrabajadoresPorNegocio);

trabajadorRoutes.post(
    "/",
    [
        check("personalInfo.rut").isString().notEmpty().withMessage("El RUT es obligatorio."),
        check("contractualInfo.puesto").isString().notEmpty().withMessage("El puesto es obligatorio."),
        check("previsionalInfo.codigoAfp").isInt().withMessage("El código AFP debe ser un número."),
        check("negocioId").isInt().withMessage("El ID del negocio debe ser un número válido."),
    ],
    trabajadorController.crearTrabajador
);

trabajadorRoutes.put("/:rutTrabajador", trabajadorController.actualizarTrabajador);
trabajadorRoutes.delete("/:rutTrabajador", trabajadorController.eliminarTrabajador);

export default trabajadorRoutes;
