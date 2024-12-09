// src/datasource.ts

import "reflect-metadata";
import { DataSource } from "typeorm";

// Importa otras entidades según sea necesario
import { AFP } from "./entities/AFP.entity";
import {ArchivosPreviredGenerado} from "./entities/ArchivosPreviredGenerados.entity";
import {AsignacionFamiliar} from "./entities/AsignacionFamiliar.entity";
import {ConceptoRemuneracion} from "./entities/ConceptoRemuneracion.entity";
import {ConfiguracionArchivoPrevired} from "./entities/ConfiguracionArchivoPrevired.entity";
import {HistorialContratacion} from "./entities/HistorialContratacion.entity";
import {HistorialRemuneracion} from "./entities/HistorialRemuneracion.entity";
import {InformacionLaboral} from "./entities/InformacionLaboral.entity";
import {Mutualidad} from "./entities/Mutualidad.entity";
import {Salud} from "./entities/Salud.entity";
import {Trabajador} from "./entities/Trabajador.entity";
import {Usuario} from "./entities/Usuario.entity";
import {CCAF} from "./entities/CCAF.entity";
import {Negocio} from "./entities/Negocio.entity";
import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "namas",
  password: "namas",
  database: isTest ? "previplus-test" : "previplus",
  synchronize: isTest ? true : false, // Habilita synchronize solo en pruebas
  logging: false,
  entities: [
    ArchivosPreviredGenerado,
    AFP,
    CCAF,
    HistorialContratacion,
    HistorialRemuneracion,
    Mutualidad,
    Salud,
    Trabajador,
    AsignacionFamiliar,
    ConceptoRemuneracion,
    Negocio,
    Usuario,
    InformacionLaboral,
    ConfiguracionArchivoPrevired
  ],
  migrations: isTest ? [] : ["dist/migrations/**/*.js"],
  subscribers: isTest ? [] : ["dist/subscribers/**/*.js"],
});
