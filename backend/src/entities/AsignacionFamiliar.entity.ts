import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Trabajador } from "./Trabajador.entity";

@Entity("asignacion_familiar_data")
export class AsignacionFamiliar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 1,
        nullable: false,
        comment: "Letra correspondiente al tramo de asignación familiar",
    })
    tramo: string;

    @Column({
        type: "int",
        nullable: false,
        comment: "Monto de pago de asignación familiar",
    })
    montoPago: number;

    @Column({
        type: "int",
        nullable: false,
        comment: "Renta tope para pago de asignación familiar",
    })
    rentaTope: number;

    // Relaciones
    @ManyToOne(() => Trabajador, trabajador => trabajador.asignacionFamiliar, {nullable: false})
    @JoinColumn({ name: "trabajador_id" })
    trabajador: Trabajador;
}
