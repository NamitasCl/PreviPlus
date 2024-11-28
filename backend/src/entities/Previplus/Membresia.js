// Creditos.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Membresia",
    tableName: "membresia",
    columns: {
        id: { primary: true, type: "int", generated: true },
        uuidTransaccion: { type: "varchar", nullable: false, unique: true, comment: "UUID de la transacción" },
        fecha: { type: "date", default: () => "CURRENT_DATE" },
        
        medioPago: { type: "varchar", nullable: true }
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: { name: "usuario_id" },
            inverseSide: "creditos",
            onDelete: "CASCADE"
        }
    }
});
