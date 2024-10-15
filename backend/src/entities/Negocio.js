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
        nombre: {
            type: "varchar",
            nullable: false
        },
        direccion: {
            type: "varchar",
            nullable: true
        },
        rut_empresa: {
            type: "varchar",
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
