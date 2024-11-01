require("dotenv").config();  // Cargar variables de entorno, incluido NODE_ENV
const { EntitySchema } = require("typeorm");

isTestEnv = process.env.NODE_ENV === 'test';

module.exports = new EntitySchema({
    name: "InformacionLaboral",
    tableName: "informacion_laboral",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        tipo_trabajador: {
            type: "int",
            nullable: false,
            comment: "[0, 1, 2, 3, 8] opciones para indicar si es activo o pensionado en diferentes opciones"
        },
        tipo_remuneracion: {
            type: isTestEnv ? "varchar" : "char",
            length: 2,
            nullable: false,
            comment: "[01, 02, 03] rem del mes, gratif, bono ley modernizacion empresas publicas"
        },
        regimen_previsional: {
            type: "varchar",
            length: 3,
            nullable: false,
            comment: "[AFP, INP, SIP] AFP, INP o sin prevision"
        },
        tipo_salud: {
            type: "varchar",
            nullable: false,
            comment: "Aqui se indica si es FONASA o ISAPRE"
        },
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: {
                name: "trabajador_id",
            },
            onDelete: "CASCADE"
        },
        negocio: {
            target: "Negocio",
            type: "many-to-one",
            joinColumn: {
                name: "negocio_id",
            }
        }
    }
});
