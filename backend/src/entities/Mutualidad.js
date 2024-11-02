const { EntitySchema } = require("typeorm");


module.exports = new EntitySchema({
    name: "Mutualidad",
    tableName: "mutualidad",
    columns: {
        id: { primary: true, type: "int", generated: true },
        codigoMutualidad: { type: "int", nullable: false, unique: true, comment: "Código de la mutualidad" },
        nombre: { type: "varchar", length: 50, nullable: false, comment: "Nombre de la mutualidad" },
        tasaMutual: { type: "decimal", precision: 5, scale: 2, nullable: true, comment: "Tasa de cotización de la mutualidad" }
    },
    relations: {
        negocio: {
            target: "Negocio",
            type: "one-to-many",
            inverseSide: "mutualidad"
        }
    }
});
