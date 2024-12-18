import { Request, Response } from "express";
import { ArchivoPreviredService } from "../services/index";
import { AppDataSource } from "../db";

const archivoPreviredService = new ArchivoPreviredService(AppDataSource);

export class ArchivoPreviredController {
    constructor() {}

    async generarArchivoPrevired(req: Request, res: Response): Promise<void> {
        try {
            const { userId, negocioId } = req.body;

            console.log("userId:", userId);
            console.log("negocioId:", negocioId);

            const archivoPrevired = await archivoPreviredService.generarArchivoPrevired(
                userId,
                negocioId
            );
            res.status(200).json({ message: "Archivo Previred generado", archivoPrevired });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}