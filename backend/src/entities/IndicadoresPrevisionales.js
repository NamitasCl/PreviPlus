//Entidad para guardar un json con indicadores previsionales mensuales

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "IndicadoresPrevisionales",
    tableName: "indicadores_previsionales",
    columns: {
        id: { primary: true, type: "int", generated: true },
        mes_indicador: { type: "varchar", length: 6, nullable: false, comment: "Formato: mmaaaa" },
        indicador: { type: "varchar", nullable: false, comment: "JSON con indicadores previsionales mensuales" },
    },
    relations: {
        usuario: {
            target: "Usuario",
            type: "many-to-one",
            joinColumn: { name: "usuario_id" },
            inverseSide: "indicadoresPrevisionales",
            onDelete: "CASCADE"
        }   
    }
});