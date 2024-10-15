const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Salud",
    tableName: "salud",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        codigo_isapre: {
            type: "int",
            nullable: true
        },
        tasa_salud: {
            type: "decimal",
            precision: 5,
            scale: 2,
            nullable: true
        },
        adicional_ges: {
            type: "decimal",
            precision: 5,
            scale: 2,
            nullable: true
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
