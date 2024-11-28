//Servicio para el controlador de archivos Previred
const AppDataSource = require("../datasource");
const ArchivoPrevired = require("../entities/Previred/ArchivoPrevired");
const Negocio = require("../entities/Negocio/Negocio");
const Trabajador = require("../entities/Trabajador/Trabajador");
const InformacionLaboral = require("../entities/Negocio/InformacionLaboral");
const HistorialRemuneracion = require("../entities/Remuneraciones/HisotrialRemuneracion");
const Salud = require("../entities/Prevision/Salud");
const AFP = require("../entities/Prevision/AFP");
const Mutualidad = require("../entities/Prevision/Mutualidad");
const TrabajadorDTO = require("../DTOs/TrabajadorDTO");
const AsignacionFamiliarData = require("../entities/Utils/AsignacionFamiliarData");
const ArchivoPreviredGenerado = require("../entities/Previred/ArchivosPreviredGenerados");
const { getManager } = require("typeorm");


class ArchivoPreviredService {
    constructor() {
        this.archivoPreviredRepository = AppDataSource.getRepository(ArchivoPreviredGenerado);
        this.negocioRepository = AppDataSource.getRepository(Negocio);
        this.informacionLaboralRepository = AppDataSource.getRepository(InformacionLaboral);
        this.historialRemuneracionRepository = AppDataSource.getRepository(HistorialRemuneracion);
        this.saludRepository = AppDataSource.getRepository(Salud);
        this.afpRepository = AppDataSource.getRepository(AFP);
        this.mutualidadRepository = AppDataSource.getRepository(Mutualidad);
        this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
        this.asignacionFamiliarDataRepository = AppDataSource.getRepository(AsignacionFamiliarData);
    }

    // Método para obtener archivos previred filtrados por mes y año
    async obtenerArchivosPrevired(data) {
        const { idNegocio, mes, anio } = data;
        
        // Validar los parámetros
        if (!idNegocio) {
            throw new Error("El id del negocio es requerido");
        }

        // Construir la consulta
        const query = this.archivoPreviredRepository.createQueryBuilder("archivoPreviredGenerado")
            .where("archivoPreviredGenerado.negocio_id = :idNegocio", { idNegocio });

        if (mes) {
            query.andWhere("archivoPreviredGenerado.mes = :mes", { mes });
        }

        if (anio) {
            query.andWhere("archivoPreviredGenerado.anio = :anio", { anio });
        }

        // Ejecutar la consulta
        const archivosPrevired = await query.getMany();

        return archivosPrevired;
    }

    // Método para obtener informacion de archivos previred  
    async obtenerInformacionArchivosPrevired(data) {
        const { idNegocio, mes, anio } = data;
        
        // Validar los parámetros
        if (!idNegocio) {
            throw new Error("El id del negocio es requerido");
        }

        // Construir la consulta
        const query = this.archivoPreviredRepository.createQueryBuilder("archivoPreviredGenerado")
            .leftJoinAndSelect("archivoPreviredGenerado.negocio", "negocio") // Incluir el JOIN
            .where("archivoPreviredGenerado.negocio_id = :idNegocio", { idNegocio });

        if (mes) {
            query.andWhere("archivoPreviredGenerado.mes = :mes", { mes });
        }

        if (anio) {
            query.andWhere("archivoPreviredGenerado.anio = :anio", { anio });
        }

        // Ejecutar la consulta
        const archivosPrevired = await query.getMany();

        return archivosPrevired;
    }

    // Método para obtener un archivo Previred por ID
    async obtenerArchivoPreviredPorId(id) {
        return await this.archivoPreviredRepository.findOne({
            where: { id },  // Buscamos el archivo con el ID especificado    
        });
    }


    // Método para generar un archivo Previred
    async generarArchivoPrevired(data) {
       
        // Iniciar una transacción
        return await this.trabajadorRepository.manager.transaction(async manager => {
        
        // Funcion para obtener el monto de asignación familiar
        async function calcularMontoAf(tramoAsignacionFamiliar, sueldoImponible) {
            // Validar entradas
            if (!['A', 'B', 'C', 'D', ''].includes(tramoAsignacionFamiliar)) {
                throw new Error(`Tramo inválido: ${tramoAsignacionFamiliar}`);
            }

            if (typeof sueldoImponible !== 'number' || sueldoImponible < 0) {
                throw new Error(`Sueldo imponible inválido: ${sueldoImponible}`);
            }

            if (tramoAsignacionFamiliar === 'D' || tramoAsignacionFamiliar === '') {
                return 0;
            }

            // Buscar el tramo en la base de datos
            const tramo = await this.asignacionFamiliarDataRepository.findOne({
                where: { tramo: tramoAsignacionFamiliar }
            });

            if (!tramo) {
                throw new Error(`Tramo ${tramoAsignacionFamiliar} no encontrado`);
            }

            // Definir los límites de cada tramo
            // Asumiendo que los tramos están ordenados de mayor a menor rentaTope
            const tramosOrdenados = await this.asignacionFamiliarDataRepository.find({
                order: { rentaTope: "DESC" }
            });

            let tramoInferior = 0;
            let tramoSuperior = 0;
            let montoAsignacion = 0;

            for (let i = 0; i < tramosOrdenados.length; i++) {
                const currentTramo = tramosOrdenados[i];
                if (currentTramo.tramo === tramoAsignacionFamiliar) {
                    tramoSuperior = currentTramo.rentaTope;
                    if (i < tramosOrdenados.length - 1) {
                        const siguienteTramo = tramosOrdenados[i + 1];
                        tramoInferior = siguienteTramo.rentaTope;
                    }
                    montoAsignacion = currentTramo.monto;
                    break;
                }
            }

             // Verificar que el sueldo imponible esté dentro del rango del tramo
             if (sueldoImponible > tramoInferior && sueldoImponible <= tramoSuperior) {
                return montoAsignacion;
            } else {
                throw new Error(`El sueldo imponible ${sueldoImponible} no está dentro del rango del tramo ${tramoAsignacionFamiliar} (${tramoInferior} - ${tramoSuperior})`);
            }
        }
    
        // Funcion para obtener fecha en formato 'mmyyyy'
        function obtenerFecha() { 
            const fecha = new Date();
            let mes = fecha.getMonth() + 1;
            mes = mes.toString().padStart(2, '0'); //Esto asegura que siempre hayan 2 digitos 012024, 022024, etc.
            const anio = fecha.getFullYear();
            return `${mes}${anio}`;
        }
    
        // Funcion para saber si existe pago adicional pago plan de isapre
        function calculoAdicionalIsapre(sueldoImponible, uf, cotizacionPactada) {  
            const cotizacionIsapre = Math.round(sueldoImponible * 0.07);
            const planIsapre = Math.round(cotizacionPactada * uf);
            return planIsapre - cotizacionIsapre < 0 ? 0 : planIsapre - cotizacionIsapre;
        }
    

        console.log("Datos de entrada:", data);
        
        let { userId, idNegocio } = data;

        idNegocio = parseInt(idNegocio, 10);
        userId = parseInt(userId, 10);

        console.log("ID Negocio:", idNegocio);
        console.log("ID Usuario:", userId);

        // Verificar el negocio y el usuario
        const negocio = await this.negocioRepository.findOne({
            where: { id: idNegocio },
            relations: ["usuario", "mutualidad", "ccaf"]
        });

        console.log("Negocio encontrado:", negocio);
        
        if (!negocio) {
            throw new Error("Negocio no encontrado");
        }
        
        if (negocio.usuario.id !== userId) {
            throw new Error("No autorizado para acceder a este negocio");
        }
        
        // Obtener trabajadores y relaciones necesarias
        const trabajadores = await this.trabajadorRepository
                .createQueryBuilder("trabajador")
                .leftJoinAndSelect("trabajador.informacionLaboral", "informacionLaboral", "informacionLaboral.negocio_id = :idNegocio", { idNegocio })
                .leftJoinAndSelect("trabajador.salud", "salud")
                .leftJoinAndSelect("trabajador.afp", "afp")
                .leftJoinAndSelect("informacionLaboral.negocio", "negocio") // Si necesitas información del negocio
                .leftJoinAndSelect("trabajador.configuracionArchivoPrevired", "configuracionArchivoPrevired")
                .getMany();
            
        const trabajadoresDTO = trabajadores.map(trabajador => new TrabajadorDTO(trabajador));

        

        console.log("Trabajadores encontrados:", trabajadores);

        if (trabajadores.length === 0) {
        throw new Error("No hay trabajadores asociados al negocio");
        }

        // Array para almacenar las cadenas de cada trabajador
        const cadenasTrabajadores = await Promise.all(trabajadoresDTO.map(async trabajador => {
            const informacionLaboral = trabajador.informacionLaboral;
            const salud = trabajador.salud;
            const afp = trabajador.afp;
            const ccaf = negocio.ccaf;
            const mutualidad = negocio.mutualidad;
            const configuracionArchivo = trabajador.configuracionArchivoPrevired;

            const montoAf = await calcularMontoAf(
                informacionLaboral.tramoAsignacionFamiliar,
                informacionLaboral.sueldoImponible
            );

            

            // Mapeo de cada campo de la cadena en el orden específico
            const datosArchivoPrevired = [
                trabajador.rut,                                                                                                     // Campo 1: RUT
                trabajador.dv,                                                                                                      // Campo 2: Dígito Verificador
                trabajador.patlastname,                                                                                             // Campo 3: Apellido Paterno
                trabajador.matlastname || "",                                                                                       // Campo 4: Apellido Materno
                trabajador.names,                                                                                                   // Campo 5: Nombres
                trabajador.genero,                                                                                                  // Campo 6: Género
                trabajador.nationality,                                                                                             // Campo 7: Nacionalidad
                informacionLaboral.tipopago,                                                                                      // Campo 8: Tipo de Pago
                obtenerFecha(),                                                                                                     // Campo 9: Período de Pago mmaaaa
                "0",                                                                                                                // Campo 10: Condicional
                informacionLaboral.regimenPrevisional,                                                                              // Campo 11: Régimen Previsional
                informacionLaboral.tipoTrabajador,                                                                                  // Campo 12: Tipo de Trabajador
                configuracionArchivo.diastrabajomes ? configuracionArchivo.diastrabajomes : "30",                                   // Campo 13: Días Trabajados
                configuracionArchivo.tipolinea ? configuracionArchivo.tipolinea : "0",                                              // Campo 14: Tipo de Línea (TODO: Revisar donde colocar esta configuración)
                configuracionArchivo.codigomovpersonal ? configuracionArchivo.codigomovpersonal : "0",                              // Campo 15: Código Movimiento Personal (TODO: Revisar donde colocar esta configuaración)
                "",                                                                                                                 // Campo 16: Condicional
                "",                                                                                                                 // Campo 17: Condicional
                informacionLaboral.tramoAsignacionFamiliar !== "" ? informacionLaboral.tramoAsignacionFamiliar : "D",               // Campo 18: Tramo Asignación Familiar
                "0",                                                                                                                // Campo 19: Condicional                            
                "0",                                                                                                                // Campo 20: Condicional        
                "0",                                                                                                                // Campo 21: Condicional
                montoAf || "0",             // Campo 22: Monto de pago de asignación familiar (Repetir en campo 73)
                "0",                                                                                                                // Campo 23: Condicional
                "0",                                                                                                                // Campo 24: Condicional
                "N",                                                                                                                // Campo 25: Solicitud trabajador joven (Debe ir)
                afp.codigoAFP ? afp.codigoAFP : "0",                                                                                // Campo 26: Código AFP
                informacionLaboral.sueldoImponible ? informacionLaboral.sueldoImponible : "0",                                      // Campo 27: Imponible para AFP
                Math.round(parseFloat(afp.tasaCotizacion * informacionLaboral.sueldoImponible)) || "0",                             // Campo 28: Cotización Obligatoria AFP
                Math.round(configuracionArchivo.tasasis * informacionLaboral.sueldoImponible) || 0,                                 // Campo 29: Cotización SIS
                "0",                                                                                                                // Campo 30: Cuenta de Ahorro Voluntario AFP (N/I)
                "0",                                                                                                                // Campo 31: Renta Imp. Sustitutiva AFP (N/I)
                "0",                                                                                                                // Campo 32: Tasa Pactada (Sustitutiva) (N/I)
                "0",                                                                                                                // Campo 33: Aporte Indemnización (Sustitutiva) (N/I)
                "0",                                                                                                                // Campo 34: N° Períodos (Sustitutiva) (N/I)
                "",                                                                                                                 // Campo 35: Período desde (Sustitutiva)(N/I)
                "",                                                                                                                 // Campo 36: Período Hasta (Sustitutiva(N/I)
                "",                                                                                                                 // Campo 37: Puesto de Trabajo Pesado(N/I)
                "0",                                                                                                                // Campo 38: % Cotización Trabajo Pesado(N/I)
                "0",                                                                                                                // Campo 39: Cotización Trabajo Pesado(N/I)
                "0",                                                                                                                // Campo 40: Código de la Institución APVI(N/I)
                "",                                                                                                                 // Campo 41: Número de Contrato APVI(N/I)
                "0",                                                                                                                // Campo 42: Forma de Pago APVI(N/I)
                "0",                                                                                                                // Campo 43: Cotización APVI(N/I)
                "0",                                                                                                                // Campo 44: Cotización Depósitos Convenidos(N/I)
                "0",                                                                                                                // Campo 45: Código Institución Autorizada APVC(N/I)
                "",                                                                                                                 // Campo 46: Número de Contrato APVC(N/I)
                "0",                                                                                                                // Campo 47: Forma de Pago APVC(N/I)
                "0",                                                                                                                // Campo 48: Cotización Trabajador APVC(N/I)
                "0",                                                                                                                // Campo 49: Cotización Empleador APVC(N/I)
                "0",                                                                                                                // Campo 50: Rut Afiliado Voluntario(N/I)
                "",                                                                                                                 // Campo 51: DV Afiliado Voluntario(N/I)
                "",                                                                                                                 // Campo 52: Apellido Paterno(N/I)
                "",                                                                                                                 // Campo 53: Apellido Materno (N/I)
                "",                                                                                                                 // Campo 54: Nombres(N/I)
                "0",                                                                                                                // Campo 55: Código Movimiento de Personal(N/I)
                "",                                                                                                                 // Campo 56: Fecha desde(N/I)
                "",                                                                                                                 // Campo 57: Fecha hasta(N/I)
                "0",                                                                                                                // Campo 58: Código de la AFP(N/I)
                "0",                                                                                                                // Campo 59: Monto Capitalización Voluntaria(N/I)
                "0",                                                                                                                // Campo 60: Monto Ahorro Voluntario(N/I)
                "0",                                                                                                                // Campo 61: Número de periodos de cotización(N/I)
                "0",                                                                                                                // Campo 62: Código EX-Caja Régimen(N/I)
                "0",                                                                                                                // Campo 63: Tasa Cotización Ex-Caja Previsión(N/I)
                informacionLaboral.sueldoImponible || 0,                                                                            // Campo 64: Renta Imponible IPS / ISL / Fonasa
                "0",                                                                                                                // Campo 65: Cotización Obligatoria IPS
                "0",                                                                                                                // Campo 66: Renta Imponible Desahucio (N/I)
                "0",                                                                                                                // Campo 67: Código Ex-Caja Régimen Desahucio(N/I)
                "0",                                                                                                                // Campo 68: Tasa Cotización Desahucio Ex-Cajas de Previsión(N/I)
                "0",                                                                                                                // Campo 69: Cotización Desahucio(N/I)
                negocio.tieneCcaf && salud.codigoSalud === 7 ? Math.round( salud.tasaSaludCcaf * informacionLaboral.sueldoImponible) : Math.round(parseFloat(salud.tasaSalud * informacionLaboral.sueldoImponible)),         // Campo 70: Cotización Fonasa
                mutualidad.codigoMutual === 0 ? Math.round(parseFloat(mutualidad.tasaMutual * informacionLaboral.sueldoImponible)): 0, // Campo 71: Cotización Acc. Trabajo (ISL)
                "0",                                                                                                                // Campo 72: Bonificación Ley 15.386
                montoAf || "0",             // Campo 73: Descuento por cargas familiares de IPS (ex INP) Se copia lo que tenga campo 22 (TODO: Revisar donde colocar esta configuración)
                "0",                                                                                                                // Campo 74: Bonos Gobierno (Campo futuro cuando Gobierno de bonos)
                salud.codigoSalud ? salud.codigoSalud : "0",                                                                        // Campo 75: Código Salud
                informacionLaboral.numeroFUN ? informacionLaboral.numeroFUN : "",                                                   // Campo 76: Número de Contrato Salud
                informacionLaboral.sueldoImponible ? informacionLaboral.sueldoImponible : "0",                                      // Campo 77: Renta Imponible Isapre
                informacionLaboral.tipoMoneda ? informacionLaboral.tipoMoneda : "0",                                                // Campo 78: Tipo Moneda informacionLaboral
                informacionLaboral.cotizacionPactada ? informacionLaboral.cotizacionPactada : "0",                                  // Campo 79: Cotización Pactada 
                Math.round(informacionLaboral.sueldoImponible * salud.tasaSalud) || 0,                                               // Campo 80: Cotización 7% hacia ISAPRE
                calculoAdicionalIsapre(informacionLaboral.sueldoImponible, configuracionArchivo.ufcalculos, informacionLaboral.cotizacionPactada), // Campo 81: Cotización Obligatoria IPS(N/I)81: Diferencia 7% hacia ISAPRE
                "0",                                                                                                                // Campo 82: Monto Garantía Explícita de Salud GES(Uso Futuro) Por el momento se lleva a 0
                ccaf.codigoCCAF ? ccaf.codigoCCAF : "0",                                                                            // Campo 83: Código CCAF
                informacionLaboral.sueldoImponible ? informacionLaboral.sueldoImponible : "0",                                      // Campo 84: Renta Imponible CCAF
                "0",                                                                                                                // Campo 85: Créditos Personales CCAF
                "0",                                                                                                                // Campo 86: Descuento Dental CCAF
                "0",                                                                                                                // Campo 87: Descuento Leasing CCAF
                "0",                                                                                                                // Campo 88: Descuento Seguro de Vida CCAF
                "0",                                                                                                                // Campo 89: Otros Descuentos CCAF
                negocio.tieneCcaf && salud.codigoSalud === 7 ? Math.round(ccaf.tasaccaf * informacionLaboral.sueldoImponible) : 0,  // Campo 90: Cotización CCAF no Isapre
                montoAf || "0",             // Campo 91: Descuento Cargas Familiares CCAF
                "0",                                                                                                                // Campo 92: Otros descuentos CCAF 1 (Uso Futuro)
                "0",                                                                                                                // Campo 93: Otros descuentos CCAF 2 (Uso Futuro)
                "0",                                                                                                                // Campo 94: Bonos Gobierno (Campo futuro)
                "",                                                                                                                 // Campo 95: Código de la sucursal inscrita para recibir SFE
                mutualidad.codigoMutual ? mutualidad.codigoMutual : "0",                                                            // Campo 96: Código Mutualidad
                informacionLaboral.sueldoImponible || "0",                                                                          // Campo 97: Renta Imponible Mutual
                Math.round(mutualidad.tasaMutual * informacionLaboral.sueldoImponible) || "0",                                      // Campo 98: Cotización Mutual (Aqui va calculo de tasa por rem imponibles trabajadores)
                "0",                                                                                                                // Campo 99: Sucursal para pago Mutual (Código identificación de sucursal del empleador)
                informacionLaboral.sueldoImponible || "0",                                                                          // Campo 100: Renta Imponible Cesantía
                informacionLaboral.tipoContrato === 'indefinido' ? Math.round(parseFloat(informacionLaboral.sueldoImponible) * parseFloat(informacionLaboral.tasaTrabajadorCesantia)) : 0,   // Campo 101: Aporte Trabajador Cesantía
                informacionLaboral.tipoContrato === 'indefinido' ? Math.round(parseFloat(informacionLaboral.sueldoImponible) * parseFloat(informacionLaboral.tasaEmpleadorCesantia)) : 0,    // Campo 102: Aporte Empleador Cesantía
                "0",                                                                                                                // Campo 103: Rut Pagadora Subsidio
                "",                                                                                                                 // Campo 104: DV Pagadora Subsidio
                "0",                                                                                                                // Campo 105: Centro de Costos, Sucursal, Agencia
            ];

            return datosArchivoPrevired.join(";"); 
        }));

        // Unir cada trabajador en líneas individuales para el archivo final
        const archivoPrevired = cadenasTrabajadores.join("\n");

        // Obtener la fecha actual
        const fechaActual = new Date();
        const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
        const anio = fechaActual.getFullYear();

        // Crear instancia de ArchivoPrevired utilizando manager.create
        const archivoPreviredGenerado = manager.create("ArchivoPreviredGenerado", {
            negocio: negocio,
            archivo: archivoPrevired,
            fecha: fechaActual,
            mes: mes,
            anio: anio,
            // Asigna los demás campos si es necesario
        });

        await manager.save('ArchivoPreviredGenerado', archivoPreviredGenerado);
       
        /* return trabajadoresDTO; */ 
        return archivoPrevired;
        });
    }

}

module.exports = ArchivoPreviredService;