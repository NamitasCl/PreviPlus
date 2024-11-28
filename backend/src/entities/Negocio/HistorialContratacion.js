const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "HistorialContratacion",
    tableName: "historial_contratacion",
    columns: {
        id: { primary: true, type: "int", generated: true },
        fechaInicio: { type: "date", nullable: false, comment: "Fecha de inicio de la relación laboral" },
        fechaTermino: { type: "date", nullable: true, comment: "Fecha de término de la relación laboral" },
        puesto: { type: "varchar", length: 100, nullable: false, comment: "Puesto del trabajador" },
        tipoContrato: { type: "varchar", length: 50, nullable: false, comment: "Tipo de contrato (Plazo fijo o indefinido)" },
        sueldoImponible: { type: "decimal", precision: 10, scale: 2, nullable: false, comment: "Sueldo imponible del trabajador al momento de la contratación" },
        // Datos históricos copiados para auditabilidad
        tasaSalud: { type: "decimal", precision: 5, scale: 2, nullable: false, comment: "Tasa de salud en el momento de la contratación" },
        nombreEntidadSalud: { type: "varchar", length: 50, nullable: false, comment: "Nombre de la institución de salud (Fonasa/Isapre)" },
        tasaAfp: { type: "decimal", precision: 5, scale: 2, nullable: false, comment: "Tasa de cotización obligatoria en el momento de la contratación" },
        nombreAfp: { type: "varchar", length: 50, nullable: false, comment: "Nombre de la AFP" },
        tasaCesantiaTrabajador: { type: "decimal", precision: 5, scale: 2, nullable: false, comment: "Tasa de cesantía del trabajador" },
        tasaCesantiaEmpleador: { type: "decimal", precision: 5, scale: 2, nullable: false, comment: "Tasa de cesantía del empleador" },
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: { name: "trabajador_id" },
            onDelete: "CASCADE",
            nullable: false,
            comment: "Trabajador asociado a este registro de contratación",
        },
        negocio: {
            target: "Negocio",
            type: "many-to-one",
            joinColumn: { name: "negocio_id" },
            onDelete: "CASCADE",
            nullable: false,
            comment: "Negocio asociado a esta contratación",
        },
    },
});
