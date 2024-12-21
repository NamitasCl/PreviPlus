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

    async obtenerArchivoPrevired(req: Request, res: Response): Promise<void> {
        //Obtener los archivos previred por negocio
        try {
            const { negocioId } = req.body;
            const archivosPrevired = await archivoPreviredService.obtenerArchivosPrevired(negocioId);
            res.status(200).json({ archivosPrevired });
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Obtener archivos previred por negocio, filtrando opcionalmente por mes y anio
    async obtenerArchivoPreviredPorNegocio(req: Request, res: Response): Promise<void> {
        //Obtener los archivos previred por negocio
        try {
            const { negocioId, mes, anio } = req.body;
            const archivosPrevired = await archivoPreviredService.obtenerArchivosPreviredPorNegocio(negocioId, mes, anio);
            res.status(200).json({ archivosPrevired });
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async descargarArchivo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const archivoPrevired = await archivoPreviredService.descargarArchivo(parseInt(id, 10));
            
            res.setHeader('Content-Disposition', `attachment; filename=archivo_previred_${id}.txt`);
            res.setHeader('Content-Type', 'text/plain');
            res.status(200).send(archivoPrevired);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async borrarArchivo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await archivoPreviredService.borrarArchivo(parseInt(id, 10));
            res.status(200).json({ message: "Archivo previred borrado" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}