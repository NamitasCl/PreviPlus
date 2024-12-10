// src/app.ts
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/indexRoutes.js";

export class App {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  // Inicializa los middlewares
  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: "http://localhost:5173", // Reemplaza con el origen del frontend
        credentials: true, // Permitir cookies en solicitudes
      })
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
  }

  // Inicializa las rutas principales
  private initializeRoutes(): void {
    this.app.use("/api", indexRoutes); // Cargar las rutas desde el archivo correspondiente
  }

  // Método para arrancar el servidor
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }

  // Getter para la instancia de la aplicación (opcional, útil para pruebas)
  public getServerInstance(): Application {
    return this.app;
  }
}