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
const CCAF = require("./entities/CCAF.js");
const ArchivoPrevired = require("./entities/ArchivoPrevired.js");
const IndicadoresPrevisionales = require("./entities/IndicadoresPrevisionales.js");
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
        CompraCredito,
        Trabajador,
        InformacionLaboral,
        HistorialRemuneracion,
        Salud,
        AFP,
        Mutualidad,
        Cesantia,
        CCAF,
        ArchivoPrevired,
        IndicadoresPrevisionales
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