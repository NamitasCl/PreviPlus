// HistorialRemuneracion.js

require("dotenv").config();
const { EntitySchema } = require("typeorm");

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = new EntitySchema({
    name: "HistorialRemuneracion",
    tableName: "historial_remuneracion",
    columns: {
        id: { primary: true, type: "int", generated: true },
        diasTrabajados: { type: "int", nullable: true, comment: "Días trabajados en el mes" },
        mesRemuneracion: { type: isTestEnv ? "varchar" : "char", length: 6, nullable: false, comment: "Formato: mmaaaa" },
        sueldoImponible: { type: "int", nullable: false, comment: "Sueldo imponible del trabajador, aqui se suma todo el sueldo que sea imponible" },
        cotizacionObligatoriaAFP: { type: "int", nullable: true, comment: "Monto cotización obligatoria AFP" },
        cotizacionSIS: { type: "int", nullable: true, comment: "Monto cotización SIS" },
        cotizacionFonasa: { type: "int", nullable: true, comment: "Monto cotización Fonasa" },
        cotizacionIsapre: { type: "int", nullable: true, comment: "Monto cotización Isapre (7%)" },
        cotizacionAdicionalIsapre: { type: "int", nullable: true, comment: "Monto adicional Isapre (sobre 7%)" },
        cotizacionISL: { type: "int", nullable: true, comment: "Monto cotización ISL" },
        cotizacionMutual: { type: "int", nullable: true, comment: "Monto cotización mutualidad" },
        aporteTrabajadorCesantia: { type: "int", nullable: true, comment: "Aporte del trabajador al seguro de cesantía" },
        aporteEmpleadorCesantia: { type: "int", nullable: true, comment: "Aporte del empleador al seguro de cesantía" },
        // Campos de CCAF
        creditosPersonalesCcaf: { type: "int", nullable: true, comment: "Créditos personales CCAF" },
        descuentoDentalCcaf: { type: "int", nullable: true, comment: "Descuento dental CCAF" },
        descuentoLeasingCcaf: { type: "int", nullable: true, comment: "Descuento leasing CCAF" },
        descuentoSeguroVidaCcaf: { type: "int", nullable: true, comment: "Descuento seguro de vida CCAF" },
        otrosDescuentosCcaf: { type: "int", nullable: true, comment: "Otros descuentos CCAF" },
        cotizacionCcafNoIsapre: { type: "int", nullable: true, comment: "Cotización CCAF no Isapre" },
        descuentoCargasFamiliaresCcaf: { type: "int", nullable: true, comment: "Descuento cargas familiares CCAF" }
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: { name: "trabajador_id" },
            inverseSide: "historialRemuneraciones",
            onDelete: "CASCADE"
        },
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "many-to-one",
            joinColumn: { name: "informacion_laboral_id" },
            onDelete: "CASCADE"
        },
        ccaf: {
            target: "CCAF",
            type: "many-to-one",
            joinColumn: { name: "ccaf_id" },
            inverseSide: "historialRemuneraciones",
            onDelete: "SET NULL"
        },
        mutualidad: {
            target: "Mutualidad",
            type: "many-to-one",
            joinColumn: { name: "mutualidad_id" },
            inverseSide: "historialRemuneraciones",
            onDelete: "SET NULL"
        }
    }
});
