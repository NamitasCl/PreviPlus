// Creditos.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Creditos",
    tableName: "creditos",
    columns: {
        id: { primary: true, type: "int", generated: true },
        cantidad: { type: "decimal", precision: 10, scale: 2, nullable: false },
        tipo: { type: "varchar", nullable: false },
        fecha: { type: "date", default: () => "CURRENT_DATE" },
        idTransaccion: { type: "varchar", nullable: true },
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
