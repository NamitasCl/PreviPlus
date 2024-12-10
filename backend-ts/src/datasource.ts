// src/datasource.ts

import "reflect-metadata";
import { DataSource } from "typeorm";

// Importa otras entidades según sea necesario
import { AFP } from "./entities/AFP.entity.js";
import {ArchivosPreviredGenerado} from "./entities/ArchivosPreviredGenerados.entity.js";
import {AsignacionFamiliar} from "./entities/AsignacionFamiliar.entity.js";
import {ConceptoRemuneracion} from "./entities/ConceptoRemuneracion.entity.js";
import {ConfiguracionArchivoPrevired} from "./entities/ConfiguracionArchivoPrevired.entity.js";
import {HistorialContratacion} from "./entities/HistorialContratacion.entity.js";
import {InformacionLaboral} from "./entities/InformacionLaboral.entity.js";
import {Mutualidad} from "./entities/Mutualidad.entity.js";
import {Salud} from "./entities/Salud.entity.js";
import {Trabajador} from "./entities/Trabajador.entity.js";
import {Usuario} from "./entities/Usuario.entity.js";
import {CCAF} from "./entities/CCAF.entity.js";
import {Negocio} from "./entities/Negocio.entity.js";
import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "namas",
  password: "namas",
  database: isTest ? "previplus_test" : "previplus",
  synchronize: isTest ? true : false, // Habilita synchronize solo en pruebas
  logging: false,
  entities: [
    ArchivosPreviredGenerado,
    AFP,
    CCAF,
    HistorialContratacion,
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
