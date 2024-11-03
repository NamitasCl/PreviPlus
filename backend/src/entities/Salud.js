// Salud.js

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Salud",
    tableName: "salud",
    columns: {
        id: { primary: true, type: "int", generated: true },
        codigo_salud: { type: "int", nullable: false, unique: true, comment: "Código de Fonasa o Isapre" },
        nombre: { type: "varchar", length: 50, nullable: false, comment: "Nombre de Fonasa o Isapre" },
        tasa_fonasa: { type: "decimal", precision: 5, scale: 2, nullable: true, comment: "7% para Fonasa" },
        cotizacion_pactada: { type: "decimal", precision: 8, scale: 4, nullable: true, comment: "Monto del plan pactado con la Isapre (en UF o CLP)" },
        tipo_moneda: { type: "varchar", length: 10, nullable: true, comment: "Tipo de moneda del plan pactado: 1: CLP o 2: UF" },
        numero_fun: { type: "varchar", length: 16, nullable: true, comment: "Número de contrato (FUN) en Isapre" },
        adicional_ges: { type: "decimal", precision: 10, scale: 2, nullable: true, comment: "Monto adicional si el plan excede el 7%" }
    },
    relations: {
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "one-to-many",
            inverseSide: "salud"
        }
    }
});
