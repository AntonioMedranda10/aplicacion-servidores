import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Espacio } from "./Espacio";
import { Reserva } from "./Reserva";
import { Usuario } from "./Usuario";

@Entity("notificacion")
export class Notificacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "tipo", length: 20 })
  tipo: string;

  @Column("varchar", { name: "titulo" })
  titulo: string;

  @Column("text", { name: "mensaje" })
  mensaje: string;

  @Column("boolean", { name: "leida", default: () => "0" })
  leida: boolean;

  @Column("json", { name: "metadata", nullable: true })
  metadata: NonNullable<unknown> | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "leida_at", nullable: true })
  leidaAt: Date | null;

  @ManyToOne(() => Espacio, (espacio) => espacio.notificacions)
  @JoinColumn([{ name: "espacio_id", referencedColumnName: "id" }])
  espacio: Espacio;

  @ManyToOne(() => Reserva, (reserva) => reserva.notificacions)
  @JoinColumn([{ name: "reserva_id", referencedColumnName: "id" }])
  reserva: Reserva;

  @ManyToOne(() => Usuario, (usuario) => usuario.notificacions)
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuario;
}
