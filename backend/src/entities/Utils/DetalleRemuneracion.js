const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "DetalleRemuneracion",
    tableName: "detalle_remuneraciones",
    columns: {
        id: { primary: true, type: "int", generated: true },
        monto: { type: "decimal", precision: 10, scale: 2, nullable: false, comment: "Monto del concepto en el periodo" },
        cantidad: { type: "int", nullable: true, comment: "Cantidad o unidades aplicadas (e.g., horas extras)" },
        // Otros campos necesarios...
    },
    relations: {
        historialRemuneracion: {
            target: "HistorialRemuneraciones",
            type: "many-to-one",
            joinColumn: { name: "historial_remuneracion_id" },
            inverseSide: "detalleRemuneraciones",
            nullable: false
        },
        conceptoRemuneracion: {
            target: "ConceptoRemuneracion",
            type: "many-to-one",
            joinColumn: { name: "concepto_remuneracion_id" },
            inverseSide: "detalleRemuneraciones",
            nullable: false
        },
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "many-to-one",
            joinColumn: { name: "informacion_laboral_id" },
            inverseSide: "detalleRemuneraciones",
            nullable: true
        }
    }
});
