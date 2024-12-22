import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("mutualidad")
export class Mutualidad {

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


}
