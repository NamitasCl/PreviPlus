const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "AsignacionFamiliarData",
    tableName: "asignacion_familiar_data",
    columns: {
        id: { primary: true, type: "int", generated: true },
        tramoAsignacionFamiliar: { type: "varchar", length: 1, nullable: false, comment: "Letra correspondiente al tramo de asignación familiar" },
        montoPago: { type: "int", nullable: false, comment: "Monto de pago de asignación familiar" },
        rentaTope: { type: "int", nullable: false, comment: "Renta tope para pago de asignación familiar" }, 
    }
});