const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Mutualidad",
    tableName: "mutualidad",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        codigo_mutual: {
            type: "int",
            nullable: true
        },
        tasa_mutual: {
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
