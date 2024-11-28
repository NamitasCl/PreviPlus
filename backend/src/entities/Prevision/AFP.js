// AFP.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "AFP",
    tableName: "afp",
    columns: {
        id: { primary: true, type: "int", generated: true },
        codigoAfp: { type: "int", nullable: false, unique: true, comment: "Código único de la AFP" },
        nombreAfp: { type: "varchar", length: 50, nullable: false, comment: "Nombre de la AFP" },
        tasaCotizacion: { type: "decimal", precision: 5, scale: 2, nullable: false, comment: "Tasa de cotización obligatoria" },
    },
    relations: {
        trabajadores: {
            target: "Trabajador",
            type: "one-to-many",
            inverseSide: "afp",
        },
    
    }
});
