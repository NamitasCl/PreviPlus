// Usuario.js

const { EntitySchema } = require("typeorm");

isTestEnv = process.env.NODE_ENV === 'test';

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
        credits: { type: "decimal", precision: 10, scale: 2, default: 0.00 },
        rol: { type: "varchar", nullable: true, default: "usuario" },
        isActive: { type: isTestEnv ? "int" : "bool", nullable: false, default: true },
        createdAt: { type: "date", nullable: true, default: null },
        lastLogin: { type: "date", nullable: true, default: null },        
    },
    relations: {
        negocios: {
            target: "Negocio",
            type: "one-to-many", 
            inverseSide: "usuario"
        },
        membresias: {
            target: "Membresia",
            type: "one-to-many",
            inverseSide: "usuario"
        },
    }
});
