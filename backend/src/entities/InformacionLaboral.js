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
        tipo_trabajador: {
            type: "int",
            nullable: false
        },
        tipo_remuneracion: {
            type: "char",
            length: 1,
            nullable: false
        },
        regimen_previsional: {
            type: "varchar",
            length: 3,
            nullable: false
        }
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "one-to-one",
            joinColumn: true,
            onDelete: "CASCADE"
        }
    }
});
