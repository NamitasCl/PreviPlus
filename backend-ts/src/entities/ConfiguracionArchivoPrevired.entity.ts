import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Trabajador } from "./Trabajador.entity.js";

@Entity("configuracion_archivo_previred")
export class ConfiguracionArchivoPrevired {
  constructor() {
    this.ufcalculos = 0;
    this.tasasis = 0.015;
    this.diastrabajoMes = 30;
    this.codigomovpersonal = 0;
    this.tipolinea = 0;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
    comment:
      "00: Principal o base, 01: Linea adicional, 02: Segundo contrato, 03: Movimiento personal afiliado voluntario",
  })
  tipolinea: number;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
    comment: "Ver tabla 7 archivo previred",
  })
  codigomovpersonal: number;

  @Column({
    type: "int",
    nullable: false,
    default: 30,
    comment: "Días de trabajo en el mes",
  })
  diastrabajoMes: number;

  @Column({
    type: "decimal",
    precision: 5,
    scale: 4,
    nullable: false,
    default: 0.015,
    comment: "Tasa de seguro de invalidez y sobrevivencia (SIS)",
  })
  tasasis: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
    comment: "UF para cálculo de cotizaciones",
  })
  ufcalculos: number;

  @ManyToOne(
    () => Trabajador,
    (trabajador) => trabajador.configuracionArchivoPrevired,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "trabajador_id" })
  trabajador!: Trabajador;
}
