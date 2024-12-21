import { DataSource } from "typeorm";
import { AFP } from "./entities/AFP.entity";
import { ArchivosPreviredGenerado } from "./entities/ArchivosPreviredGenerados.entity";
import { AsignacionFamiliar } from "./entities/AsignacionFamiliar.entity";
import { CCAF } from "./entities/CCAF.entity";
import { InformacionLaboral } from "./entities/InformacionLaboral.entity";
import { Mutualidad } from "./entities/Mutualidad.entity";
import { Negocio } from "./entities/Negocio.entity";
import { Salud } from "./entities/Salud.entity";
import { Trabajador } from "./entities/Trabajador.entity";
import { Usuario } from "./entities/Usuario.entity";
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
const isTest = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "namas",
  password: "namas",
  database: isTest ? "previplus_test" : "previplus",
  entities: [AFP, ArchivosPreviredGenerado, AsignacionFamiliar, CCAF, InformacionLaboral, Mutualidad, Negocio, Salud, Trabajador, Usuario],
  synchronize: true,
  logging: false,
});


export const initializeBasicData = async () => {
  const saludRepository = AppDataSource.getRepository(Salud);
  const afpRepository = AppDataSource.getRepository(AFP);
  const ccafRepository = AppDataSource.getRepository(CCAF);
  const mutualidadRepository = AppDataSource.getRepository(Mutualidad);

  // Verificar si ya existen datos
  const saludCount = await saludRepository.count();
  const afpCount = await afpRepository.count();
  const ccafCount = await ccafRepository.count();
  const mutualidadCount = await mutualidadRepository.count();

  if (saludCount === 0) {
      await saludRepository.save([
        { codigoSalud: 1, nombreEntidadSalud: "Isapre Banmédica", tasaSalud: 0.07 },
        { codigoSalud: 2, nombreEntidadSalud: "Isapre Consalud", tasaSalud: 0.07 },
        { codigoSalud: 3, nombreEntidadSalud: "Isapre Vida Tres", tasaSalud: 0.07 },
        { codigoSalud: 4, nombreEntidadSalud: "Isapre Colmena", tasaSalud: 0.07 },
        { codigoSalud: 5, nombreEntidadSalud: "Isapre Cruz Blanca", tasaSalud: 0.07 },
        { codigoSalud: 7, nombreEntidadSalud: "Fonasa", tasaSalud: 0.07 },
        { codigoSalud: 10, nombreEntidadSalud: "Isapre Nueva Masvida", tasaSalud: 0.07 },
      ]);
      console.log("Datos iniciales para Salud insertados.");
  }

  if (afpCount === 0) {
      await afpRepository.save([
          { codigoAfp: 5, nombreAfp: "Habitat", tasaCotizacion: 0.10 },
          { codigoAfp: 33, nombreAfp: "Capital", tasaCotizacion: 0.115 },
          { codigoAfp: 3, nombreAfp: "Cuprum", tasaCotizacion: 0.1144 },
          { codigoAfp: 29, nombreAfp: "PlanVital", tasaCotizacion: 0.09 },
          { codigoAfp: 8, nombreAfp: "Provida", tasaCotizacion: 0.10 },
          { codigoAfp: 34, nombreAfp: "Modelo", tasaCotizacion: 0.10 },
          { codigoAfp: 35, nombreAfp: "Uno", tasaCotizacion: 0.1049 },
      ]);
      console.log("Datos iniciales para AFP insertados.");
  }

  if (ccafCount === 0) {
      await ccafRepository.save([
          { codigoccaf: 1, nombre: "Caja Los Andes", tasaccaf: 0.006 },
          { codigoccaf: 2, nombre: "Caja de Compensación La Araucana", tasaccaf: 0.006 },
          { codigoccaf: 3, nombre: "Caja de Compensación Los Héroes", tasaccaf: 0.006 },
          { codigoccaf: 4, nombre: "Caja de Compensación 18 de Septiembre", tasaccaf: 0.006 },
      ]);
      console.log("Datos iniciales para CCAF insertados.");
  }

  if (mutualidadCount === 0) {
      await mutualidadRepository.save([
        { codigomutual: 0, nombre: "Instituto de Seguridad Laboral", tasamutual: 0.01 },
          { codigomutual: 2, nombre: "Mutual de Seguridad", tasamutual: 0.01 },
          { codigomutual: 1, nombre: "Asociación Chilena de Seguridad", tasamutual: 0.012 },
          { codigomutual: 3, nombre: "Instituto de Seguridad del Trabajo", tasamutual: 0.013 },
      ]);
      console.log("Datos iniciales para Mutualidades insertados.");
  }
};