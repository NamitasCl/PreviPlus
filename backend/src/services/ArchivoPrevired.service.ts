import { DataSource, EntityManager } from "typeorm";
import ArchivoPreviredDTO from "../dtos/ArchivoPrevired.dto";
import { ArchivoPreviredFormatter } from "../helpers/ArchivoPreviredFormatter";
import { validate } from "class-validator";
import { ArchivosPreviredGenerado } from "../entities/ArchivosPreviredGenerados.entity";
import { AsignacionFamiliar } from "../entities/AsignacionFamiliar.entity";
import { Negocio } from "../entities/Negocio.entity";
import { Trabajador } from "../entities/Trabajador.entity";

export class ArchivoPreviredService {
  
  

  constructor(private readonly dataSource: DataSource) {}

  async generarArchivoPrevired(
    userId: number,
    negocioId: number
  ): Promise<string> {
    return await this.dataSource.manager.transaction(
      async (manager: EntityManager) => {
        // 1. Validar parámetros mínimos
        if (!userId || !negocioId) {
          throw new Error(
            "Parámetros inválidos: userId y negocioId son obligatorios."
          );
        }

        // 2. Verificar que el negocio exista, esté activo y que el usuario esté autorizado
        const negocio = await manager.findOne(Negocio, {
          where: { id: negocioId, isActive: true },
          relations: ["usuario", "mutualidad", "ccaf"],
        });

        if (!negocio) {
          throw new Error("Negocio no encontrado o inactivo.");
        }

        if (negocio.usuario.id !== userId) {
          throw new Error("No autorizado para acceder a este negocio.");
        }

        // Verificar membresía activa del usuario (no del negocio)
        // TODO: hacer la lógica, ahora solo retorna true
        if (!this.membresiaActivaUsuario(negocio.usuario)) {
          throw new Error(
            "La membresía del usuario no está activa para generar el archivo Previred."
          );
        }

        // 3. Obtener los trabajadores asociados al negocio desde la base de datos
        const trabajadores = await manager
          .createQueryBuilder(Trabajador, "trabajador")
          .leftJoinAndSelect(
            "trabajador.informacionLaboral",
            "informacionLaboral",
            "informacionLaboral.negocio_id = :negocioId",
            { negocioId }
          )
          .leftJoinAndSelect("informacionLaboral.negocio", "negocio") // Incluye el negocio relacionado
          .leftJoinAndSelect("negocio.ccaf", "ccaf") // Relación de negocio con CCAF
          .leftJoinAndSelect("trabajador.salud", "salud")
          .leftJoinAndSelect("trabajador.afp", "afp")
          .getMany();

        if (trabajadores.length === 0) {
          throw new Error("No hay trabajadores asociados al negocio.");
        }

        const mesRemuneracion = this.obtenerFecha(); // Formato mmaaaa

        // 4. Por cada trabajador, construir el DTO
        // Aquí deberás mapear con cuidado cada campo del DTO.
        const dtos = await Promise.all(
          trabajadores.map(async (trabajador) => {
            const informacionLaboral = trabajador.informacionLaboral[0];
            const salud = trabajador.salud;
            const afp = trabajador.afp;
            const mutualidad = negocio.mutualidad;
            const ccaf = negocio.ccaf;

            const sueldoImponible = informacionLaboral?.sueldoImponible || 0;

            // Calcular asignación familiar
            const montoAf = await this.calcularMontoAf(
              manager,
              informacionLaboral?.tramoAsignacionFamiliar || "",
              sueldoImponible
            );

            const tasaSis = 0.015
            const cotizacionSisCalculada =
              parseInt((sueldoImponible * tasaSis).toFixed(0), 10) || 0;

            // Calcular cotizaciones (ejemplo, ajusta según tu lógica)
            const cotizacionObligatoriaAFP =
              afp && afp.tasaCotizacion
                ? Number((sueldoImponible * afp.tasaCotizacion).toFixed(2))
                : 0;

            const cotizacionIsl = sueldoImponible * mutualidad.tasamutual || 0;

            // Renta imponible para IPS/ISL/Fonasa, Isapre, Mutual y Cesantía suelen ser el sueldo imponible.
            const rentaImponible = sueldoImponible;

            // Definir tipoTrabajador, tipoLinea, codigoMovPersonal, etc. según tu lógica.
            // Suponemos algunos valores por defecto o calculados:
            const tipoTrabajador = 0; // Activo
            // Por ejemplo, si tipoTrabajador = '1' entonces es un número entero 1, ajusta la lógica.
            const tipoTrabajadorNum =
              parseInt(tipoTrabajador.toString(), 10) || 0;

            const tipoLinea = "0"; // Ejemplo: línea estándar
            const codigoMovPersonal = "0"; // Ejemplo: sin movimiento

            const valorCotizacionIsapre = trabajador.salud.cotizacionPactada
              ? trabajador.salud.cotizacionPactada *
                40000
              : 0;

            //Calcular si el sueldo imponible * 0.07 es menor que la cotizcion de isapre, entonces calcular diferencia
            const diferenciaIsapre = () => {
              if (sueldoImponible * 0.07 < valorCotizacionIsapre) {
                return valorCotizacionIsapre - sueldoImponible * 0.07;
              } else {
                return 0;
              }
            };

            // Calcular pago mutualidad
            const valorPagoMutualidad = mutualidad
              ? mutualidad.tasamutual * sueldoImponible
              : 0;

            //Determinar tasa de aporte cesantia trabajador
            const valorAporteTrabajadorCesantia =
              informacionLaboral.tipoContrato === "indefinido"
                ? sueldoImponible * 0.006
                : 0;

            // Determinar tasa de aporte cesantia empleador
            const valorAporteEmpleadorCesantia =
              informacionLaboral.tipoContrato === "indefinido"
                ? sueldoImponible * 0.024
                : sueldoImponible * 0.03;

            // Crear la instancia del DTO con todos los campos requeridos.
            // Asigna valores por defecto o derivados según sea necesario.
            // Crear la instancia del DTO con todos los campos requeridos.
            const dto = new ArchivoPreviredDTO();

            //Asignar valores por defecto o derivados según sea necesario, transformando de acuerdo al tipo de dato recibido por el dto.
            dto.rut = trabajador.rut || "0"; // Campo 1
            dto.dv = trabajador.dv.toString(); // Campo 2
            dto.patlastname = trabajador.patlastname.toString(); // Campo 3
            dto.matlastname = trabajador.matlastname?.toString() || ""; // Campo 4
            dto.names = trabajador.names.toString(); // Campo 5
            dto.genero = trabajador.genero.toString(); // Campo 6
            dto.nationality =
              parseInt(trabajador.nationality.toString(), 10) || 0; // Campo 7
            dto.tipoPago = informacionLaboral.tipopago || 0; // Campo 8
            dto.mesRemuneracion = mesRemuneracion || "0"; // Campo 9
            dto.regimenPrevisional = "AFP";
            dto.tipoTrabajador = informacionLaboral.tipoTrabajador || 0; // Campo 12
            dto.diasTrabajados = 30; // Campo 13
            dto.tipoLinea = "0"; // Campo 14
            dto.codigoMovPersonal = 0; // Campo 15
            dto.tramoAsignacionFamiliar =
              informacionLaboral.tramoAsignacionFamiliar || "D"; // Campo 18
            dto.codigoAFP = afp?.codigoAfp || 0; // Campo 26
            dto.sueldoImponibleAfp = Math.round(sueldoImponible) || 0; // Campo 27
            dto.cotizacionObligatoriaAFP =
              parseInt(cotizacionObligatoriaAFP.toFixed(0), 10) || 0; // Campo 28
            dto.cotizacionSIS = cotizacionSisCalculada; // Campo 29
            dto.codigoSalud = salud?.codigoSalud || 0; // Campo 75

            // Tratamiento DTO para Fonasa y Isapre
            if (salud.codigoSalud === 7) {
              dto.cotizacionFonasa = Math.round(sueldoImponible * 0.07); // Campo 70
              dto.cotizacionNoIsapre = 0; // Campo 90
              dto.rentaImponibleSalud = rentaImponible; // Campo 64
            } else {
              dto.rentaImponibleIsapre = Math.round(rentaImponible);
              dto.cotizacionPactada = trabajador.salud.cotizacionPactada || 0; // Campo 79
              dto.numeroFUN = trabajador.salud.codigoFun || ""; // Campo 76
              dto.tipoMoneda = trabajador.salud.tipoMoneda || 0; // Campo 78
              dto.cotizacionIsapre = Math.round(sueldoImponible * 0.07) || 0; // Campo 80
              dto.cotizacionAdicionalIsapre = diferenciaIsapre() || 0; // Campo 81
            }

            // Tratamiento DTO para Mutualidad
            if (mutualidad.codigomutual !== 0) {
              // Mutualidad privada
              dto.cotizacionISL = 0;
              dto.codigoMutualidad = mutualidad.codigomutual || 0;
              dto.rentaImponibleMutual = rentaImponible; // entero
              dto.cotizacionMutual = Math.round(
                rentaImponible * mutualidad.tasamutual
              ); // entero
            } else {
              // ISL
              dto.cotizacionISL = Math.round(
                rentaImponible * mutualidad.tasamutual
              );
              dto.rentaImponibleSalud = rentaImponible; // Campo 64
            }

            dto.rentaImponibleCesantia = rentaImponible; // Campo 100
            dto.aporteTrabajadorCesantia = valorAporteTrabajadorCesantia; // Campo 101
            dto.aporteEmpleadorCesantia = valorAporteEmpleadorCesantia; // Campo 102

            // Tratamiento DTO para CCAF y FONASA
            if (ccaf) {
              dto.codigoCCAF = ccaf?.codigoccaf || 0; // Campo 83
              dto.rentaImponibleCCAF = rentaImponible; // Campo 84
              dto.montoPagoAsignacionFamiliar = Math.round(montoAf); // campo 22
              dto.descuentoCargas = 0; // campo 73
              dto.descuentoCargasFamiliares = Math.round(montoAf); // campo 91
              dto.cotizacionFonasa = Math.round(sueldoImponible * 0.016); // Campo 70
              dto.cotizacionNoIsapre = Math.round(sueldoImponible * 0.054); // Campo 90
            } else {
              dto.montoPagoAsignacionFamiliar = Math.round(montoAf); // campo 22
              dto.descuentoCargas = Math.round(montoAf); // campo 73
              dto.descuentoCargasFamiliares = 0; // campo 91
              dto.cotizacionFonasa = Math.round(sueldoImponible * 0.07); // Campo 70
              dto.cotizacionNoIsapre = 0; // Campo 90
            }

            // Campo 64
            // Validar el DTO
            const errors = await validate(dto);
            if (errors.length > 0) {
              const errorMessages = errors.map((err) => ({
                property: err.property,
                constraints: err.constraints,
              }));
              throw new Error(
                `Validación fallida: ${JSON.stringify(errorMessages)}`
              );
            }

            return dto;
          })
        );

        // 5. Generar las líneas del archivo usando el helper
        const cadenasTrabajadores = dtos.map((dto) =>
          ArchivoPreviredFormatter.format(dto)
        );

        // 6. Unir todas las líneas en un archivo
        const archivoPrevired = cadenasTrabajadores.join("\n");

        // 7. Guardar registro del archivo generado
        const fechaActual = new Date();
        const archivoPreviredGenerado = manager.create(
          ArchivosPreviredGenerado,
          {
            negocio,
            archivo: archivoPrevired,
            fecha: fechaActual,
            mes: fechaActual.getMonth() + 1,
            anio: fechaActual.getFullYear(),
          }
        );

        await manager.save(archivoPreviredGenerado);

        return archivoPrevired;
      }
    );
  }

  // Métodos auxiliares

  private membresiaActivaUsuario(usuario: any): boolean {
    // Lógica para verificar si la membresía del usuario está activa
    // Por ejemplo: return usuario.membresiaActiva && usuario.fechaExpiracion > new Date();
    return true; // Ajusta según tu lógica real
  }

  private obtenerFecha(): string {
    const fecha = new Date();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${mes}${anio}`;
  }

  private async calcularMontoAf(
    manager: EntityManager,
    tramoAsignacionFamiliar: string,
    sueldoImponible: number
  ): Promise<number> {
    if (!["A", "B", "C", "D", ""].includes(tramoAsignacionFamiliar)) {
      throw new Error(`Tramo inválido: ${tramoAsignacionFamiliar}`);
    }

    if (typeof sueldoImponible !== "number" || sueldoImponible < 0) {
      throw new Error(`Sueldo imponible inválido: ${sueldoImponible}`);
    }

    if (tramoAsignacionFamiliar === "D" || tramoAsignacionFamiliar === "") {
      return 0;
    }

    const tramo = await manager.findOne(AsignacionFamiliar, {
      where: { tramo: tramoAsignacionFamiliar },
    });

    if (!tramo) {
      throw new Error(`Tramo ${tramoAsignacionFamiliar} no encontrado`);
    }

    // Obtener tramos ordenados de mayor a menor rentaTope
    const tramosOrdenados = await manager.find(AsignacionFamiliar, {
      order: { rentaTope: "DESC" },
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
        montoAsignacion = currentTramo.montoPago;
        break;
      }
    }

    // Verificar que el sueldo imponible esté dentro del rango del tramo
    if (sueldoImponible > tramoInferior && sueldoImponible <= tramoSuperior) {
      return montoAsignacion;
    } else {
      throw new Error(
        `El sueldo imponible ${sueldoImponible} no está dentro del rango del tramo ${tramoAsignacionFamiliar} (${tramoInferior} - ${tramoSuperior})`
      );
    }
  }

  /**
   * Función para calcular el adicional Isapre.
   */
  private calculoAdicionalIsapre(
    sueldoImponible: number,
    uf: number,
    cotizacionPactada: number
  ): number {
    const cotizacionIsapre = Math.round(sueldoImponible * 0.07);
    const planIsapre = Math.round(cotizacionPactada * uf);
    return Math.max(0, planIsapre - cotizacionIsapre);
  }
}
