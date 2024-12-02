// Creditos.js

const { EntitySchema } = require("typeorm");
const { v4: uuidv4 } = require('uuid');

module.exports = new EntitySchema({
    name: "Membresia",
    tableName: "membresia",
    columns: {
        id: { primary: true, type: "int", generated: true },
        uuidTransaccion: { type: "varchar", nullable: false, unique: true, comment: "UUID de la transacción", default: uuidv4() },
        fecha: { type: "date", default: () => "CURRENT_DATE" },
        tokenEntregadoPorFlow: { type: "varchar", nullable: true, unique: true },
        membresiaActiva: { type: "bool", nullable: false, default: false },
        subscriptionId: { type: "varchar", nullable: true, unique: true },
        planId: { type: "varchar", nullable: true },
        period_start: { type: "varchar", nullable: true },
        period_end: { type: "varchar", nullable: true },
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: { name: "usuario_id" },
            inverseSide: "membresias",
            onDelete: "CASCADE"
        }
    }
});
