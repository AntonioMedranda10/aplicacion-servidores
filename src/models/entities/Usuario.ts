import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notificacion } from "./Notificacion";
import { Reserva } from "./Reserva";
import { TipoUsuario } from "./TipoUsuario";
import { BloqueoEspacio } from "./BloqueoEspacio";

@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "email", unique: true })
  email: string;

  @Column("varchar", { name: "password_hash" })
  passwordHash: string;

  @Column("varchar", { name: "nombre" })
  nombre: string;

  @Column("varchar", { name: "apellido" })
  apellido: string;

  @Column("varchar", {
    name: "estado",
    length: 20,
    default: () => "'PENDIENTE'",
  })
  estado: string;

  @Column("varchar", { name: "telefono", nullable: true })
  telefono: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "ultimo_login", nullable: true })
  ultimoLogin: Date | null;

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  notificacions: Notificacion[];

  @OneToMany(() => Reserva, (reserva) => reserva.usuario)
  reservas: Reserva[];

  @ManyToOne(() => TipoUsuario, (tipoUsuario) => tipoUsuario.usuarios)
  @JoinColumn([{ name: "tipo_usuario_id", referencedColumnName: "id" }])
  tipoUsuario: TipoUsuario;

  @OneToMany(
    () => BloqueoEspacio,
    (bloqueoEspacio) => bloqueoEspacio.bloqueadoPorUsuario
  )
  bloqueoEspacios: BloqueoEspacio[];
}
