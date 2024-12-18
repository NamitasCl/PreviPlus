import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Trabajador } from "./Trabajador.entity";
import { Negocio } from "./Negocio.entity";
//import { Trabajador, Negocio } from "./index";

@Entity("informacion_laboral")
export class InformacionLaboral {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
    comment: "Puesto de trabajo",
  })
  puesto: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
    comment: "Departamento de trabajo",
  })
  departamento: string;

  @Column({
    type: "date",
    nullable: true,
    comment: "Fecha de inicio de labores",
  })
  fechaInicioLabores: Date;

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
  tipopago: number;

  @Column({
    type: "varchar",
    length: 3,
    nullable: false,
    comment: "AFP, SIP, INP",
  })
  regimenPrevisional: string;

  @Column({
    type: "int",
    nullable: true,
    comment: "Monto adicional si el plan excede el 7%",
  })
  adicionalSalud?: number;

  @Column({
    type: "decimal",
    precision: 4,
    scale: 4,
    nullable: true,
    default: 0.006,
    comment: "Tasa de cesantía del trabajador",
  })
  tasaTrabajadorCesantia: number;

  @Column({
    type: "decimal",
    precision: 4,
    scale: 4,
    nullable: true,
    comment: "Tasa de cesantía del empleador",
  })
  tasaEmpleadorCesantia?: number;

  @Column({ type: "int", nullable: true })
  sueldoImponible: number;

  @Column({
    type: "int",
    nullable: true,
  })
  valorColacion: number;

  @Column({
    type: "int",
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

  // Relaciones
  @ManyToOne(() => Trabajador, trabajador => trabajador.informacionLaboral)
  @JoinColumn({ name: "trabajador_id" })
  trabajador: Trabajador;

  @ManyToOne(() => Negocio, negocio => negocio.informacionLaboral)
  @JoinColumn({ name: "negocio_id" })
  negocio: Negocio;
 
}
