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
        tipopago: { type: "int", nullable: true, comment: "01: Remuneracion mes, 02: Gratificación, 03: Bono modernizacion estado" }, 
        regimenPrevisional: { type: "varchar", length: 3, nullable: false, comment: "AFP, SIP, INP" },
        institucionAfp: { type: "varchar", length: 20, nullable: true, comment: "Nombre de la AFP" },
        codigoAfp: { type: "int", nullable: true, comment: "Código de la AFP" },
        tipoSalud: { type: "varchar", nullable: false, comment: "FONASA, ISAPRE" },
        institucionSalud: { type: "varchar", length: 20, nullable: true, comment: "Nombre de la institucion de salud" },
        cotizacionPactada: { type: "decimal", precision: 6, scale: 4, nullable: true, comment: "Monto del plan pactado con la Isapre (en UF o CLP)" },
        adicionalSalud: { type: "decimal", precision: 10, scale: 2, nullable: true, comment: "Monto adicional si el plan excede el 7%" },
        tipoMoneda: { type: "int", nullable: true, comment: "Tipo de moneda del plan pactado: 1: CLP o 2: UF" },
        numeroFun: { type: "varchar", length: 16, nullable: true, comment: "Número de contrato (FUN) en Isapre" },
        tasaTrabajadorCesantia: { type: "decimal", precision: 8, scale: 4, nullable: true, default: 0.6 }, 
        tasaEmpleadorCesantia: { type: "decimal", precision: 8, scale: 4, nullable: true },
        sueldoImponible: { type: "int", nullable: true },
        valorColacion: { type: "decimal", precision: 10, scale: 2, nullable: true },
        valorMovilizacion: { type: "decimal", precision: 10, scale: 2, nullable: true },
        haveAsignacionFamiliar: { type: "bool", nullable: true },
        tramoAsignacionFamiliar: { type: "varchar", length: 1, nullable: true },
        resolucionAsignacionFamiliar: { type: "varchar", length: 1, nullable: true },
        isTiempoCompleto: { type: "bool", nullable: true },
        isPensionado: { type: "bool", nullable: true },
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: { name: "trabajador_id" },
            inverseSide: "informacionLaboral",
            nullable: false,
        },
        negocio: {
            target: "Negocio",
            type: "many-to-one",
            joinColumn: { name: "negocio_id" },
            inverseSide: "informacionLaboral",
            nullable: false,
        },
    },
});
