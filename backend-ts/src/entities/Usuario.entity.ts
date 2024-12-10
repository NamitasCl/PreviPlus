import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Negocio } from "./Negocio.entity.js";

@Entity("usuario")
export class Usuario {
  constructor() {
    this.name = "";
    this.firstlastname = "";
    this.secondlastname = "";
    this.username = "";
    this.email = "";
    this.password = "";
    this.rol = "usuario";
    this.isMembershipActive = false;
    this.isActive = true;
    this.createdAt = new Date();
    this.lastLogin = new Date();
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", default: () => "uuid_generate_v4()" })
  useruuid!: string;

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
  flowCustomerId?: string;

  // Relaciones

  @OneToMany(() => Negocio, (negocio) => negocio.usuario)
  negocios!: Negocio[];
}
