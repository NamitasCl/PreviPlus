const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Usuario",
    tableName: "usuario",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
            nullable: false
        },
        firstLastName: {
            type: "varchar",
            nullable: false
        },
        secondLastName: {
            type: "varchar",
            nullable: false
        },
        username: {
            type: "varchar",
            unique: true
        },
        email: {
            type: "varchar",
            unique: true
        },
        password: {
            type: "varchar",
            nullable: false
        },
        credits: {
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0.00  // Saldo actual
        }
    },
    relations: {
        negocios: {
            target: "Negocio",
            type: "one-to-many",
            inverseSide: "usuario"
        },
        Creditos: {  // Relacionado con las transacciones de crédito
            target: "Creditos",
            type: "one-to-many",
            inverseSide: "usuario"
        }
    }
});
