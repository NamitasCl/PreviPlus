import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Negocio } from "./Negocio.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("usuario")
export class Usuario {
   
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", unique: true, nullable: true })
  uuid: string;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar", nullable: false })
  firstlastname: string;

  @Column({ type: "varchar", nullable: true })
  secondlastname?: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  username: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "boolean", nullable: false, default: false })
  isMembershipActive: boolean;

  @Column({ type: "varchar", nullable: true, default: "usuario" })
  rol: string;

  @Column({ type: "boolean", nullable: false, default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: "date",
    nullable: true,
    default: () => "CURRENT_DATE",
  })
  createdAt: Date;

  @Column({ type: "date", nullable: true, default: null })
  lastLogin: Date;

  @Column({ type: "varchar", nullable: true, default: null })
  flowCustomerId: string;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  // Relaciones
  @OneToMany(() => Negocio, negocio => negocio.id)
  negocios: Negocio[];

}
