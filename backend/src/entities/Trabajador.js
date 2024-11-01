require("dotenv").config();  // Cargar variables de entorno, incluido NODE_ENV
const { EntitySchema } = require("typeorm");

const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = new EntitySchema({
    name: "Trabajador",
    tableName: "trabajador",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        rut: {
            type: "varchar",
            nullable: false
        },
        dv: {
            type: isTestEnv ? "varchar" : "char",
            length: 1,
            nullable: false
        },
        patlastname: {
            type: "varchar",
            nullable: false
        },
        matlastname: {
            type: "varchar",
            nullable: true
        },
        names: {
            type: "varchar",
            nullable: false
        },
        sexo: {
            type: isTestEnv ? "varchar" : "char",
            length: 1,
            nullable: false
        },
        nationality: {
            type: "varchar",
            nullable: false
        },
    },
    relations: {
        negocio: {
            target: "Negocio",
            type: "many-to-one",
            joinColumn: { name: "negocioid", referencedColumnName: "id" }, // nombre de la columna en la tabla trabajador y nombre de la columna en la tabla negocio
            onDelete: "CASCADE"
        },
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "one-to-one",
            inverseSide: "trabajador",
            cascade: true
        }
    }
});
