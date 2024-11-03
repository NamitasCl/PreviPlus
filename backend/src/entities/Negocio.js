// Negocio.js

require("dotenv").config();
const { EntitySchema } = require("typeorm");

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = new EntitySchema({
    name: "Negocio",
    tableName: "negocio",
    columns: {
        id: { primary: true, type: "int", generated: true },
        name: { type: "varchar", length: 100, nullable: false },
        address: { type: "varchar", length: 255, nullable: true },
        rut: { type: "varchar", nullable: false },
        is_active: { type: isTestEnv ? "integer" : "bool", nullable: false }
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: { name: "usuario_id" },
            onDelete: "CASCADE"
        },
        trabajadores: {
            target: "Trabajador",
            type: "one-to-many",
            inverseSide: "negocio"
        },
        mutualidad: {
            target: "Mutualidad",
            type: "many-to-one",
            joinColumn: { name: "mutualidad_id" },
            onDelete: "SET NULL",
            inverseSide: "negocios"
        },
        ccaf: {
            target: "CCAF",
            type: "many-to-one",
            joinColumn: { name: "ccaf_id" },
            onDelete: "SET NULL",
            inverseSide: "negocios"
        }
    }
});
