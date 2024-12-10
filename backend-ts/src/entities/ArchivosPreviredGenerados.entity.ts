import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Negocio } from "./Negocio.entity.js";

@Entity("archivo_previred_generado")
export class ArchivosPreviredGenerado {
  /**
   * Constructor para inicializar valores predeterminados.
   */
  constructor(negocio: Negocio) {
    this.negocio = negocio;
    this.archivo = "";
    this.fecha = new Date();
    this.mes = 0;
    this.anio = 0;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Contenido completo del archivo en formato texto plano.
   * Cada campo está separado por punto y coma (;).
   */
  @Column({
    type: "text",
    nullable: false,
    comment: "Contenido del archivo completo (105 campos separados por ';')",
  })
  archivo: string;

  /**
   * Fecha en la que se generó el archivo.
   */
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    comment: "Fecha de generación del archivo",
  })
  fecha: Date;

  /**
   * Mes correspondiente al archivo generado.
   * Se espera un valor entre 1 y 12.
   */
  @Column({
    type: "int",
    nullable: false,
    comment: "Mes correspondiente al archivo generado (1-12)",
  })
  mes: number;

  /**
   * Año correspondiente al archivo generado.
   */
  @Column({
    type: "int",
    nullable: false,
    comment: "Año correspondiente al archivo generado",
  })
  anio: number;

  // Relaciones

  /**
   * Relación con la entidad `Negocio`.
   * Cada archivo está asociado a un único negocio.
   */
  @ManyToOne(() => Negocio, (negocio) => negocio.archivoPreviredGenerado, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "negocio_id" })
  negocio: Negocio;
}