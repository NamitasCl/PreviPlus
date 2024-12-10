import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Trabajador } from "./Trabajador.entity.js";

@Entity("salud")
export class Salud {
  constructor() {
    this.codigoSalud = 0;
    this.nombreEntidadSalud = "";
    this.tasaSalud = 0.07;
    this.tasaSaludCcaf = 0;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
    nullable: false,
    unique: true,
    comment: "Código de Fonasa o Isapre",
  })
  codigoSalud: number;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
    comment: "Nombre de Fonasa o Isapre",
  })
  nombreEntidadSalud: string;

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: true,
    default: 0.07,
    comment: "7%",
  })
  tasaSalud: number;

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: true,
    default: 0.016,
    comment: "Porcentaje de Fonasa cuando hay CCAF",
  })
  tasaSaludCcaf?: number;

  // Relaciones

  @OneToMany(() => Trabajador, (trabajador) => trabajador.salud)
  trabajadores!: Trabajador[];
}
