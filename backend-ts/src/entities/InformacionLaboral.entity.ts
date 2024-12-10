import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Trabajador } from "./Trabajador.entity.js";
import { Negocio } from "./Negocio.entity.js";

@Entity("informacion_laboral")
export class InformacionLaboral {
  constructor() {
    this.tipoContrato = "";
    this.tipoTrabajador = 0;
    this.tipopago = 1;
    this.regimenPrevisional = "";
    this.institucionAfp = "";
    this.tipoSalud = "";
    this.isContratoActivo = false;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
    comment: "Puesto de trabajo",
  })
  puesto?: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
    comment: "Departamento de trabajo",
  })
  departamento?: string;

  @Column({
    type: "date",
    nullable: true,
    comment: "Fecha de inicio de labores",
  })
  fechaInicioLabores?: Date;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
    comment: "Tipo de contrato: plazo fijo o indefinido",
  })
  tipoContrato: string;

  @Column({
    type: "int",
    nullable: false,
    comment:
      "0: Activo (No pensionado), 1: Pensionado y cotiza, 2: Pensionado y no cotiza, 3: Activo > 65 años (nunca pensionado)",
  })
  tipoTrabajador: number;

  @Column({
    type: "int",
    nullable: true,
    comment:
      "01: Remuneracion mes, 02: Gratificación, 03: Bono modernizacion estado",
  })
  tipopago?: number;

  @Column({
    type: "varchar",
    length: 3,
    nullable: false,
    comment: "AFP, SIP, INP",
  })
  regimenPrevisional: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
    comment: "Nombre de la AFP",
  })
  institucionAfp?: string;

  @Column({
    type: "int",
    nullable: true,
    comment: "Código de la AFP",
  })
  codigoAfp?: number;

  @Column({
    type: "varchar",
    nullable: false,
    comment: "FONASA, ISAPRE",
  })
  tipoSalud: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
    comment: "Nombre de la institucion de salud",
  })
  institucionSalud?: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 4,
    nullable: true,
    comment: "Monto del plan pactado con la Isapre (en UF o CLP)",
  })
  cotizacionPactada?: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    comment: "Monto adicional si el plan excede el 7%",
  })
  adicionalSalud?: number;

  @Column({
    type: "int",
    nullable: true,
    comment: "Tipo de moneda del plan pactado: 1: CLP o 2: UF",
  })
  tipoMoneda?: number;

  @Column({
    type: "varchar",
    length: 16,
    nullable: true,
    comment: "Número de contrato (FUN) en Isapre",
  })
  numeroFun?: string;

  @Column({
    type: "decimal",
    precision: 8,
    scale: 4,
    nullable: true,
    default: 0.6,
    comment: "Tasa de cesantía del trabajador",
  })
  tasaTrabajadorCesantia?: number;

  @Column({
    type: "decimal",
    precision: 8,
    scale: 4,
    nullable: true,
    comment: "Tasa de cesantía del empleador",
  })
  tasaEmpleadorCesantia?: number;

  @Column({ type: "int", nullable: true })
  sueldoImponible?: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  valorColacion?: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  valorMovilizacion?: number;

  @Column({
    type: "boolean",
    nullable: true,
  })
  haveAsignacionFamiliar?: boolean;

  @Column({
    type: "varchar",
    length: 1,
    nullable: true,
  })
  tramoAsignacionFamiliar?: string;

  @Column({
    type: "varchar",
    length: 10,
    nullable: true,
  })
  resolucionAsignacionFamiliar?: string;

  @Column({
    type: "boolean",
    nullable: true,
  })
  isTiempoCompleto?: boolean;

  @Column({
    type: "boolean",
    nullable: true,
  })
  isPensionado?: boolean;

  @Column({
    type: "boolean",
    nullable: false,
  })
  isContratoActivo: boolean;

  // Relaciones

  @ManyToOne(() => Trabajador, (trabajador) => trabajador.informacionLaboral, {
    nullable: false,
  })
  @JoinColumn({ name: "trabajador_id" })
  trabajador!: Trabajador;

  @ManyToOne(() => Negocio, (negocio) => negocio.informacionLaboral, {
    nullable: false,
  })
  @JoinColumn({ name: "negocio_id" })
  negocio!: Negocio;
}
