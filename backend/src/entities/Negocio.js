const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Negocio",
    tableName: "negocio",
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
        address: {
            type: "varchar",
            nullable: true
        },
        rut: {
            type: "varchar",
            nullable: false
        },
        isActive: {
            type: 'bool',
            nullable: false
        }
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: true,
            onDelete: "CASCADE"
        },
        trabajadores: {
            target: "Trabajador",
            type: "one-to-many",
            inverseSide: "negocio"
        }
    }
});
