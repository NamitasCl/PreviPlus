import { parse } from "path";
import {App} from "./app.js";
import dotenv from "dotenv";
import { AppDataSource } from "./datasource.js";

// Cargar variables de entorno
dotenv.config();

// Inicializar la conexión a la base de datos
AppDataSource.initialize()
.then(() => {
  console.log("Conexión a la base de datos establecida correctamente");

  // Inicializar el servidor
  const app = new App(parseInt(process.env.PORT || "3000"));
  app.listen();

})
.catch((error) => {
  console.log("Error al iniciar la conexión a la base de datos:", error);
});