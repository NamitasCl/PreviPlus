import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("conceptos_remuneracion")
export class ConceptoRemuneracion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        unique: true,
        comment: "Nombre del concepto de remuneración",
    })
    nombre!: string;

    @Column({
        type: "text",
        nullable: true,
        comment: "Descripción del concepto",
    })
    descripcion?: string;

    @Column({
        type: "boolean",
        nullable: false,
        default: false,
        comment: "Tipo de concepto (e.g., imponible, no imponible, habitual, no habitual)",
    })
    isImponible!: boolean;

}
