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
        apellido_paterno: {
            type: "varchar",
            nullable: false
        },
        apellido_materno: {
            type: "varchar",
            nullable: true
        },
        nombres: {
            type: "varchar",
            nullable: false
        },
        sexo: {
            type: "char",
            length: 1,
            nullable: false
        },
        nacionalidad: {
            type: "int",
            nullable: false
        }
    },
    relations: {
        negocio: {
            target: "Negocio",
            type: "many-to-one",
            joinColumn: true,
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
