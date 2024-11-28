// Negocio.js

require("dotenv").config();
const { EntitySchema } = require("typeorm");

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = new EntitySchema({
    name: "Negocio",
    tableName: "negocio",
    columns: {
        id: { primary: true, type: "int", generated: true },
        rut: { type: "varchar", nullable: false },
        negocioName: { type: "varchar", length: 100, nullable: false },
        address: { type: "varchar", length: 255, nullable: true },
        repLegal: { type: "varchar", length: 100, nullable: true },
        rutRepLegal: { type: "varchar", length: 11, nullable: true },
        dvRepLegal: { type: "varchar", length: 1, nullable: true },
        isActive: { type: isTestEnv ? "integer" : "bool", nullable: false },
        tieneCcaf: { type: "bool", nullable: false, default: false },
        tieneMutual: { type: "bool", nullable: false, default: false },
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: { name: "usuario_id" },
            inverseSide: "negocios",
        },
        mutualidad: {
            target: "Mutualidad",
            type: "many-to-one",
            joinColumn: { name: "mutualidad_id" },
            nullable: false,
        },
        ccaf: {
            target: "CCAF",
            type: "many-to-one",
            joinColumn: { name: "ccaf_id" },
            nullable: false,
        },
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "one-to-many",
            inverseSide: "negocio",
        },
        historialRemuneraciones: {
            target: "HistorialRemuneracion",
            type: "one-to-many",
            inverseSide: "negocio",
        },
    },
});
