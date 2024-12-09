import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Negocio } from "./Negocio.entity";

@Entity("mutualidad")
export class Mutualidad {

  constructor() {
    this.codigomutual = 0;
    this.nombre = "";
    this.tasamutual = 0;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
    nullable: false,
    unique: true,
    comment: "Código de la mutualidad",
  })
  codigomutual: number;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
    comment: "Nombre de la mutualidad",
  })
  nombre: string;

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: true,
    comment: "Tasa de cotización de la mutualidad",
  })
  tasamutual: number;

  // Relaciones

  @OneToMany(() => Negocio, (negocio) => negocio.mutualidad)
  negocios!: Negocio[];
}
