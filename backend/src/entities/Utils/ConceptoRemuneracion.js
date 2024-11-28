const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ConceptoRemuneracion",
    tableName: "conceptos_remuneracion",
    columns: {
        id: { primary: true, type: "int", generated: true },
        nombre: { type: "varchar", length: 100, nullable: false, unique: true, comment: "Nombre del concepto de remuneración" },
        descripcion: { type: "text", nullable: true, comment: "Descripción del concepto" },
        isImponible: { type: "bool", nullable: false, default: false, comment: "Tipo de concepto (e.g., imponible, no imponible, habitual, no habitual)" }
    },
    relations: {
        detalleRemuneraciones: {
            target: "DetalleRemuneracion",
            type: "one-to-many",
            inverseSide: "conceptoRemuneracion"
        }
    }
});
