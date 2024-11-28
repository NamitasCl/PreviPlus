// Salud.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Salud",
    tableName: "salud",
    columns: {
        id: { primary: true, type: "int", generated: true },
        codigoSalud: { type: "int", nullable: false, unique: true, comment: "Código de Fonasa o Isapre" },
        nombreEntidadSalud: { type: "varchar", length: 50, nullable: false, comment: "Nombre de Fonasa o Isapre" },
        tasaSalud: { type: "decimal", precision: 5, scale: 2, nullable: true, default: 0.07, comment: "7%" },
        tasaSaludCcaf: { type: "decimal", precision: 5, scale: 2, nullable: true, default: 0, comment: "Porcentaje de Fonasa cuando hay CCAF" },
        
    },
    relations: {
        trabajadores: {
            target: "Trabajador",
            type: "one-to-many",
            inverseSide: "salud",
        },
    },
});
