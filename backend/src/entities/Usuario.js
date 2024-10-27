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
            nullable: true,
        },
        firstLastName: {
            type: "varchar",
            nullable: true,
        },
        secondLastName: {
            type: "varchar",
            nullable: true,
        },
        username: {
            type: "varchar",
            unique: true,
            nullable: false
        },
        email: {
            type: "varchar",
            unique: true,
            nullable: false,
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
