// Cesantia.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Cesantia",
    tableName: "cesantia",
    columns: {
        id: { primary: true, type: "int", generated: true },
        mesRemuneracion: { type: "varchar", length: 6, nullable: false },
        aporteTrabajador: { type: "decimal", precision: 10, scale: 2, nullable: true },
        aporteEmpleador: { type: "decimal", precision: 10, scale: 2, nullable: true }
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: { name: "trabajador_id" },
            inverseSide: "cesantias",
            onDelete: "CASCADE"
        },
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "many-to-one",
            joinColumn: { name: "informacion_laboral_id" },
            onDelete: "CASCADE"
        }
    }
});
