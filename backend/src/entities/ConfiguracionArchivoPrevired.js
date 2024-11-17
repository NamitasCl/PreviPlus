const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ConfiguracionArchivoPrevired",
    tableName: "configuracion_archivo_previred",
    columns: {
        id: { primary: true, type: "int", generated: true },
        tipoLinea: { type: "varchar", length: 2, nullable: false, comment: "00: Principal o base, 01: Linea adicional, 02: Segundo contrato, 03: Movimiento personal afiliado voluntario" },
        codigoMovPersonal: { type: "int", nullable: false, comment: "Ver tabla 7 archivo previred" },
        

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