const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Cesantia",
    tableName: "cesantia",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        mesRemuneracion: {
            type: "varchar",
            length: 6,
            nullable: false,
            comment: "Mes y año de la remuneración en formato mmaaaa"
        },
        aporteTrabajador: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Monto aportado por el trabajador al seguro de cesantía"
        },
        aporteEmpleador: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Monto aportado por el empleador al seguro de cesantía"
        }
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: {
                name: "trabajador_id",
            },
            onDelete: "CASCADE",
            comment: "Referencia al trabajador"
        },
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "many-to-one",
            joinColumn: {
                name: "informacion_laboral_id"
            },
            onDelete: "CASCADE",
            comment: "Relación con la información laboral del trabajador"
        }
    }
});