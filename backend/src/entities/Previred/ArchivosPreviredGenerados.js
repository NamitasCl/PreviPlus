// archivo-previred.entity.js
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ArchivoPreviredGenerado",
    tableName: "archivo_previred_generado",
    columns: {
        id: { primary: true, type: "int", generated: true },
        archivo: { type: "text", nullable: false }, // Contenido del archivo completo
        fecha: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" },
        mes: { type: "int", nullable: false },  // Nuevo campo para el mes
        anio: { type: "int", nullable: false }, // Nuevo campo para el año
    },
    relations: {
        negocio: {
            target: "Negocio",
            type: "many-to-one",
            joinColumn: {
                name: "negocio_id"
            },
            onDelete: "CASCADE"
        },
    }
});