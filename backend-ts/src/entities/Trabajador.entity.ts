import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

 import { Salud } from "./Salud.entity.js";
 import { AFP } from "./AFP.entity.js";
 import { InformacionLaboral } from "./InformacionLaboral.entity.js";
 import { HistorialContratacion } from "./HistorialContratacion.entity.js";
 import { ConfiguracionArchivoPrevired } from "./ConfiguracionArchivoPrevired.entity.js";

@Entity("trabajador")
export class Trabajador {
  constructor() {
    this.rut = "";
    this.dv = "";
    this.patlastname = "";
    this.matlastname = "";
    this.names = "";
    this.genero = "";
    this.nationality = 0;
    this.configuracionArchivoPrevired = null;
    this.historialContrataciones = null;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  rut: string;

  @Column({ type: "varchar", length: 1, nullable: false })
  dv: string;

  @Column({ type: "varchar", nullable: false })
  patlastname: string;

  @Column({ type: "varchar", nullable: true })
  matlastname?: string;

  @Column({ type: "varchar", nullable: false })
  names: string;

  @Column({ type: "varchar", length: 10, nullable: false })
  genero: string;

  @Column({ type: "int", nullable: false })
  nationality: number;

  // Relaciones

  @ManyToOne(() => Salud, (salud) => salud.trabajadores, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "salud_id" })
  salud!: Salud;

  @ManyToOne(() => AFP, (afp) => afp.trabajadores, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "afp_id" })
  afp!: AFP;

  @OneToMany(
    () => InformacionLaboral,
    (informacionLaboral) => informacionLaboral.trabajador,
    {
      cascade: true,
      eager: false,
    }
  )
  informacionLaboral!: InformacionLaboral[];

  @OneToMany(
    () => ConfiguracionArchivoPrevired,
    (configuracionArchivoPrevired) => configuracionArchivoPrevired.trabajador,
    { cascade: true }
  )
  configuracionArchivoPrevired?: ConfiguracionArchivoPrevired[] | null;

  @OneToMany(
    () => HistorialContratacion,
    (historialContratacion) => historialContratacion.trabajador,
    {
      onDelete: "CASCADE",
      cascade: true,
      eager: true,
    }
  )
  historialContrataciones?: HistorialContratacion[] | null;
}
