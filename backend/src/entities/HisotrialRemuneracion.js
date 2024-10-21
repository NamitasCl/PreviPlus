const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "HistorialRemuneracion",
    tableName: "historial_remuneracion",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        mes_remuneracion: {
            type: "char",
            length: 6,
            nullable: false
        },
        sueldo_imponible: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false
        },
        cotizacion_obligatoria_afp: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        cotizacion_sis: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        cotizacion_fonasa: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        cotizacion_isapre: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        cotizacion_adicional_isapre: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        cotizacion_isl: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        cotizacion_mutual: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        aporte_trabajador_cesantia: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },
        aporte_empleador_cesantia: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true
        },

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
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "many-to-one",
            joinColumn: {
                name: "informacion_laboral_id"  // Nombre de la columna explícitamente definido
            },
            onDelete: "CASCADE"
        }
    }
});
