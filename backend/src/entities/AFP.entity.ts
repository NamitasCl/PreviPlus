import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("afp")
export class AFP {
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

  
}
