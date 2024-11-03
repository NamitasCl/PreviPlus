// Mutualidad.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Mutualidad",
    tableName: "mutualidad",
    columns: {
        id: { primary: true, type: "int", generated: true },
        codigomutualidad: { type: "int", nullable: false, unique: true, comment: "Código de la mutualidad" },
        nombre: { type: "varchar", length: 50, nullable: false, comment: "Nombre de la mutualidad" },
        tasamutual: { type: "decimal", precision: 5, scale: 2, nullable: true, comment: "Tasa de cotización de la mutualidad" }
    },
    relations: {
        // Una mutualidad puede estar asociada con múltiples negocios
        negocios: {
            target: "Negocio",
            type: "one-to-many",
            inverseSide: "mutualidad"
        },
        // Relación con HistorialRemuneracion
        historialRemuneraciones: {
            target: "HistorialRemuneracion",
            type: "one-to-many",
            inverseSide: "mutualidad"
        }
    }
});
