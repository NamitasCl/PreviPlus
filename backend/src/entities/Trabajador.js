const { EntitySchema } = require("typeorm");

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
            type: "char",
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
        genre: {
            type: "char",
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
