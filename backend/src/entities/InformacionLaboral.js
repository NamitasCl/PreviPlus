const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "InformacionLaboral",
    tableName: "informacion_laboral",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        tipoContrato: {
            type: "varchar",
            length: 20,
            nullable: false,
            comment: "Tipo de contrato: plazo fijo o indefinido"
        },
        tipoTrabajador: {
            type: "int",
            nullable: false,
            comment: "[0, 1, 2, 3, 8] opciones para indicar si es activo o pensionado en diferentes opciones"
        },
        tipoRemuneracion: {
            type: "varchar",
            length: 2,
            nullable: false,
            comment: "[01, 02, 03] rem del mes, gratif, bono ley modernizacion empresas publicas"
        },
        regimenPrevisional: {
            type: "varchar",
            length: 3,
            nullable: false,
            comment: "[AFP, INP, SIP] AFP, INP o sin prevision"
        },
        tipoSalud: {
            type: "varchar",
            nullable: false,
            comment: "Indica si es FONASA o ISAPRE"
        },
        tasaTrabajadorCesantia: {
            type: "decimal",
            precision: 5,
            scale: 2,
            nullable: true,
            default: 0.6,
            comment: "Tasa de aporte del trabajador al seguro de cesantía (0.6% para indefinido)"
        },
        tasaEmpleadorCesantia: {
            type: "decimal",
            precision: 5,
            scale: 2,
            nullable: true,
            comment: "Tasa de aporte del empleador al seguro de cesantía (2.4% para indefinido, 3% para plazo fijo)"
        }
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: {
                name: "trabajador_id",
            },
            onDelete: "CASCADE"
        },
        negocio: {
            target: "Negocio",
            type: "many-to-one",
            joinColumn: {
                name: "negocio_id",
            }
        },
        afp: {
            target: "AFP",
            type: "many-to-one",
            joinColumn: {
                name: "afp_id",
            },
            nullable: true,
            onDelete: "SET NULL",
            comment: "Asociación con la AFP en la que está registrado el trabajador"
        },
        salud: {
            target: "Salud",
            type: "many-to-one",
            joinColumn: {
                name: "salud_id",
            },
            nullable: true,
            onDelete: "SET NULL",
            comment: "Asociación con el sistema de salud, ya sea FONASA o una ISAPRE"
        }
    }
});
