require("reflect-metadata");
const { DataSource } = require("typeorm");
require("dotenv").config();  // Cargar las variables de entorno desde el archivo .env

// Importar las entidades
//Entidades de Previplus
const Membresia = require("./entities/Previplus/Membresia.js");
const Usuario = require("./entities/Previplus/Usuario.js");

//Entidades de Negocio
const Negocio = require("./entities/Negocio/Negocio.js");
const InformacionLaboral = require("./entities/Negocio/InformacionLaboral.js");

//Entidades de Trabajador
const Trabajador = require("./entities/Trabajador/Trabajador.js");

//Entidades de Prevision
const CCAF = require("./entities/Prevision/CCAF.js");
const Salud = require("./entities/Prevision/Salud.js");
const Mutualidad = require("./entities/Prevision/Mutualidad.js");
const AFP = require("./entities/Prevision/AFP.js");

//Entidades de Previred
const ArchivosPrevired = require("./entities/Previred/ArchivosPreviredGenerados.js");

//Entidades de Utils
const ConfiguracionArchivoPrevired = require("./entities/Utils/ConfiguracionArchivoPrevired.js");
const AsignacionFamiliarData = require("./entities/Utils/AsignacionFamiliarData.js");

//Entidades de Remuneraciones
const HistorialRemuneracion = require("./entities/Remuneraciones/HisotrialRemuneracion.js");

// Configuración condicional en función del entorno
const isTestEnv = process.env.NODE_ENV === "test";

const AppDataSource = new DataSource({
    type: isTestEnv ? "sqlite" : "postgres",
    database: isTestEnv ? ":memory:" : process.env.DB_NAME, // En modo test, usa SQLite en memoria
    host: isTestEnv ? undefined : process.env.DB_HOST,
    port: isTestEnv ? undefined : process.env.DB_PORT,
    username: isTestEnv ? undefined : process.env.DB_USERNAME,
    password: isTestEnv ? undefined : process.env.DB_PASSWORD,
    synchronize: true, // En modo test, esto creará las tablas automáticamente
    dropSchema: isTestEnv, // Elimina el esquema al finalizar para pruebas limpias
    logging: !isTestEnv, // Desactiva el logging en modo test
    entities: [
        Usuario,
        Negocio,
        Trabajador,
        InformacionLaboral,
        HistorialRemuneracion,
        Salud,
        AFP,
        Mutualidad,
        CCAF,
        ConfiguracionArchivoPrevired,
        Membresia,
        AsignacionFamiliarData,
        ArchivosPrevired
    ]
});

// Inicializar la conexión a la base de datos solo si no estamos en modo de prueba
if (!isTestEnv) {
    AppDataSource.initialize()
        .then(() => {
            console.log("Conexión a la base de datos establecida correctamente");
        })
        .catch((error) => console.log("Error al conectar a la base de datos: ", error));
}

module.exports = AppDataSource;