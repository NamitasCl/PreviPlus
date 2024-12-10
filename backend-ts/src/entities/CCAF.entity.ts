import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Negocio } from "./Negocio.entity.js";

@Entity("ccaf")
export class CCAF {

  constructor() {
    this.nombre = "";
    this.codigoccaf = 0;
    this.tasaccaf = 0;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 50,
    nullable: true,
    comment: "Nombre de la CCAF",
  })
  nombre?: string;

  @Column({
    type: "int",
    nullable: false,
    unique: true,
    comment: "Código de la CCAF",
  })
  codigoccaf: number;

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: true,
    comment: "Tasa de pago de la CCAF",
  })
  tasaccaf?: number;

  // Relaciones

  @OneToMany(() => Negocio, (negocio) => negocio.ccaf)
  negocios!: Negocio[];
}