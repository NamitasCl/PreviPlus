import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Negocio } from "./Negocio.entity";
//import { Negocio } from "./Negocio.entity";

@Entity("archivo_previred_generado")
export class ArchivosPreviredGenerado {

  @PrimaryGeneratedColumn()
  id: number;

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
  @ManyToOne(() => Negocio, negocio => negocio.archivosPreviredGenerado)
  @JoinColumn({ name: "negocio_id" })
  negocio: Negocio;

  
}