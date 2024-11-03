// InformacionLaboral.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "InformacionLaboral",
    tableName: "informacion_laboral",
    columns: {
        id: { primary: true, type: "int", generated: true },
        tipo_contrato: { type: "varchar", length: 20, nullable: false, comment: "Tipo de contrato: plazo fijo o indefinido" },
        tipo_trabajador: { type: "int", nullable: false, comment: "0: Activo (No pensionado), 1: Pensionado y cotiza, 2: Pensionado y no cotiza, 3: Activo > 65 años (nunca pensionado)" },
        tipo_pago: { type: "varchar", length: 2, nullable: true, comment: "01: Remuneracion mes, 02: Gratificación, 03: Bono modernizacion estado" },
        regimen_previsional: { type: "varchar", length: 3, nullable: false, comment: "AFP, SIP, INP" },
        institucion_afp: { type: "varchar", length: 20, nullable: true, comment: "Nombre de la AFP" },
        tipo_salud: { type: "varchar", nullable: false, comment: "FONASA, ISAPRE" },
        institucion_salud: { type: "varchar", length: 20, nullable: true, comment: "Nombre de la institucion de salud" },
        tasa_trabajador_cesantia: { type: "decimal", precision: 5, scale: 2, nullable: true, default: 0.6 },
        tasa_empleador_cesantia: { type: "decimal", precision: 5, scale: 2, nullable: true },
        sueldo_imponible: { type: "int", nullable: true },
        tramo_asignacion_familiar: { type: "varchar", length: 1, nullable: true },
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
