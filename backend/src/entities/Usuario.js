// Usuario.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Usuario",
    tableName: "usuario",
    columns: {
        id: { primary: true, type: "int", generated: true },
        name: { type: "varchar", nullable: true },
        firstlastname: { type: "varchar", nullable: true },
        secondlastname: { type: "varchar", nullable: true },
        username: { type: "varchar", unique: true, nullable: false },
        email: { type: "varchar", unique: true, nullable: false },
        password: { type: "varchar", nullable: false },
        credits: { type: "decimal", precision: 10, scale: 2, default: 0.00 }
    },
    relations: {
        negocios: {
            target: "Negocio",
            type: "one-to-many",
            inverseSide: "usuario"
        },
        creditos: {
            target: "Creditos",
            type: "one-to-many",
            inverseSide: "usuario"
        },
        indicadoresPrevisionales: {
            target: "IndicadoresPrevisionales",
            type: "one-to-many",
            inverseSide: "usuario"
        }
    }
});
