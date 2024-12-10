import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Usuario } from "./Usuario.entity.js";
import { Mutualidad } from "./Mutualidad.entity.js";
import { CCAF } from "./CCAF.entity.js";
import { InformacionLaboral } from "./InformacionLaboral.entity.js";
import { ArchivosPreviredGenerado } from "./ArchivosPreviredGenerados.entity.js";
import { HistorialContratacion } from "./HistorialContratacion.entity.js";

const isTestEnv = process.env.NODE_ENV === "test";

@Entity("negocio")
export class Negocio {
  constructor(usuario: Usuario, mutualidad: Mutualidad, ccaf?: CCAF) {
    this.rut = "";
    this.negocioName = "";
    this.address = "";
    this.repLegal = "";
    this.rutRepLegal = "";
    this.dvRepLegal = "";
    this.isActive = true;
    this.tieneCcaf = false;
    this.tieneMutual = false;
    this.usuario = usuario;
    this.mutualidad = mutualidad;
    this.ccaf = ccaf || null;
    this.archivoPreviredGenerado = null;
    this.historialContrataciones = null;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  rut: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  negocioName: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  address?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  repLegal?: string;

  @Column({ type: "varchar", length: 11, nullable: true })
  rutRepLegal?: string;

  @Column({ type: "varchar", length: 1, nullable: true })
  dvRepLegal?: string;

  @Column({ type: "boolean", nullable: false })
  isActive: boolean | number;

  @Column({ type: "boolean", nullable: false, default: false })
  tieneCcaf: boolean;

  @Column({ type: "boolean", nullable: false, default: false })
  tieneMutual: boolean;

  // Relaciones

  @ManyToOne(() => Usuario, (usuario) => usuario.negocios)
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;

  @ManyToOne(() => Mutualidad, (mutualidad) => mutualidad.negocios)
  @JoinColumn({ name: "mutualidad_id" })
  mutualidad!: Mutualidad;

  @ManyToOne(() => CCAF, (ccaf) => ccaf.negocios, { nullable: true })
  @JoinColumn({ name: "ccaf_id" })
  ccaf: CCAF | null;

  @OneToMany(
    () => InformacionLaboral,
    (informacionLaboral) => informacionLaboral.negocio
  )
  informacionLaboral!: InformacionLaboral[];

  /**
   * Relación con la entidad ArchivosPreviredGenerado.
   * Un negocio puede generar múltiples archivos Previred.
   */
  @OneToMany(
    () => ArchivosPreviredGenerado,
    (archivoPrevired) => archivoPrevired.negocio
  )
  archivoPreviredGenerado: ArchivosPreviredGenerado[] | null;

  @OneToMany(
    () => HistorialContratacion,
    (historialContratacion) => historialContratacion.negocio,
    {
      onDelete: "CASCADE",
      cascade: true,
      eager: true,
    }
  )
  historialContrataciones: HistorialContratacion[] | null;
}
