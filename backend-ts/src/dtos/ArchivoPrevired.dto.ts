// src/dto/ArchivoPreviredDTO.ts

import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsInt,
  Min,
  IsNumber,
  IsIn,
  Matches,
} from "class-validator";

/**
 * DTO para ArchivoPrevired.
 * Incluye validaciones para cada campo según las restricciones del modelo original.
 */
export default class ArchivoPreviredDTO {
  // Campo 1: RUT
  @IsString()
  @Length(1, 8, {
    message: "RUT del trabajador debe tener entre 1 y 8 caracteres.",
  })
  @IsNotEmpty({ message: "RUT del trabajador es requerido." })
  rut: string = "";

  // Campo 2: Dígito Verificador
  @IsString()
  @Length(1, 1, {
    message: "DV del trabajador debe tener exactamente 1 carácter.",
  })
  @IsNotEmpty({ message: "DV del trabajador es requerido." })
  dv: string = "";

  // Campo 3: Apellido Paterno
  @IsString()
  @Length(1, 30, {
    message:
      "Apellido paterno del trabajador debe tener entre 1 y 30 caracteres.",
  })
  @IsNotEmpty({ message: "Apellido paterno del trabajador es requerido." })
  patlastname: string = "";

  // Campo 4: Apellido Materno
  @IsString()
  @Length(0, 30, {
    message: "Apellido materno del trabajador no debe exceder 30 caracteres.",
  })
  @IsOptional()
  matlastname?: string;

  // Campo 5: Nombres
  @IsString()
  @Length(1, 30, {
    message: "Nombres del trabajador deben tener entre 1 y 30 caracteres.",
  })
  @IsNotEmpty({ message: "Nombres del trabajador son requeridos." })
  names: string = "";

  // Campo 6: Género, puede ser M o F
  @IsString({ message: "Género del trabajador debe ser M o F." })
  @IsIn(["M", "F"], { message: "Género del trabajador debe ser M o F." })
  @Length(1, 1, {
    message: "Género del trabajador debe tener exactamente 1 carácter.",
  })
  @IsNotEmpty({ message: "Género del trabajador es requerido." })
  genero: string = "";

  // Campo 7: Nacionalidad
  @IsInt({ message: "Nacionalidad del trabajador debe ser un número entero." })
  @IsIn([0, 1], {
    message: "Nacionalidad del trabajador debe ser 0: Chileno o 1: Extranjero.",
  })
  @IsNotEmpty({ message: "Nacionalidad del trabajador es requerida." })
  nationality: number = 0;

  // Campo 8: Tipo de Pago
  @IsInt({ message: "Tipo de pago debe ser un número entero." })
  @IsIn([1, 2, 3], {
    message:
      "Tipo de pago debe ser 1: Remuneración total, 2: Gratificación, 3: Bono ley modernización empresas públicas",
  })
  @IsNotEmpty({ message: "Tipo de pago es requerido." })
  tipoPago: number = 1;

  // Campo 9: Período de Pago formato mmaaaa
  @IsString({
    message: "Período de pago debe tener formato (mmaaaa).",
  })
  @Length(6, 6, {
    message: "Período de pago debe tener exactamente 6 caracteres (mmaaaa).",
  })
  @IsNotEmpty({ message: "Período de pago es requerido." })
  mesRemuneracion: string = "";

  // Campo 10: Periodo hasta de pago, formato mmaaaa
  @IsString({
    message:
      "Periodo hasta de pago debe tener entre 5 y 6 caracteres (mmaaaa).",
  })
  @Length(0, 6, {
    message:
      "Periodo hasta de pago debe tener exactamente 6 caracteres (mmaaaa).",
  })
  @IsOptional()
  mesRemuneracionHasta?: string = "0";

  // Campo 11: Régimen Previsional
  @IsString({ message: "Régimen previsional: Solo se acepta AFP." })
  @Length(1, 3, {
    message: "Régimen previsional debe tener entre 1 y 3 caracteres.",
  })
  @IsNotEmpty({ message: "Régimen previsional es requerido." })
  regimenPrevisional: string = "AFP";

  // Campo 12: Tipo de Trabajador
  @IsInt({
    message:
      "Tipo de trabajador debe ser un número entero. 0 es trabajador activo",
  })
  @IsIn([0, 1, 2, 3, 8], { message: "Tipo de trabajador inválido." })
  @IsNotEmpty({ message: "Tipo de trabajador es requerido." })
  tipoTrabajador: number = 0;

  // Campo 13: Días Trabajados
  @IsInt({ message: "Días trabajados, por defecto 30." })
  @Min(0, { message: "Días trabajados no puede ser negativo." })
  @IsNotEmpty({ message: "Días trabajados es requerido." })
  diasTrabajados: number = 30;

  // Campo 14: Tipo de Línea de Cotización
  @IsString({
    message: "Tipo de línea de cotización debe ser un número entero.",
  })
  @IsIn(["0", "1", "2", "3"], {
    message:
      "Tipo de línea de cotización debe ser 0: Principal o básica, 1: Línea adicional, 2: Segundo contrato, 3: Movimiento personal afiliado voluntario",
  })
  @Length(1, 1, {
    message: "Tipo de línea de cotización debe tener exactamente 1 carácter.",
  })
  @IsNotEmpty({ message: "Tipo de línea de cotización es requerido." })
  tipoLinea: string = "0";

  // Campo 15: Código Movimiento Personal
  @IsInt({ message: "Código Movimiento Personal debe ser un número entero." })
  @IsIn([0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12], {
    message:
      "Código Movimiento Personal debe ser uno de los valores permitidos.",
  })
  @IsNotEmpty({ message: "Código Movimiento Personal es requerido." })
  codigoMovPersonal: number = 0;

  // Campos 16 a 18 (Condicionales no implementados)
  @IsString()
  @Length(0, 10, {
    message: "Campo 16 no implementado no debe exceder 10 caracteres.",
  })
  @IsOptional()
  campo16_condicional?: string = "";

  @IsString()
  @Length(0, 10, {
    message: "Campo 17 no implementado no debe exceder 10 caracteres.",
  })
  @IsOptional()
  campo17_condicional?: string = "";

  @IsString()
  @IsIn(["A", "B", "C", "D", ""], {
    message: "Tramo asignación familiar debe ser A, B, C, D o D.",
  })
  @Length(1, 1, {
    message: "Tramo asignación familiar debe tener exactamente 1 carácter.",
  })
  @IsNotEmpty({ message: "Tramo asignación familiar es requerido." })
  tramoAsignacionFamiliar: string = "D";

  // Campo 19: Condicional (No implementado)
  @IsString()
  @Length(0, 1, {
    message: "Campo 19 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo19_condicional?: string = "0";

  // Campo 20: Condicional (No implementado)
  @IsString()
  @Length(0, 1, {
    message: "Campo 20 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo20_condicional?: string = "0";

  // Campo 21: Condicional (No implementado)
  @IsString()
  @Length(0, 1, {
    message: "Campo 21 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo21_condicional?: string = "0";

  // Campo 22: Monto de Pago de Asignación Familiar
  @IsInt({
    message: "Monto de pago de asignación familiar debe ser un número entero.",
  })
  @Min(0, {
    message: "Monto de pago de asignación familiar no puede ser negativo.",
  })
  @IsNotEmpty({ message: "Monto de pago de asignación familiar es requerido." })
  montoPagoAsignacionFamiliar: number = 0;

  // Campos 23 a 25 (Condicionales no implementados)
  @IsString()
  @Length(0, 1, {
    message: "Campo 23 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo23_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 24 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo24_condicional?: string = "0";

  @IsString()
  @Length(1, 1, {
    message: "Solicitud trabajador joven debe tener exactamente 1 carácter.",
  })
  @IsNotEmpty({ message: "Solicitud trabajador joven es requerido." })
  campo25_condicional: string = "N";

  // Campo 26: Código AFP
  @IsInt({ message: "Código AFP debe ser un número entero." })
  @IsIn([0, 3, 5, 8, 29, 33, 34, 35], {
    message: "Código AFP debe ser uno de los valores permitidos.",
  })
  @IsNotEmpty({ message: "Código AFP es requerido." })
  codigoAFP: number = 0;

  // Campo 27: Sueldo Imponible AFP
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Sueldo imponible AFP debe tener hasta 2 decimales." }
  )
  @IsNotEmpty({ message: "Sueldo imponible AFP es requerido." })
  sueldoImponibleAfp: number = 0.0;

  // Campo 28: Cotización Obligatoria AFP
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: "Cotización Obligatoria AFP debe tener hasta 2 decimales.",
    }
  )
  @IsNotEmpty({ message: "Cotización Obligatoria AFP es requerido." })
  cotizacionObligatoriaAFP: number = 0.0;

  // Campo 29: Cotización SIS
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Cotización SIS debe tener hasta 2 decimales." }
  )
  @IsNotEmpty({ message: "Cotización SIS es requerido." })
  cotizacionSIS: number = 0.0;

  // Campos 30 a 68 (Condicionales no implementados)
  @IsOptional()
  campo30_condicional?: number = 0;

  @IsOptional()
  campo31_condicional?: number = 0;

  @IsOptional()
  campo32_condicional?: number = 0;

  @IsString()
  @Length(0, 1, {
    message: "Campo 33 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo33_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 34 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo34_condicional?: string = "0";

  @IsString()
  @Length(0, 10, {
    message: "Campo 35 no implementado no debe exceder 10 caracteres.",
  })
  @IsOptional()
  campo35_condicional?: string = "";

  @IsString()
  @Length(0, 10, {
    message: "Campo 36 no implementado no debe exceder 10 caracteres.",
  })
  @IsOptional()
  campo36_condicional?: string = "";

  @IsString()
  @Length(0, 40, {
    message: "Campo 37 no implementado no debe exceder 40 caracteres.",
  })
  @IsOptional()
  campo37_condicional?: string = "";

  @IsInt({ message: "Campo 38 no implementado debe ser un número entero." })
  @IsOptional()
  campo38_condicional?: number = 0;

  @IsString()
  @Length(0, 1, {
    message: "Campo 39 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo39_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 40 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo40_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 41 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo41_condicional?: string = "";

  @IsString()
  @Length(0, 1, {
    message: "Campo 42 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo42_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 43 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo43_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 44 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo44_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 45 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo45_condicional?: string = "0";

  @IsString()
  @Length(0, 20, {
    message: "Campo 46 no implementado no debe exceder 20 caracteres.",
  })
  @IsOptional()
  campo46_condicional?: string = "";

  @IsString()
  @Length(0, 1, {
    message: "Campo 47 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo47_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 48 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo48_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 49 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo49_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 50 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo50_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 51 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo51_condicional?: string = "";

  // Campo 52 a 105 (Condicionales no implementados)
  @IsOptional()
  campo52_condicional?: string = "";

  @IsOptional()
  campo53_condicional?: string = "";

  @IsOptional()
  campo54_condicional?: string = "";

  @IsInt({ message: "Campo 55 no implementado no debe ser un número entero." })
  @IsOptional()
  campo55_condicional?: number = 0;

  @IsString()
  @Length(0, 10, {
    message: "Campo 56 no implementado no debe exceder 10 caracteres.",
  })
  @IsOptional()
  campo56_condicional?: string = "";

  @IsString()
  @Length(0, 10, {
    message: "Campo 57 no implementado no debe exceder 10 caracteres.",
  })
  @IsOptional()
  campo57_condicional?: string = "";

  @IsInt({ message: "Campo 58 no implementado no debe ser un número entero." })
  @IsOptional()
  campo58_condicional?: number = 0;

  @IsString()
  @Length(0, 1, {
    message: "Campo 59 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo59_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 60 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo60_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 61 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo61_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 62 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo62_condicional?: string = "0";

  // Campo 63: Tasa Cotización Ex-Caja Previsión (No Implementado)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Campo 63 no implementado debe tener hasta 2 decimales." }
  )
  @IsOptional()
  campo63_condicional?: number = 0.0;

  // Campo 64: Renta Imponible IPS / ISL / Fonasa
  @IsInt({
    message: "Renta Imponible IPS / ISL / Fonasa debe ser un número entero.",
  })
  @IsNotEmpty({ message: "Renta Imponible IPS / ISL / Fonasa es requerida." })
  rentaImponibleSalud: number = 0;

  // Campo 65: Cotización Obligatoria IPS (Caso que cotice IPS)
  @IsInt()
  @IsOptional()
  campo65_condicional?: number = 0;

  // Campo 66: Renta Imponible Desahucio (No Implementado)
  @IsString()
  @Length(0, 1, {
    message: "Campo 66 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo66_condicional?: string = "0";

  // Campo 67: Código Ex-Caja Régimen Desahucio (No Implementado)
  @IsString()
  @Length(0, 1, {
    message: "Campo 67 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo67_condicional?: string = "0";

  // Campo 68: Tasa Cotización Desahucio Ex-Cajas de Previsión (No Implementado)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Campo 68 no implementado debe tener hasta 2 decimales." }
  )
  @IsOptional()
  campo68_condicional?: number = 0.0;

  // Campo 69: Cotización Desahucio (No Implementado)
  @IsInt()
  @Min(0, { message: "Campo 69 no implementado no debe ser negativo." })
  @IsOptional()
  campo69_condicional?: number = 0;

  // Campo 70: Cotización Fonasa
  @IsInt({ message: "Cotización Fonasa debe tener hasta 2 decimales." })
  @IsNotEmpty({ message: "Cotización Fonasa es requerida." })
  cotizacionFonasa: number = 0;

  // Campo 71: Cotización Acc. Trabajo (ISL)
  @IsInt({
    message: "Cotización Acc. Trabajo (ISL) debe ser un número entero.",
  })
  @IsNotEmpty({ message: "Cotización Acc. Trabajo (ISL) es requerida." })
  cotizacionISL: number = 0;

  // Campo 72: Bonificación Ley 15.386 (No Implementado)
  @IsString()
  @Length(0, 1, {
    message: "Campo 72 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo72_condicional?: string = "0";

  // Campo 73: Descuento por cargas familiares de IPS (ex INP)
  @IsInt({
    message:
      "Descuento por cargas familiares de IPS debe ser un número entero.",
  })
  @Min(0, { message: "Campo 73 no implementado no debe ser negativo." })
  @IsNotEmpty({
    message: "Descuento por cargas familiares de IPS es requerido.",
  })
  descuentoCargas: number = 0;

  // Campo 74: Bonos Gobierno (Campo futuro)
  @IsString()
  @Length(0, 1, {
    message: "Campo 74 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo74_condicional?: string = "0";

  // Campo 75: Código Salud ISAPRE
  @IsInt({ message: "Código Salud debe ser un número entero." })
  @IsIn([0, 1, 2, 3, 4, 5, 7, 10, 11, 12, 25, 28], {
    message: "Código Salud debe ser uno de los valores permitidos.",
  })
  @IsNotEmpty({ message: "Código Salud es requerido." })
  codigoSalud: number = 0;

  // Campo 76: Número de Contrato Salud
  @IsString()
  @Length(0, 16, {
    message: "Número de contrato salud no debe exceder 16 caracteres.",
  })
  @IsOptional()
  numeroFUN?: string = "";

  // Campo 77: Renta Imponible Isapre
  @IsInt({
    message: "Renta Imponible Isapre debe ser un número entero.",
  })
  @IsNotEmpty({ message: "Renta Imponible Isapre es requerida." })
  rentaImponibleIsapre: number = 0;

  // Campo 78: Tipo Moneda
  @IsInt({ message: "Tipo Moneda debe ser un número entero." })
  @IsIn([0, 1, 2], {
    message: "Tipo Moneda debe ser 0: sin isapre, 1: Pesos, 2: Uf.",
  })
  @IsNotEmpty({ message: "Tipo Moneda es requerido." })
  tipoMoneda: number = 0;

  // Campo 79: Cotización Pactada
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Cotización Pactada debe tener hasta 2 decimales." }
  )
  @IsOptional()
  cotizacionPactada?: number = 0.0;

  // Campo 80: Cotización 7% hacia ISAPRE
  @IsInt({
    message: "Cotización 7% hacia ISAPRE debe tener hasta 2 decimales.",
  })
  @IsNotEmpty({ message: "Cotización 7% hacia ISAPRE es requerida." })
  cotizacionIsapre: number = 0;

  // Campo 81: Cotización Diferencia 7% hacia ISAPRE
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message:
        "Cotización Diferencia 7% hacia ISAPRE debe tener hasta 2 decimales.",
    }
  )
  @IsOptional()
  cotizacionAdicionalIsapre?: number = 0.0;

  // Campo 82: Monto Garantía Explícita de Salud GES (No Implementado)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Campo 82 no implementado debe tener hasta 2 decimales." }
  )
  @IsOptional()
  campo82_condicional?: number = 0.0;

  // Campo 83: Código CCAF
  @IsInt({ message: "Código CCAF debe ser un número entero." })
  @IsIn([0, 1, 2, 3, 4], {
    message: "Código CCAF debe ser uno de los valores permitidos.",
  })
  @IsOptional()
  codigoCCAF?: number = 0;

  // Campo 84: Renta Imponible CCAF
  @IsInt({
    message: "Renta Imponible CCAF debe ser un número entero.",
  })
  @IsNotEmpty({ message: "Renta Imponible CCAF es requerida." })
  rentaImponibleCCAF: number = 0;

  // Campo 85: Créditos Personales CCAF
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Créditos Personales CCAF debe tener hasta 2 decimales." }
  )
  @IsOptional()
  creditosPersonalesCcaf?: number = 0.0;

  // Campo 86: Descuento Dental CCAF
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Descuento Dental CCAF debe tener hasta 2 decimales." }
  )
  @IsOptional()
  descuentoDental?: number = 0.0;

  // Campo 87: Descuento Leasing CCAF
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Descuento Leasing CCAF debe tener hasta 2 decimales." }
  )
  @IsOptional()
  descuentoLeasing?: number = 0.0;

  // Campo 88: Descuento Seguro de Vida CCAF
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Descuento Seguro de Vida CCAF debe tener hasta 2 decimales." }
  )
  @IsOptional()
  descuentoSeguroVida?: number = 0.0;

  // Campo 89: Otros Descuentos CCAF
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Otros Descuentos CCAF debe tener hasta 2 decimales." }
  )
  @IsOptional()
  otrosDescuentos?: number = 0.0;

  // Campo 90: Cotización CCAF no Isapre
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: "Cotización CCAF no Isapre debe tener hasta 2 decimales.",
    }
  )
  @IsOptional()
  cotizacionNoIsapre?: number = 0.0;

  // Campo 91: Descuento Cargas Familiares CCAF
  @IsInt()
  @Min(0, { message: "Campo 91 no debe ser negativo." })
  @IsOptional()
  descuentoCargasFamiliares?: number = 0;

  // Campos 92 a 105 (Condicionales no implementados)
  @IsOptional()
  campo92_condicional?: number = 0.0;

  @IsOptional()
  campo93_condicional?: number = 0.0;

  @IsString()
  @Length(0, 1, {
    message: "Campo 94 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo94_condicional?: string = "0";

  @IsString()
  @Length(0, 20, {
    message: "Campo 95 no implementado no debe exceder 20 caracteres.",
  })
  @IsOptional()
  campo95_condicional?: string = "";

  // Campo 96: Código Mutualidad
  @IsInt({ message: "Código Mutualidad debe ser un número entero." })
  @IsIn([0, 1, 2, 3], {
    message: "Código Mutualidad debe ser uno de los valores permitidos.",
  })
  @IsNotEmpty({ message: "Código Mutualidad es requerido." })
  codigoMutualidad: number = 0;

  // Campo 97: Renta Imponible Mutual
  @IsInt({
    message: "Renta Imponible Mutual debe ser un número entero.",
  })
  @IsNotEmpty({ message: "Renta Imponible Mutual es requerida." })
  rentaImponibleMutual: number = 0;

  // Campo 98: Cotización Mutual
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Cotización Mutual debe tener hasta 2 decimales." }
  )
  @IsNotEmpty({ message: "Cotización Mutual es requerida." })
  cotizacionMutual: number = 0.0;

  // Campo 99: Sucursal para pago Mutual (No Implementado)
  @IsInt()
  @IsOptional()
  campo99_condicional?: number = 0;

  // Campo 100: Renta Imponible Cesantía
  @IsInt({
    message: "Renta Imponible Cesantía debe ser un número entero.",
  })
  @IsNotEmpty({ message: "Renta Imponible Cesantía es requerida." })
  rentaImponibleCesantia: number = 0;

  // Campo 101: Aporte Trabajador Cesantía
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Aporte Trabajador Cesantía debe tener hasta 2 decimales." }
  )
  @IsOptional()
  aporteTrabajadorCesantia?: number = 0.0;

  // Campo 102: Aporte Empleador Cesantía
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Aporte Empleador Cesantía debe tener hasta 2 decimales." }
  )
  @IsOptional()
  aporteEmpleadorCesantia?: number = 0.0;

  // Campos 103 a 105 (Condicionales no implementados)
  @IsString()
  @Length(0, 1, {
    message: "Campo 103 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo103_condicional?: string = "0";

  @IsString()
  @Length(0, 1, {
    message: "Campo 104 no implementado no debe exceder 1 carácter.",
  })
  @IsOptional()
  campo104_condicional?: string = "";

  @IsString()
  @Length(0, 20, {
    message: "Campo 105 no implementado no debe exceder 20 caracteres.",
  })
  @IsOptional()
  campo105_condicional?: string = "";
}
