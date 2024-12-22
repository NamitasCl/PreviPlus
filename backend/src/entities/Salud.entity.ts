import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("salud")
export class Salud {

  @PrimaryGeneratedColumn()
  id: number;

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
  tasaSaludCcaf: number;

  @Column({
    type: "decimal",
    precision: 5,
    scale: 5,
    nullable: true,
    comment: "Cotización pactada con la Isapre",
  })
  cotizacionPactada: number;

  @Column({
    type: "int", 
    nullable: true,
    comment: "Tipo de moneda del plan pactado: 1: CLP o 2: UF",
  })
  tipoMoneda: number;

  @Column({
    comment: "Código de contrato con la isapre",
    nullable: true,
    type: "varchar",
    length: 10,
  })
  codigoFun: string;

  // Relaciones


}
