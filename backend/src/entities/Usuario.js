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
            default: 0.00
        }
    },
    relations: {
        negocios: {
            target: "Negocio",
            type: "one-to-many",
            inverseSide: "usuario"
        },
        comprasCreditos: {
            target: "CompraCredito",
            type: "one-to-many",
            inverseSide: "usuario"
        }
    }
});
