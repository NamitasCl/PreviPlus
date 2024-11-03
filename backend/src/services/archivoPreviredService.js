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

    // Método para crear un nuevo archivo Previred
    /** async crearArchivoPrevired(userid, negocioid) {
         const datosArchivoPrevired = {
             campo1_rut: rut,
             campo2_dv: dv,
             campo3_ap_paterno: patlastname,
             campo4_ap_materno: matlastname,
             campo5_nombres: names,
             cample6_sexo: genero,
             campo7_nacionalidad: nationality,
             campo8_tipo_pago: informacionLaboral.tipoRemuneracion,
             campo9_fecha_pago: historialRemuneraciones.mesRemuneracion,
             campo11_regimen_previsional: informacionLaboral.regimenPrevisional,
             campo12_tipo_trabajador: informacionLaboral.tipoTrabajador,
             campo13_dias_trabajados: historialRemuneraciones.diasTrabajados,
             campo14_tipo_linea: null,
             campo15_codigo_movimiento_personal: null,
             campo18_tramo_asig_fam: informacionLaboral.tramoAsignacionFamiliar,    
             campo26_codigo_afp: informacionLaboral.afp.codigoAFP,
             campo27_imp_afp: historialRemuneraciones.sueldoImponible,
             campo28_calculo_pago_afp: historialRemuneraciones.cotizacionObligatoriaAFP,
             campo29_calculo_sis: historialRemuneraciones.cotizacionSIS,
             campo64_sueldo_imponible_salud: historialRemuneraciones.sueldoImponible,
             campo70_calculo_7_fonasa: historialRemuneraciones.cotizacionFonasa,
             campo71_mutualidad_isl: historialRemuneraciones.cotizacionISL,
             campo73_descuento_ips: null,
             campo75_codigo_isapre: salud.codigoSalud,
             campo76_num_contrato_salud: salud.numeroFUN,
             campo77_renta_imponible_trabajador: historialRemuneraciones.sueldoImponible,
             campo78_tipo_moneda: salud.tipoMoneda,
             campo79_cotizacion_pactada: salud.cotizacionPactada,
             campo80_cotizacion_7_por_ciento: historialRemuneraciones.cotizacionIsapre,
             campo81_diferencia_7_por_ciento: historialRemuneraciones.cotizacionAdicionalIsapre,
             campo83_codigo_ccaf: null,
             campo84_renta_imponible_ccaf: historialRemuneraciones.sueldoImponible,
             campo85_creditos_personales_ccaf: null,
             campo86_descuento_dental_ccaf: null,
             campo87_descuentos_leasing: null,
             campo88_descuento_seguro_vida_ccaf: null,
             campo89_otros_descuentos_ccaf: null,
             campo90_cotizacion_ccaf_no_isapre: null,
             campo91_descuento_cargas_familiares_ccaf: null,
             campo96_codigo_mutualidad: null,
             campo97_renta_imponible_mutual: historialRemuneraciones.sueldoImponible,
             campo98_calculo_mutual: null,
             campo100_renta_imponible_seg_cesantia: historialRemuneraciones.sueldoImponible,
             campo101_aporte_trabajador_seg_cesantia: cesantias.aporteTrabajador,
             campo102_aporte_empleador_seg_cesantia: cesantias.aporteEmpleador,
         }
 
         const negocioId = parseInt(negocioid);
         const usuarioId = parseInt(userid);
 
         // Obtener el negocio
         const negocio = await this.negocioRepository.findOneBy({ id: negocioId });
         if (!negocio) {
             throw new Error("Negocio no encontrado");
         }
 
         //Obtener los trabajadores del negocio
         const trabajadores = await this.trabajadorRepository.find({ negocio });
         if (trabajadores.length === 0) {
             throw new Error("No hay trabajadores asociados al negocio");
         }
 
         // Obtener la información laboral en cada negocio por trabajador
         const informacionLaboral = await this.informacionLaboralRepository.find({
             where: { trabajador: { negocio } },
             relations: ["trabajador"]
         });
 
         // Obtener la historia de remuneraciones en cada negocio por trabajador
         const historialRemuneracion = await this.historialRemuneracionRepository.find({
             where: { trabajador: { negocio } },
             relations: ["trabajador"]
         });
 
         // Obtener la información de salud en cada negocio por trabajador
         const salud = await this.saludRepository.find({
             where: { trabajador: { negocio } },
             relations: ["trabajador"]
         });
 
         // Obtener la información de la AFP en cada negocio por trabajador
         const afp = await this.afpRepository.find({
             where: { trabajador: { negocio } },
             relations: ["trabajador"]
         });
 
         // Obtener la información de la mutualidad en cada negocio por trabajador
         const mutualidad = await this.mutualidadRepository.find({
             where: { trabajador: { negocio } },
             relations: ["trabajador"]
         });
 
         // Obtener la información de la cesantia en cada negocio por trabajador
         const cesantia = await this.cesantiaRepository.find({
             where: { trabajador: { negocio } },
             relations: ["trabajador"]
         });
 
         //Mostrar toda la información obtenida
         const datosObtenidos = {
             negocio,
             trabajadores,
             informacionLaboral,
             historialRemuneracion,
             salud,
             afp,
             mutualidad,
             cesantia,
         }
 
         console.log(datosObtenidos);
     } */

    async crearArchivoPrevired(userid, negocioid) {
        const negocioId = parseInt(negocioid);
        const usuarioId = parseInt(userid);

        // Obtener el negocio y verificar que existe y pertenece al usuario
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

        // Obtener los trabajadores con todas las relaciones necesarias
        const trabajadores = await this.trabajadorRepository.find({
            where: { negocio: { id: negocioId } },
            relations: [
                "informacionLaboral",
                "informacionLaboral.afp",
                "informacionLaboral.salud",
                "historialRemuneraciones",
                "historialRemuneraciones.ccaf",
                "historialRemuneraciones.mutualidad",
                "cesantias",
                "configuracionArchivoPrevired"
            ]
        });

        if (trabajadores.length === 0) {
            throw new Error("No hay trabajadores asociados al negocio");
        }

        // Organizar los datos
        const datosTrabajadores = trabajadores.map(trabajador => {
            const informacionLaboral = trabajador.informacionLaboral;
            const afp = informacionLaboral ? informacionLaboral.afp : null;
            const salud = informacionLaboral ? informacionLaboral.salud : null;
            const historialRemuneracion = trabajador.historialRemuneraciones[0]; // Asumiendo el más reciente
            const cesantia = trabajador.cesantias[0]; // Asumiendo la más reciente
            const configuracionArchivo = trabajador.configuracionArchivoPrevired;
            const ccaf = historialRemuneracion ? historialRemuneracion.ccaf || negocio.ccaf : negocio.ccaf;
            const mutualidad = historialRemuneracion ? historialRemuneracion.mutualidad || negocio.mutualidad : negocio.mutualidad;

            return {
                trabajador,
                informacionLaboral,
                afp,
                salud,
                ccaf,
                mutualidad,
                historialRemuneracion,
                cesantia,
                configuracionArchivo
            };
        });

        // Puedes retornar los datos o continuar con la generación del archivo
        return datosTrabajadores;
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