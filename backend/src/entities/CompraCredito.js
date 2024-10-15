const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "CompraCredito",
    tableName: "compra_credito",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        cantidad_creditos: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false
        },
        fecha_compra: {
            type: "date",
            default: () => "CURRENT_DATE"
        }
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: true,
            onDelete: "CASCADE"
        }
    }
});
