//Servicio para el controlador de archivos Previred
const AppDataSource = require("../datasource");
const ArchivoPrevired = require("../entities/ArchivoPrevired");
const Negocio = require("../entities/Negocio");
const Trabajador = require("../entities/Trabajador");
const InformacionLaboral = require("../entities/InformacionLaboral");
const HistorialRemuneracion = require("../entities/HisotrialRemuneracion");
const Salud = require("../entities/Salud");
const AFP = require("../entities/AFP");
const Mutualidad = require("../entities/Mutualidad");
const Cesantia = require("../entities/Cesantia");

class ArchivoPreviredService {
    constructor() {
        this.archivoPreviredRepository = AppDataSource.getRepository(ArchivoPrevired);
        this.negocioRepository = AppDataSource.getRepository(Negocio);
        this.informacionLaboralRepository = AppDataSource.getRepository(InformacionLaboral);
        this.historialRemuneracionRepository = AppDataSource.getRepository(HistorialRemuneracion);
        this.saludRepository = AppDataSource.getRepository(Salud);
        this.afpRepository = AppDataSource.getRepository(AFP);
        this.mutualidadRepository = AppDataSource.getRepository(Mutualidad);
        this.cesantiaRepository = AppDataSource.getRepository(Cesantia);
        this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
    }

    // Método para obtener todos los archivos Previred
    async obtenerArchivosPrevired() {
        return await this.archivoPreviredRepository.find();
    }

    // Método para obtener un archivo Previred por ID
    async obtenerArchivoPreviredPorId(id) {
        return await this.archivoPreviredRepository.findOne({
            where: { id },  // Buscamos el archivo con el ID especificado    
        });
    }

    // Método para obtener un archivo Previred por usuario
    async obtenerArchivoPreviredPorUsuario(idUsuario) {
        return await this.archivoPreviredRepository.find({
            where: { usuario: { id: idUsuario } },
        });
    }

    // Método para generar un archivo Previred
    async generarArchivoPrevired(userid, negocioid) {
        const negocioId = parseInt(negocioid);
        const usuarioId = parseInt(userid);

        // Verificar el negocio y el usuario
        const negocio = await this.negocioRepository.findOne({
            where: { id: negocioId },
            relations: ["usuario", "mutualidad", "ccaf"]
        });
        if (!negocio) {
            throw new Error("Negocio no encontrado");
        }
        if (negocio.usuario.id !== usuarioId) {
            throw new Error("No autorizado para acceder a este negocio");
        }

        // Obtener trabajadores y relaciones necesarias
        const trabajadores = await this.trabajadorRepository.find({
            where: { negocio: { id: negocioId } },
            relations: [
                "informacionLaboral",
                "historialRemuneraciones",
                "cesantias",
                "mutualidad",
                "ccaf",
                "configuracionArchivoPrevired",
            ]
        });

        if (trabajadores.length === 0) {
            throw new Error("No hay trabajadores asociados al negocio");
        }

        // Array para almacenar las cadenas de cada trabajador
        const cadenasTrabajadores = trabajadores.map(trabajador => {
            const informacionLaboral = trabajador.informacionLaboral;
            const historialRemuneracion = trabajador.historialRemuneraciones[0]; // Suponiendo que usamos el historial más reciente
            const salud = informacionLaboral.salud;
            const afp = informacionLaboral.afp;
            const ccaf = negocio.ccaf;
            const mutualidad = negocio.mutualidad;
            const configuracionArchivo = trabajador.configuracionArchivoPrevired[0]; // Suponiendo que usamos la configuración más reciente

            // Mapeo de cada campo de la cadena en el orden específico
            const datosArchivoPrevired = [
                trabajador.rut,                                  // Campo 1: RUT
                trabajador.dv,                                   // Campo 2: Dígito Verificador
                trabajador.patlastname,                          // Campo 3: Apellido Paterno
                trabajador.matlastname || "",                    // Campo 4: Apellido Materno
                trabajador.names,                                // Campo 5: Nombres
                trabajador.genero,                               // Campo 6: Género
                trabajador.nationality,                          // Campo 7: Nacionalidad
                informacionLaboral.tipoPago,                     // Campo 8: Tipo de Pago
                historialRemuneracion ? historialRemuneracion.mesRemuneracion : "",  // Campo 9: Período de Pago mmaaaa
                "0",                                             // Campo 10: Condicional
                informacionLaboral.regimenPrevisional,           // Campo 11: Régimen Previsional
                informacionLaboral.tipoTrabajador,               // Campo 12: Tipo de Trabajador
                historialRemuneracion ? historialRemuneracion.diasTrabajados : "0",  // Campo 13: Días Trabajados
                configuracionArchivo.tipoLinea || "0",           // Campo 14: Tipo de Línea (TODO: Revisar donde colocar esta configuración)
                configuracionArchivo.codigoMovPersonal || "0",   // Campo 15: Código Movimiento Personal (TODO: Revisar donde colocar esta configuaración)
                "",                                              // Campo 16: Condicional
                "",                                              // Campo 17: Condicional
                informacionLaboral.tramoAsignacionFamiliar || "", // Campo 18: Tramo Asignación Familiar
                "0", "0", "0", "0", "0", "0",                   // Campos 19-24: Condicionales
                "N",                                             // Campo 25: Solicitud trabajador joven (Debe ir)
                afp ? afp.codigoAFP : "0",                       // Campo 26: Código AFP
                historialRemuneracion ? historialRemuneracion.sueldoImponible : "0", // Campo 27: Imponible para AFP
                historialRemuneracion ? historialRemuneracion.cotizacionObligatoriaAFP : "0", // Campo 28: Cotización Obligatoria AFP
                historialRemuneracion ? historialRemuneracion.cotizacionSIS : "0",    // Campo 29: Cotización SIS
                "0",                                             // Campo 30: Cuenta de Ahorro Voluntario AFP (N/I)
                "0",                                             // Campo 31: Renta Imp. Sustitutiva AFP (N/I)           
                "0",                                             // Campos 32: Tasa Pactada (Sustitutiva) (N/I)
                "0",                                             // Campo 33: Aporte Indemnización (Sustitutiva) (N/I)
                "0",                                             // Campos 34: N° Períodos (Sustitutiva) (N/I)
                "",                                              // Campo 35: Período desde (Sustitutiva)(N/I)
                "",                                              // Campo 36: Período Hasta (Sustitutiva(N/I)
                "",                                              // Campo 37: Puesto de Trabajo Pesado(N/I)
                "0",                                              // Campo 38: % Cotización Trabajo Pesado(N/I)
                "0",                                              // Campos 39: Cotización Trabajo Pesado(N/I)
                "0",                                              // Campo 40: Código de la Institución APVI(N/I)
                "",                                              // Campo 41: Número de Contrato APVI(N/I)
                "0",                                              // Campo 42: Forma de Pago APVI(N/I)
                "0",                                              // Campo 43: Cotización APVI(N/I)
                "0",                                              // Campo 44: Cotización Depósitos Convenidos(N/I)
                "0",                                              // Campo 45: Código Institución Autorizada APVC(N/I)
                "",                                              // Campo 46: Número de Contrato APVC(N/I)
                "0",                                              // Campo 47: Forma de Pago APVC(N/I)
                "0",                                              // Campo 48: Cotización Trabajador APVC(N/I)
                "0",                                              // Campo 49: Cotización Empleador APVC(N/I)
                "0",                                              // Campo 50: RUT Afiliado Voluntario(N/I)
                "",                                              // Campo 51: DV Afiliado Voluntario(N/I)
                "",                                              // Campo 52: Apellido Paterno(N/I)
                "",                                              // Campo 53: Apellido Materno (N/I)
                "",                                              // Campo 54: Nombres(N/I)
                "0",                                              // Campo 55: Código Movimiento de Personal(N/I)
                "",                                              // Campo 56: Fecha desde(N/I)
                "",                                              // Campo 57: Fecha hasta(N/I)
                "0",                                              // Campo 58: Código de la AFP(N/I)
                "0",                                              // Campo 59: Monto Capitalización Voluntaria(N/I)
                "0",                                              // Campo 60: Monto Ahorro Voluntario(N/I)
                "0",                                              // Campo 61: Número de periodos de cotización(N/I)
                "0",                                              // Campo 62: Código EX-Caja Régimen(N/I)
                "0",                                              // Campo 63: Tasa Cotización Ex-Caja Previsión(N/I)
                historialRemuneracion ? historialRemuneracion.sueldoImponible : "0",  // Campo 64: Renta Imponible IPS / ISL / Fonasa
                "0",                                              // Campo 65: Cotización Obligatoria IPS(N/I)
                "0",                                              // Campo 66: Renta Imponible Desahucio(N/I)
                "0",                                              // Campo 67: Código Ex-Caja Régimen Desahucio(N/I)
                "0",                                              // Campo 68: Tasa Cotización Desahucio Ex-Cajas de Previsión(N/I)
                "0",                                              // Campo 69: Cotización Desahucio(N/I)
                historialRemuneracion ? historialRemuneracion.cotizacionFonasa : "0",  // Campo 70: Cotización Fonasa
                historialRemuneracion ? historialRemuneracion.cotizacionISL : "0", ,  // Campo 71: Cotización Acc. Trabajo (ISL)
                "0",                                              // Campo 72: Bonificación Ley 15.386
                "",                                              // Campo 73: Descuento por cargas familiares de IPS (ex INP) (TODO: Revisar donde colocar esta configuración)
                "0",                                              // Campo 74: Bonos Gobierno (Campo futuro cuando Gobierno de bonos)
                salud ? salud.codigoSalud : "0",                 // Campo 75: Código Salud
                salud ? salud.numeroFUN : "",                    // Campo 76: Número de Contrato Salud
                historialRemuneracion ? historialRemuneracion.sueldoImponible : "0",    // Campo 77: Renta Imponible Isapre
                salud ? salud.tipoMoneda : "0",                  // Campo 78: Tipo Moneda
                salud ? salud.cotizacionPactada : "0",           // Campo 79: Cotización Pactada
                historialRemuneracion ? historialRemuneracion.cotizacionIsapre : "0", // Campo 80: Cotización 7% hacia ISAPRE
                historialRemuneracion ? historialRemuneracion.cotizacionAdicionalIsapre : "0", // Campo 81: Diferencia 7% hacia ISAPRE
                "0",                                             // Campo 82: Monto Garantía Explícita de Salud GES(Uso Futuro) Por el momento se lleva a 0
                ccaf ? ccaf.codigoCCAF : "0",                    // Campo 83: Código CCAF
                historialRemuneracion ? historialRemuneracion.sueldoImponible : "0",    // Campo 84: Renta Imponible CCAF
                ccaf ? ccaf.creditosPersonalesCcaf : "0",        // Campo 85: Créditos Personales CCAF
                ccaf ? ccaf.descuentoDental : "0",               // Campo 86: Descuento Dental CCAF
                ccaf ? ccaf.descuentoLeasing : "0",              // Campo 87: Descuento Leasing CCAF
                ccaf ? ccaf.descuentoSeguroVida : "0",           // Campo 88: Descuento Seguro de Vida CCAF
                ccaf ? ccaf.otrosDescuentos : "0",               // Campo 89: Otros Descuentos CCAF
                ccaf ? ccaf.cotizacionNoIsapre : "0",            // Campo 90: Cotización CCAF no Isapre
                ccaf ? ccaf.descuentoCargasFamiliares : "0",     // Campo 91: Descuento Cargas Familiares CCAF
                "0",                                             // Campo 92: Otros descuentos CCAF 1 (Uso Futuro)
                "0",                                             // Campo 93: Otros descuentos CCAF 2 (Uso Futuro)
                "0",                                             // Campo 94: Bonos Gobierno (Campo futuro)
                "",                                              // Campo 95: Código de la sucursal inscrita para recibir SFE
                mutualidad ? mutualidad.codigoMutualidad : "0",  // Campo 96: Código Mutualidad
                historialRemuneracion ? historialRemuneracion.sueldoImponible : "0",    // Campo 97: Renta Imponible Mutual
                historialRemuneracion ? historialRemuneracion.cotizacionMutual : "0",    // Campo 98: Cotización Mutual (Aqui va calculo de tasa por rem imponibles trabajadores)
                "0",                                             // Campo 99: Sucursal para pago Mutual (Código identificación de sucursal del empleador)
                historialRemuneracion ? historialRemuneracion.sueldoImponible : "0",    // Campo 100: Renta Imponible Cesantía
                historialRemuneracion ? historialRemuneracion.aporteTrabajadorCesantia : "0",      // Campo 101: Aporte Trabajador Cesantía
                historialRemuneracion ? historialRemuneracion.aporteEmpleadorCesantia : "0",        // Campo 102: Aporte Empleador Cesantía
                "0",                                             // Campo 103: Rut Pagadora Subsidio
                "",                                              // Campo 104: DV Pagadora Subsidio
                "0",                                             // Campo 105: Centro de Costos, Sucursal, Agencia
            ];

            return datosArchivoPrevired.join(";"); 
        });

        // Unir cada trabajador en líneas individuales para el archivo final
        const archivoPrevired = cadenasTrabajadores.join("\n");

        return archivoPrevired;
    }

    // Método para actualizar un archivo Previred
    async actualizarArchivoPrevired(id, datosActualizados) {
        const archivoPrevired = await this.obtenerArchivoPreviredPorId(id);
        if (archivoPrevired) {
            this.archivoPreviredRepository.merge(archivoPrevired, datosActualizados);
            return await this.archivoPreviredRepository.save(archivoPrevired);
        } else {
            throw new Error("Archivo Previred no encontrado");
        }
    }

    // Método para eliminar un archivo Previred
    async eliminarArchivoPrevired(id) {
        const archivoPrevired = await this.obtenerArchivoPreviredPorId(id);
        if (archivoPrevired) {
            await this.archivoPreviredRepository.remove(archivoPrevired);
            return archivoPrevired;
        } else {
            throw new Error("Archivo Previred no encontrado");
        }
    }

}

module.exports = ArchivoPreviredService;