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
        dv: { type: "varchar", length: 1, nullable: false },
        patlastname: { type: "varchar", nullable: false },
        matlastname: { type: "varchar", nullable: true },
        names: { type: "varchar", nullable: false },
        genero: { type: "varchar", length: 10, nullable: false },
        nationality: { type: "varchar", nullable: false }
    },
    relations: {
        salud: {
            target: "Salud",
            type: "many-to-one",
            joinColumn: { name: "salud_id" },
            nullable: false,
            eager: true,
        },
        afp: {
            target: "AFP",
            type: "many-to-one",
            joinColumn: { name: "afp_id" },
            nullable: false,
            eager: true,
        },
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "one-to-many",
            inverseSide: "trabajador",
            cascade: true,
            eager: false,
        },
        historialRemuneraciones: {
            target: "HistorialRemuneracion",
            type: "one-to-many",
            inverseSide: "trabajador",
            cascade: true,
            eager: true,
        },
        configuracionArchivoPrevired: {
            target: "ConfiguracionArchivoPrevired",
            type: "one-to-many",
            inverseSide: "trabajador",
            cascade: true,
        },
    },
});
