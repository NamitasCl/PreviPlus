const { EntitySchema } = require("typeorm");


module.exports = new EntitySchema({
    name: "CCAF",
    tableName: "ccaf",
    columns: {
        id: { primary: true, type: "int", generated: true },
        codigoCCAF: { type: "int", nullable: false, unique: true, comment: "Código de la CCAF" },
        nombre: { type: "varchar", length: 50, nullable: false, comment: "Nombre de la CCAF" },
    },
    relations: {
        negocios: {
            target: "Negocio",
            type: "one-to-many",
            inverseSide: "ccaf"
        }
    }
});
