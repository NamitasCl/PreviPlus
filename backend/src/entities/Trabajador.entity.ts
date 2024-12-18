import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { AFP } from "./AFP.entity";
import { Salud } from "./Salud.entity";
import { InformacionLaboral } from "./InformacionLaboral.entity";
import { AsignacionFamiliar } from "./AsignacionFamiliar.entity";


@Entity("trabajador")
export class Trabajador {

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

  @Column({ type: "varchar", length: 1, nullable: false })
  genero: string;

  @Column({ type: "boolean", nullable: false, comment: "Si es false significa que es Chileno, si es true significa que es extranjero" })
  isExtranjero: boolean;

  @Column({ type: "varchar", nullable: false })
  nationality: string;

  // Relaciones
  @ManyToOne(() => AFP)
  @JoinColumn({ name: "codigo_afp" })
  afp: AFP;

  @ManyToOne(() => Salud)
  @JoinColumn({ name: "codigo_salud" })
  salud: Salud;

  @OneToMany(() => InformacionLaboral, infoLaboral => infoLaboral.trabajador, {cascade: true})
  informacionLaboral: InformacionLaboral[];

  @OneToMany(() => AsignacionFamiliar, asignacionFamiliar => asignacionFamiliar.id, {
    cascade: true,
  })
  asignacionFamiliar: AsignacionFamiliar[];

}
