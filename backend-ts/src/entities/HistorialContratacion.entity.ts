import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { Trabajador } from "./Trabajador.entity.js";
  import { Negocio } from "./Negocio.entity.js";
  
  @Entity("historial_contratacion")
  export class HistorialContratacion {

    constructor() {
      this.fechaInicio = new Date();
      this.puesto = "";
      this.tipoContrato = "";
      this.sueldoImponible = 0;
      this.tasaSalud = 0;
      this.nombreEntidadSalud = "";
      this.tasaAfp = 0;
      this.nombreAfp = "";
      this.tasaCesantiaTrabajador = 0;
      this.tasaCesantiaEmpleador = 0;
    }

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      type: "date",
      nullable: false,
      comment: "Fecha de inicio de la relación laboral",
    })
    fechaInicio: Date;
  
    @Column({
      type: "date",
      nullable: true,
      comment: "Fecha de término de la relación laboral",
    })
    fechaTermino?: Date;
  
    @Column({
      type: "varchar",
      length: 100,
      nullable: false,
      comment: "Puesto del trabajador",
    })
    puesto: string;
  
    @Column({
      type: "varchar",
      length: 50,
      nullable: false,
      comment: "Tipo de contrato (Plazo fijo o indefinido)",
    })
    tipoContrato: string;
  
    @Column({
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
      comment: "Sueldo imponible del trabajador al momento de la contratación",
    })
    sueldoImponible: number;
  
    @Column({
      type: "decimal",
      precision: 5,
      scale: 2,
      nullable: false,
      comment: "Tasa de salud en el momento de la contratación",
    })
    tasaSalud: number;
  
    @Column({
      type: "varchar",
      length: 50,
      nullable: false,
      comment: "Nombre de la institución de salud (Fonasa/Isapre)",
    })
    nombreEntidadSalud: string;
  
    @Column({
      type: "decimal",
      precision: 5,
      scale: 2,
      nullable: false,
      comment: "Tasa de cotización obligatoria en el momento de la contratación",
    })
    tasaAfp: number;
  
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
      scale: 2,
      nullable: false,
      comment: "Tasa de cesantía del trabajador",
    })
    tasaCesantiaTrabajador: number;
  
    @Column({
      type: "decimal",
      precision: 5,
      scale: 2,
      nullable: false,
      comment: "Tasa de cesantía del empleador",
    })
    tasaCesantiaEmpleador: number;
  
    // Relaciones
  
    @ManyToOne(() => Trabajador, (trabajador) => trabajador.historialContrataciones, {
      onDelete: "CASCADE",
      nullable: false,
    })
    @JoinColumn({ name: "trabajador_id" })
    trabajador!: Trabajador;
  
    @ManyToOne(() => Negocio, (negocio) => negocio.historialContrataciones, {
      onDelete: "CASCADE",
      nullable: false,
    })
    @JoinColumn({ name: "negocio_id" })
    negocio!: Negocio;
  }
  