// src/app.ts

import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { AppDataSource, initializeBasicData } from './db';
import { indexRoutes } from './routes/indexRoutes';
import http, { Server } from 'http';
import cookieParser from 'cookie-parser';

export class App {
  private app: Application;
  private port: number;
  private server?: Server;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors(
      {
        origin: 'http://localhost:5173',
        credentials: true,
      }
    ));
    this.app.use(cookieParser());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes() {
    this.app.use('/api', indexRoutes);
  }

  public getAppInstance(): Application {
    return this.app;
  }

  public async start() {
    try {
      await AppDataSource.initialize();
      console.log('Data Source has been initialized!');
      await initializeBasicData();

      this.server = this.app.listen(this.port, () => {
        console.log(`Servidor corriendo en http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error('Error durante la inicialización del Data Source:', error);
    }
  }

  public async stop() {
    if (this.server) {
      this.server.close(() => {
        console.log('Servidor detenido');
      });
    }

    await AppDataSource.destroy();
    console.log('Data Source has been destruido!');
  }
}