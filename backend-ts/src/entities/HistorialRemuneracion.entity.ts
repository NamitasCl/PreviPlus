import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { Trabajador } from "./Trabajador.entity.js";
  import { Negocio } from "./Negocio.entity.js";
  
  @Entity("historial_remuneracion")
  export class HistorialRemuneracion {

    constructor() {
      this.diasTrabajados = 0;
      this.mesRemuneracion = "";
      this.sueldoImponible = 0;
    }

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Días trabajados en el mes",
    })
    diasTrabajados?: number;
  
    @Column({
      type: process.env.NODE_ENV === "test" ? "varchar" : "char",
      length: 6,
      nullable: false,
      comment: "Formato: mmaaaa",
    })
    mesRemuneracion: string;
  
    @Column({
      type: "int",
      nullable: false,
      comment:
        "Sueldo imponible del trabajador, aquí se suma todo el sueldo que sea imponible",
    })
    sueldoImponible: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Monto cotización obligatoria AFP",
    })
    cotizacionObligatoriaAFP?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Monto cotización SIS",
    })
    cotizacionSIS?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Monto cotización Fonasa",
    })
    cotizacionFonasa?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Monto cotización Isapre (7%)",
    })
    cotizacionIsapre?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Monto adicional Isapre (sobre 7%)",
    })
    cotizacionAdicionalIsapre?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Monto cotización ISL",
    })
    cotizacionISL?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Monto cotización mutualidad",
    })
    cotizacionMutual?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Aporte del trabajador al seguro de cesantía",
    })
    aporteTrabajadorCesantia?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Aporte del empleador al seguro de cesantía",
    })
    aporteEmpleadorCesantia?: number;
  
    // Campos de CCAF
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Créditos personales CCAF",
    })
    creditosPersonalesCcaf?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Descuento dental CCAF",
    })
    descuentoDentalCcaf?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Descuento leasing CCAF",
    })
    descuentoLeasingCcaf?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Descuento seguro de vida CCAF",
    })
    descuentoSeguroVidaCcaf?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Otros descuentos CCAF",
    })
    otrosDescuentosCcaf?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Cotización CCAF no Isapre",
    })
    cotizacionCcafNoIsapre?: number;
  
    @Column({
      type: "int",
      nullable: true,
      comment: "Descuento cargas familiares CCAF",
    })
    descuentoCargasFamiliaresCcaf?: number;
  
    // Relaciones
  
    @JoinColumn({ name: "trabajador_id" })
    trabajador!: Trabajador;
  
    @ManyToOne(() => Negocio, (negocio) => negocio.historialRemuneraciones, {
      nullable: false,
    })
    @JoinColumn({ name: "negocio_id" })
    negocio!: Negocio;
  }
  