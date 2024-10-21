const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Creditos",
    tableName: "creditos",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        cantidad: {  // Cantidad de créditos agregados o usados
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false
        },
        tipo: {  // "COMPRA" o "GASTO"
            type: "varchar",
            nullable: false
        },
        fecha: {
            type: "date",
            default: () => "CURRENT_DATE"
        },
        idTransaccion: {  // ID de la transacción, tanto para compras como para gastos
            type: "varchar",
            nullable: true
        },
        medioPago: {  // Medio de pago usado en la compra (solo aplica en caso de compra)
            type: "varchar",
            nullable: true
        }
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: {
                name: "usuario_id"
            },
            onDelete: "CASCADE"
        }
    }
});
