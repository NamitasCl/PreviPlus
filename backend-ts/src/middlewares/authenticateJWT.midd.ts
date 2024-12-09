import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token; // Obtenemos el token desde las cookies

    if (!token) {
        res.status(401).json({ message: "No estás autenticado" });
        return;
    }

    jwt.verify(token, process.env.SECRET_WORD as string, (err: any, user: any) => { jwt
        if (err) {
            res.status(403).json({ message: "Token no válido" });
            return;
        }

        req.user = user; // Guardamos el usuario en el request
        next();
    });
};

export default authenticateJWT;