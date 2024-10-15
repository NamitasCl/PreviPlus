const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "AFP",
    tableName: "afp",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        codigo_afp: {
            type: "int",
            nullable: false
        },
        tasa_cotizacion: {
            type: "decimal",
            precision: 5,
            scale: 2,
            nullable: false
        },
        tasa_sis: {
            type: "decimal",
            precision: 5,
            scale: 2,
            nullable: false
        }
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: true,
            onDelete: "CASCADE"
        }
    }
});
