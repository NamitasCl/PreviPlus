// src/helpers/ArchivoPreviredFormatter.ts

import ArchivoPreviredDTO from "../dtos/ArchivoPrevired.dto.js";

/**
 * Formateador para ArchivoPrevired.
 * Convierte una instancia de ArchivoPreviredDTO en una línea formateada para el archivo Previred.
 */
export class ArchivoPreviredFormatter {
  static format(dto: ArchivoPreviredDTO): string {
    return [
      dto.rut, // Campo 1: RUT
      dto.dv, // Campo 2: Dígito Verificador
      dto.patlastname, // Campo 3: Apellido Paterno
      dto.matlastname || "", // Campo 4: Apellido Materno
      dto.names, // Campo 5: Nombres
      dto.genero, // Campo 6: Género
      dto.nationality.toString(), // Campo 7: Nacionalidad
      dto.tipoPago.toString(), // Campo 8: Tipo de Pago
      dto.mesRemuneracion, // Campo 9: Período de Pago (mmaaaa)
      dto.mesRemuneracionHasta || "", // Campo 10: Periodo hasta de pago (N/I)
      dto.regimenPrevisional, // Campo 11: Régimen Previsional
      dto.tipoTrabajador.toString(), // Campo 12: Tipo de Trabajador
      dto.diasTrabajados.toString(), // Campo 13: Días Trabajados
      dto.tipoLinea, // Campo 14: Tipo de Línea de Cotización
      dto.codigoMovPersonal.toString(), // Campo 15: Código Movimiento Personal
      dto.campo16_condicional || "", // Campo 16: Condicional
      dto.campo17_condicional || "", // Campo 17: Condicional
      dto.tramoAsignacionFamiliar, // Campo 18: Tramo Asignación Familiar
      dto.campo19_condicional || "0", // Campo 19: Condicional
      dto.campo20_condicional || "0", // Campo 20: Condicional
      dto.campo21_condicional || "0", // Campo 21: Condicional
      dto.montoPagoAsignacionFamiliar.toString(), // Campo 22: Monto de Pago de Asignación Familiar
      dto.campo23_condicional || "0", // Campo 23: Condicional
      dto.campo24_condicional || "0", // Campo 24: Condicional
      dto.campo25_condicional || "", // Campo 25: Solicitud Trabajador Joven
      dto.codigoAFP.toString(), // Campo 26: Código AFP
      Math.round(dto.sueldoImponibleAfp).toString(), // Campo 27: Sueldo Imponible AFP (Entero)
      Math.round(dto.cotizacionObligatoriaAFP).toString(), // Campo 28: Cotización Obligatoria AFP (Entero)
      Math.round(dto.cotizacionSIS).toString(), // Campo 29: Cotización SIS (Entero)
      "0", // Campo 30: Cuenta de Ahorro Voluntario AFP (N/I)
      "0", // Campo 31: Renta Imp. Sustitutiva AFP (N/I)
      "0", // Campo 32: Tasa Pactada (Sustitutiva) (N/I)
      dto.campo33_condicional || "0", // Campo 33: Aporte Indemnización (N/I)
      dto.campo34_condicional || "0", // Campo 34: N° Períodos (N/I)
      dto.campo35_condicional || "", // Campo 35: Período desde (N/I)
      dto.campo36_condicional || "", // Campo 36: Período Hasta (N/I)
      dto.campo37_condicional || "", // Campo 37: Puesto de Trabajo Pesado (N/I)
      dto.campo38_condicional || "0", // Campo 38: % Cotización Trabajo Pesado (N/I)
      dto.campo39_condicional || "0", // Campo 39: Cotización Trabajo Pesado (N/I)
      dto.campo40_condicional || "0", // Campo 40: Código de la Institución APVI (N/I)
      dto.campo41_condicional || "", // Campo 41: Número de Contrato APVI (N/I)
      dto.campo42_condicional || "0", // Campo 42: Forma de Pago APVI (N/I)
      dto.campo43_condicional || "0", // Campo 43: Cotización APVI (N/I)
      dto.campo44_condicional || "0", // Campo 44: Cotización Depósitos Convenidos (N/I)
      dto.campo45_condicional || "0", // Campo 45: Código Institución Autorizada APVC (N/I)
      dto.campo46_condicional || "", // Campo 46: Número de Contrato APVC (N/I)
      dto.campo47_condicional || "0", // Campo 47: Forma de Pago APVC (N/I)
      dto.campo48_condicional || "0", // Campo 48: Cotización Trabajador APVC (N/I)
      dto.campo49_condicional || "0", // Campo 49: Cotización Empleador APVC (N/I)
      dto.campo50_condicional || "0", // Campo 50: Rut Afiliado Voluntario (N/I)
      dto.campo51_condicional || "", // Campo 51: DV Afiliado Voluntario (N/I)
      dto.campo52_condicional || "", // Campo 52: Apellido Paterno (N/I)
      dto.campo53_condicional || "", // Campo 53: Apellido Materno (N/I)
      dto.campo54_condicional || "", // Campo 54: Nombres (N/I)
      dto.campo55_condicional?.toString() || "0", // Campo 55: Código Movimiento de Personal (N/I)
      dto.campo56_condicional || "", // Campo 56: Fecha desde (N/I)
      dto.campo57_condicional || "", // Campo 57: Fecha hasta (N/I)
      dto.campo58_condicional?.toString() || "0", // Campo 58: Código de la AFP (N/I)
      dto.campo59_condicional || "0", // Campo 59: Monto Capitalización Voluntaria (N/I)
      dto.campo60_condicional || "0", // Campo 60: Monto Ahorro Voluntario (N/I)
      dto.campo61_condicional || "0", // Campo 61: Número de periodos de cotización (N/I)
      dto.campo62_condicional || "0", // Campo 62: Código EX-Caja Régimen (N/I)
      dto.campo63_condicional?.toString() || "0", // Campo 63: Tasa Cotización Ex-Caja Previsión (N/I)
      dto.rentaImponibleSalud.toString(), // Campo 64: Renta Imponible IPS / ISL / Fonasa
      dto.campo65_condicional?.toString() || "0", // Campo 65: Cotización Obligatoria IPS (N/I)
      dto.campo66_condicional || "0", // Campo 66: Renta Imponible Desahucio (N/I)
      dto.campo67_condicional || "0", // Campo 67: Código EX-Caja Régimen Desahucio (N/I)
      dto.campo68_condicional?.toString() || "0", // Campo 68: Tasa Cotización Desahucio Ex-Cajas de Previsión (N/I)
      dto.campo69_condicional?.toString() || "0", // Campo 69: Cotización Desahucio (N/I)
      dto.cotizacionFonasa.toString(), // Campo 70: Cotización Fonasa
      Math.round(dto.cotizacionISL).toString(), // Campo 71: Cotización Acc. Trabajo (ISL)
      dto.campo72_condicional || "0", // Campo 72: Bonificación Ley 15.386 (N/I)
      dto.descuentoCargas.toString(), // Campo 73: Descuento por cargas familiares de IPS (ex INP)
      dto.campo74_condicional || "0", // Campo 74: Bonos Gobierno (Campo futuro)
      dto.codigoSalud.toString(), // Campo 75: Código Salud
      dto.numeroFUN || "0", // Campo 76: Número de Contrato Salud
      Math.round(dto.rentaImponibleIsapre).toString(), // Campo 77: Renta Imponible Isapre
      dto.tipoMoneda.toString(), // Campo 78: Tipo Moneda
      dto.cotizacionPactada?.toString() || "0", // Campo 79: Cotización Pactada
      dto.cotizacionIsapre.toString(), // Campo 80: Cotización 7% hacia ISAPRE
      dto.cotizacionAdicionalIsapre?.toString() || "0", // Campo 81: Cotización Diferencia 7% hacia ISAPRE
      dto.campo82_condicional?.toString() || "0", // Campo 82: Monto Garantía Explícita de Salud GES (N/I)
      dto.codigoCCAF?.toString() || "0", // Campo 83: Código CCAF
      Math.round(dto.rentaImponibleCCAF).toString(), // Campo 84: Renta Imponible CCAF
      dto.creditosPersonalesCcaf?.toString() || "0", // Campo 85: Créditos Personales CCAF
      dto.descuentoDental?.toString() || "0", // Campo 86: Descuento Dental CCAF
      dto.descuentoLeasing?.toString() || "0", // Campo 87: Descuento Leasing CCAF
      dto.descuentoSeguroVida?.toString() || "0", // Campo 88: Descuento Seguro de Vida CCAF
      dto.otrosDescuentos?.toString() || "0", // Campo 89: Otros Descuentos CCAF
      dto.cotizacionNoIsapre
        ? Math.round(dto.cotizacionNoIsapre).toString()
        : 0, // Campo 90: Cotización CCAF no Isapre dto.
      dto.descuentoCargasFamiliares?.toString() || "0", // Campo 91: Descuento Cargas Familiares CCAF
      dto.campo92_condicional?.toString() || "0", // Campo 92: Otros descuentos CCAF 1 (N/I)
      dto.campo93_condicional?.toString() || "0", // Campo 93: Otros descuentos CCAF 2 (N/I)
      dto.campo94_condicional || "0", // Campo 94: Bonos Gobierno (Campo futuro)
      dto.campo95_condicional || "", // Campo 95: Código de la sucursal inscrita para recibir SFE
      dto.codigoMutualidad?.toString() || "0", // Campo 96: Código Mutualidad
      Math.round(dto.rentaImponibleMutual).toString(), // Campo 97: Renta Imponible Mutual
      Math.round(dto.cotizacionMutual).toString(), // Campo 98: Cotización Mutual
      dto.campo99_condicional?.toString() || "0", // Campo 99: Sucursal para pago Mutual (N/I)
      Math.round(dto.rentaImponibleCesantia).toString(), // Campo 100: Renta Imponible Cesantía
      dto.aporteTrabajadorCesantia
        ? Math.round(dto.aporteTrabajadorCesantia).toString()
        : 0, // Campo 101: Aporte Trabajador Cesantía
      dto.aporteEmpleadorCesantia
        ? Math.round(dto.aporteEmpleadorCesantia).toString()
        : 0, // Campo 102: Aporte Empleador Cesantía
      dto.campo103_condicional || "0", // Campo 103: Rut Pagadora Subsidio (N/I)
      dto.campo104_condicional || "", // Campo 104: DV Pagadora Subsidio (N/I)
      dto.campo105_condicional || "0", // Campo 105: Centro de Costos, Sucursal, Agencia (N/I)
    ].join(";");
  }
}
