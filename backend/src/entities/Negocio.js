require("dotenv").config();  // Cargar variables de entorno, incluido NODE_ENV
const { EntitySchema } = require("typeorm");

const isTestEnv = process.env.NODE_ENV === 'test';

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
            type: isTestEnv ? 'integer' : 'bool', // Usar INTEGER para SQLite en pruebas
            nullable: false
        }
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: {
                name: "usuario_id",
            },
            onDelete: "CASCADE"
        },
        trabajadores: {
            target: "Trabajador",
            type: "one-to-many",
            inverseSide: "negocio"
        }
    }
});
