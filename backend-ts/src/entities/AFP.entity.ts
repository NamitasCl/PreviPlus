import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Trabajador } from "./Trabajador.entity.js";

@Entity("afp")
export class AFP {
  constructor() {
    this.id = 0;
    this.codigoAfp = 0;
    this.nombreAfp = "";
    this.tasaCotizacion = 0;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
    nullable: false,
    unique: true,
    comment: "Código único de la AFP",
  })
  codigoAfp: number;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
    comment: "Nombre de la AFP",
  })
  nombreAfp: string;

  @Column({
    type: "decimal",
    precision: 5,
    scale: 4,
    nullable: false,
    comment: "Tasa de cotización obligatoria",
  })
  tasaCotizacion: number;

  // Relaciones

  @OneToMany(() => Trabajador, (trabajador) => trabajador.afp)
  trabajadores!: Trabajador[];
}
