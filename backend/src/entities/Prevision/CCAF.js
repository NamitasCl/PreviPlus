// CCAF.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "CCAF",
    tableName: "ccaf",
    columns: {
        id: { primary: true, type: "int", generated: true },
        nombre: { type: "varchar", length: 50, nullable: true, comment: "Nombre de la CCAF" },
        codigoccaf: { type: "int", nullable: false, unique: true, comment: "Código de la CCAF" },
        tasaccaf: { type: "decimal", precision: 5, scale: 2, nullable: true, comment: "Tasa de pago de la CCAF" },
        // Nuevos campos
        
    },
    relations: {
        negocios: {
            target: "Negocio",
            type: "one-to-many",
            inverseSide: "ccaf",
        },
    },
});
