require("dotenv").config();  // Cargar variables de entorno
const { EntitySchema } = require("typeorm");

isTestEnv = process.env.NODE_ENV === 'test';

module.exports = new EntitySchema({
    name: "Negocio",
    tableName: "negocio",
    columns: {
        id: { primary: true, type: "int", generated: true },
        name: { type: "varchar", length: 100, nullable: false },
        address: { type: "varchar", length: 255, nullable: true },
        rut: { type: "varchar", length: 11, nullable: false },
        isActive: { type: isTestEnv ? "integer" : "bool", nullable: false }
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: { name: "usuario_id" },
            default: null,
            onDelete: "CASCADE"
        },
        trabajadores: {
            target: "InformacionLaboral",
            type: "one-to-many",
            inverseSide: "negocio"
        },
        mutualidad: {
            target: "Mutualidad",
            type: "many-to-one",
            joinColumn: { name: "mutualidad_id" },
            default: null,
        },
        ccaf: {
            target: "CCAF",
            type: "many-to-one",
            joinColumn: { name: "ccaf_id" },
            default: null,
            inverseSide: "negocios",
        }
    }
});
