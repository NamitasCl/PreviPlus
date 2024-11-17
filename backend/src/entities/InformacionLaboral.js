// InformacionLaboral.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "InformacionLaboral",
    tableName: "informacion_laboral",
    columns: {
        id: { primary: true, type: "int", generated: true },
        puesto: { type: "varchar", length: 100, nullable: true, comment: "Puesto de trabajo" },
        departamento: { type: "varchar", length: 100, nullable: true, comment: "Departamento de trabajo" },
        fechaInicioLabores: { type: "date", nullable: true, comment: "Fecha de inicio de labores" },
        tipoContrato: { type: "varchar", length: 20, nullable: false, comment: "Tipo de contrato: plazo fijo o indefinido" },
        tipoTrabajador: { type: "int", nullable: false, comment: "0: Activo (No pensionado), 1: Pensionado y cotiza, 2: Pensionado y no cotiza, 3: Activo > 65 años (nunca pensionado)" },
        tipoPago: { type: "varchar", length: 2, nullable: true, comment: "01: Remuneracion mes, 02: Gratificación, 03: Bono modernizacion estado" },
        regimenPrevisional: { type: "varchar", length: 3, nullable: false, comment: "AFP, SIP, INP" },
        institucionAfp: { type: "varchar", length: 20, nullable: true, comment: "Nombre de la AFP" },
        tipoSalud: { type: "varchar", nullable: false, comment: "FONASA, ISAPRE" },
        institucionSalud: { type: "varchar", length: 20, nullable: true, comment: "Nombre de la institucion de salud" },
        tasaTrabajadorCesantia: { type: "decimal", precision: 5, scale: 2, nullable: true, default: 0.6 }, 
        tasaEmpleadorCesantia: { type: "decimal", precision: 5, scale: 2, nullable: true },
        sueldoImponible: { type: "int", nullable: true },
        valorColacion: { type: "decimal", precision: 10, scale: 2, nullable: true },
        valorMovilizacion: { type: "decimal", precision: 10, scale: 2, nullable: true },
        haveAsignacionFamiliar: { type: "bool", nullable: true },
        tramoAsignacionFamiliar: { type: "varchar", length: 1, nullable: true },
        resolucionAsignacionFamiliar: { type: "varchar", length: 1, nullable: true },
        isTiempoCompleto: { type: "bool", nullable: true },
        isPensionado: { type: "bool", nullable: true },
        hasComisiones: { type: "bool", nullable: true },
        valorOtrasRentas: { type: "decimal", precision: 10, scale: 2, nullable: true, comment: "Suma de otras rentas que no son sueldo base ni comisiones" },
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "one-to-one",
            joinColumn: { name: "trabajador_id" },
            inverseSide: "informacionLaboral",
            onDelete: "CASCADE"
        },
        negocio: {
            target: "Negocio",
            type: "many-to-one",
            joinColumn: { name: "negocio_id" },
            onDelete: "CASCADE"
        },
        afp: {
            target: "AFP",
            type: "many-to-one",
            joinColumn: { name: "afp_id" },
            onDelete: "SET NULL",
            inverseSide: "informacionLaboral"
        },
        salud: {
            target: "Salud",
            type: "many-to-one",
            joinColumn: { name: "salud_id" },
            onDelete: "SET NULL",
            inverseSide: "informacionLaboral"
        },
        ccaf: {
            target: "CCAF",
            type: "many-to-one",
            joinColumn: { name: "ccaf_id" },
            onDelete: "SET NULL",
            inverseSide: "informacionLaboral"
        },
        mutualidad: {
            target: "Mutualidad",
            type: "many-to-one",
            joinColumn: { name: "mutualidad_id" },
            onDelete: "SET NULL",
            inverseSide: "informacionLaboral"
        }

    }
});
