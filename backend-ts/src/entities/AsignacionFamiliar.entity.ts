import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("asignacion_familiar_data")
export class AsignacionFamiliar {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        length: 1,
        nullable: false,
        comment: "Letra correspondiente al tramo de asignación familiar",
    })
    tramo!: string;

    @Column({
        type: "int",
        nullable: false,
        comment: "Monto de pago de asignación familiar",
    })
    montoPago!: number;

    @Column({
        type: "int",
        nullable: false,
        comment: "Renta tope para pago de asignación familiar",
    })
    rentaTope!: number;
}
