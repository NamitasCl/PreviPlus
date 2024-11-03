// CCAF.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "CCAF",
    tableName: "ccaf",
    columns: {
        id: { primary: true, type: "int", generated: true },
        nombre: { type: "varchar", length: 50, nullable: false, comment: "Nombre de la CCAF" },
        codigo_ccaf: { type: "int", nullable: false, unique: true, comment: "Código de la CCAF" },
        tasa_pago_ccaf: { type: "decimal", precision: 5, scale: 2, nullable: true, comment: "Tasa de pago de la CCAF" },
        // Nuevos campos
        descuentodental: { type: "decimal", precision: 10, scale: 2, nullable: true, comment: "Descuento dental CCAF" },
        descuentoleasing: { type: "decimal", precision: 10, scale: 2, nullable: true, comment: "Descuento leasing CCAF" },
        descuentosegurovida: { type: "decimal", precision: 10, scale: 2, nullable: true, comment: "Descuento seguro de vida CCAF" },
        otrosdescuentos: { type: "decimal", precision: 10, scale: 2, nullable: true, comment: "Otros descuentos CCAF" },
        cotizacionNoIsapre: { type: "decimal", precision: 10, scale: 2, nullable: true, comment: "Cotización CCAF no Isapre" },
        descuentoCargasFamiliares: { type: "decimal", precision: 10, scale: 2, nullable: true, comment: "Descuento cargas familiares CCAF" }
    },
    relations: {
        negocios: {
            target: "Negocio",
            type: "one-to-many",
            inverseSide: "ccaf"
        },
        // Agregar relación con HistorialRemuneraciones si es necesario
        historialRemuneraciones: {
            target: "HistorialRemuneracion",
            type: "one-to-many",
            inverseSide: "ccaf"
        }
    }
});
