require("reflect-metadata");
const { DataSource } = require("typeorm");
require("dotenv").config();  // Cargar las variables de entorno desde el archivo .env

// Importar las entidades
const Usuario = require("./entities/Usuario.js");
const Negocio = require("./entities/Negocio.js");
const CompraCredito = require("./entities/Creditos.js");
const Trabajador = require("./entities/Trabajador.js");
const InformacionLaboral = require("./entities/InformacionLaboral.js");
const HistorialRemuneracion = require("./entities/HisotrialRemuneracion.js");
const Salud = require("./entities/Salud.js");
const AFP = require("./entities/AFP.js");
const Mutualidad = require("./entities/Mutualidad.js");
const Cesantia = require("./entities/Cesantia.js");

// Configuración de la base de datos utilizando dotenv
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Cambia a false en producción
    logging: true,
    entities: [
        Usuario,
        Negocio,
        CompraCredito,
        Trabajador,
        InformacionLaboral,
        HistorialRemuneracion,
        Salud,
        AFP,
        Mutualidad,
        Cesantia
    ]
});

// Inicializar la conexión a la base de datos
AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos establecida correctamente");
    })
    .catch((error) => console.log("Error al conectar a la base de datos: ", error));

module.exports = AppDataSource;
