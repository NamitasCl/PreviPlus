require("dotenv").config();  // Cargar variables de entorno
const { EntitySchema } = require("typeorm");

isTestEnv = process.env.NODE_ENV === 'test';

module.exports = new EntitySchema({
    name: "HistorialRemuneracion",
    tableName: "historial_remuneracion",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        mesRemuneracion: {
            type: isTestEnv ? "varchar" : "char",  // Usar VARCHAR en modo de pruebas
            length: 6,
            nullable: false,
            comment: "Período en formato mmaaaa"
        },
        sueldoImponible: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: false,
            comment: "Sueldo imponible del trabajador"
        },
        cotizacionObligatoriaAFP: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Monto de cotización obligatoria AFP"
        },
        cotizacionSIS: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Monto de cotización del seguro de invalidez y sobrevivencia"
        },
        cotizacionFonasa: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Monto de cotización Fonasa, 7% si corresponde"
        },
        cotizacionIsapre: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Monto de cotización en una Isapre, si corresponde"
        },
        cotizacionAdicionalIsapre: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Monto adicional en caso de que la Isapre exceda el 7% obligatorio"
        },
        cotizacionISL: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Monto cotización al seguro de accidentes del trabajo (ISL)"
        },
        cotizacionMutual: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Monto de cotización a la mutualidad, si aplica"
        },
        aporteTrabajadorCesantia: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Aporte del trabajador al seguro de cesantía (0.6% si aplica)"
        },
        aporteEmpleadorCesantia: {
            type: "decimal",
            precision: 10,
            scale: 2,
            nullable: true,
            comment: "Aporte del empleador al seguro de cesantía (2.4% o 3% según tipo de contrato)"
        },
    },
    relations: {
        trabajador: {
            target: "Trabajador",
            type: "many-to-one",
            joinColumn: {
                name: "trabajador_id",
            },
            onDelete: "CASCADE",
            comment: "Identificación del trabajador al que pertenece este historial"
        },
        informacionLaboral: {
            target: "InformacionLaboral",
            type: "many-to-one",
            joinColumn: {
                name: "informacion_laboral_id"
            },
            onDelete: "CASCADE",
            comment: "Relación con la información laboral vigente para el cálculo de la remuneración"
        }
    }
});
