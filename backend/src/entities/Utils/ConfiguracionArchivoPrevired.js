const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ConfiguracionArchivoPrevired",
    tableName: "configuracion_archivo_previred",
    columns: {
        id: { primary: true, type: "int", generated: true },
        tipolinea: { type: "int", nullable: false, default: "0", comment: "00: Principal o base, 01: Linea adicional, 02: Segundo contrato, 03: Movimiento personal afiliado voluntario" },
        codigomovpersonal: { type: "int", nullable: false, default: 0, comment: "Ver tabla 7 archivo previred" },
        diastrabajoMes: { type: "int", nullable: false, default: 30, comment: "Dias de trabajo en el mes" },
        tasasis: { type: "decimal", precision: 5, scale: 4, nullable: false, default: 0.015, comment: "Tasa de seguro de invalidez y sobrevivencia (SIS)" },
        ufcalculos: { type: "decimal", nullable: false, precision: 2, scale: 2, default: 0, comment: "Uf para calculo de cotizaciones" },

        

    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: { name: "trabajador_id" },
            inverseSide: "configuracionArchivoPrevired",
            onDelete: "CASCADE"
        }
    }
});