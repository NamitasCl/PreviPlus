import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { InformacionLaboral } from "./InformacionLaboral.entity";
import { Mutualidad } from "./Mutualidad.entity";
import { CCAF } from "./CCAF.entity";
import { ArchivosPreviredGenerado } from "./ArchivosPreviredGenerados.entity";
import { Usuario } from "./Usuario.entity";

@Entity("negocio")
export class Negocio {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  rut: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  negocioName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  address: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  repLegal: string;

  @Column({ type: "varchar", length: 11, nullable: true })
  rutRepLegal: string;

  @Column({ type: "varchar", length: 1, nullable: true })
  dvRepLegal: string;

  @Column({ type: "boolean", nullable: false })
  isActive: boolean | number;

  @Column({ type: "boolean", nullable: false, default: false })
  tieneCcaf: boolean;

  @Column({ type: "boolean", nullable: false, default: false })
  tieneMutual: boolean;

  // Relaciones

  @OneToMany(() => InformacionLaboral, informacionLaboral => informacionLaboral.negocio)
  informacionLaboral: InformacionLaboral[];

  @ManyToOne(() => Mutualidad, mutualidad => mutualidad.id)
  @JoinColumn({ name: "mutualidad_id" })
  mutualidad: Mutualidad;

  @ManyToOne(() => CCAF, ccaf => ccaf.id, { nullable: true })
  @JoinColumn({ name: "ccaf_id" })
  ccaf: CCAF | null;

  @OneToMany(() => ArchivosPreviredGenerado, archivosPreviredGenerado => archivosPreviredGenerado.negocio)
  archivosPreviredGenerado: ArchivosPreviredGenerado[];

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;
}
