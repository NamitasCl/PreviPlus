// Trabajador.js

require("dotenv").config();
const { EntitySchema } = require("typeorm");

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = new EntitySchema({
    name: "Trabajador",
    tableName: "trabajador",
    columns: {
        id: { primary: true, type: "int", generated: true },
        rut: { type: "varchar", nullable: false },
        dv: { type: isTestEnv ? "varchar" : "char", length: 1, nullable: false },
        patlastname: { type: "varchar", nullable: false },
        matlastname: { type: "varchar", nullable: true },
        names: { type: "varchar", nullable: false },
        genero: { type: isTestEnv ? "varchar" : "char", length: 1, nullable: false },
        nationality: { type: "varchar", nullable: false }
    },
    relations: {
        negocio: {
            target: "Negocio",
            type: "many-to-one",
            joinColumn: { name: "negocio_id" },
            onDelete: "CASCADE",
            inverseSide: "trabajadores"
        },
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "one-to-one",
            inverseSide: "trabajador",
            cascade: true
        },
        historialRemuneraciones: {
            target: "HistorialRemuneracion",
            type: "one-to-many",
            inverseSide: "trabajador"
        },
        cesantias: {
            target: "Cesantia",
            type: "one-to-many",
            inverseSide: "trabajador"
        }
    }
});
