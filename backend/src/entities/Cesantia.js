const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Cesantia",
    tableName: "cesantia",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        tasa_trabajador: {
            type: "decimal",
            precision: 5,
            scale: 2,
            nullable: false
        },
        tasa_empleador: {
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
