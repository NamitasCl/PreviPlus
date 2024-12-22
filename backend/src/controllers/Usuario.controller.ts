import { Request, Response } from "express";
import { Usuario } from "../entities/Usuario.entity";
import { UsuarioService } from "../services/index";
import { JwtPayload } from "jsonwebtoken";
import { UserInfo } from "../services/Usuario.service";

const usuarioService = new UsuarioService();

interface LoginResponse {
    token: string;
    obtainedUserData: Omit<UserInfo, "password">;
}

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export default class UsuarioController {
    constructor() {}

    obtenerUsuarios = async (_req: Request, res: Response): Promise<void> => {
        try {
            const usuarios = await usuarioService.obtenerUsuarios();
            res.json(usuarios);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    obtenerUsuarioPorId = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuario = await usuarioService.obtenerUsuarioPorId(Number(req.params.id));
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json({ message: "Usuario no encontrado" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    crearUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, firstlastname, secondlastname, username, email, password } = req.body;

            // Validación de campos obligatorios
            if (!username || !email || !password) {
                throw new Error("Todos los campos (username, email, password) son obligatorios.");
            }
            const nuevoUsuario = await usuarioService.crearUsuario({ name, firstlastname, secondlastname, username, email, password });
            
            

            if (nuevoUsuario.id) {
                res.status(201).json(nuevoUsuario);
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const {email, password} = req.body;

            const loginData: LoginResponse = await usuarioService.login({email, password});

            res.cookie("token", loginData.token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60,
                path: "/",
            });

            const userData = loginData.obtainedUserData;
            // Registrar lastlogin y guardarlo en la base de datos
            await usuarioService.actualizarUsuario(userData.id, { lastLogin: new Date() });

            res.status(200).json(userData);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    };

    logout = (_req: Request, res: Response): void => {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/",
        });
        res.status(200).json({ message: "Logout exitoso" });
    };

    actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarioActualizado = await usuarioService.actualizarUsuario(Number(req.params.id), req.body);
            res.json(usuarioActualizado);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    actualizarContrasena = async (req: Request, res: Response): Promise<void> => {
        try {
            await usuarioService.actualizarContrasena(Number(req.params.id), req.body);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    eliminarUsuario = async (req: Request, res: Response): Promise<void> => {
        try {
            const mensaje = await usuarioService.eliminarUsuario(Number(req.params.id));
            res.status(200).json({ message: mensaje });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    obtenerUsuarioConEstadisticas = async (req: Request, res: Response): Promise<void> => {
        try {
            const usuarioId = parseInt(req.params.usuarioId, 10);
            const usuarioConEstadisticas = await usuarioService.obtenerUsuarioConEstadisticas(usuarioId);
            console.log("Estadisticas:", usuarioConEstadisticas);
            res.status(200).json(usuarioConEstadisticas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    obtenerUsuarioEnRefresco = async (req: CustomRequest, res: Response): Promise<void> => {
        res.status(200).json(req.user);
    };

    membresiaFake = async (req: Request, res: Response): Promise<void> => {
        //Cambiar en usuario ismembershipactive a true o false
        try {
            const usuarioId = parseInt(req.body.userId, 10);
            console.log("Usuario id:", usuarioId);
            const usuario = await usuarioService.obtenerUsuarioPorId(usuarioId);
            if (!usuario) throw new Error("Usuario no encontrado");
            usuario.isMembershipActive = !usuario.isMembershipActive;
            const usuarioActualizado = await usuarioService.actualizarUsuario(usuarioId, usuario);
            res.status(200).json({ message: "Usuario actualizado", user: usuarioActualizado });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

}
