// Usuario.js

const { EntitySchema } = require("typeorm");
const { v4: uuidv4 } = require('uuid');

isTestEnv = process.env.NODE_ENV === 'test';

module.exports = new EntitySchema({
    name: "Usuario",
    tableName: "usuario",
    columns: {
        id: { primary: true, type: "int", generated: true },
        useruuid: { type: "varchar", nullable: false, default: uuidv4() },
        name: { type: "varchar", nullable: true },
        firstlastname: { type: "varchar", nullable: false },
        secondlastname: { type: "varchar", nullable: true },
        username: { type: "varchar", unique: true, nullable: false },
        email: { type: "varchar", unique: true, nullable: false },
        password: { type: "varchar", nullable: false },
        isMembershipActive: { type: "bool", nullable: false, default: false },
        rol: { type: "varchar", nullable: true, default: "usuario" },
        isActive: { type: isTestEnv ? "int" : "bool", nullable: false, default: true },
        createdAt: { type: "date", nullable: true, default: null },
        lastLogin: { type: "date", nullable: true, default: null },
        flowCustomerId: { type: "varchar", nullable: true, default: null },
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
            inverseSide: "usuario",
            nullable: true
        },
    },

});
