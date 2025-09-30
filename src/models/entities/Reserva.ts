import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Notificacion } from "./Notificacion";
import { EstadoReserva } from "./EstadoReserva";
import { TipoEvento } from "./TipoEvento";
import { Espacio } from "./Espacio";
import { Usuario } from "./Usuario";

@Entity("reserva")
export class Reserva {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "codigo", unique: true })
  codigo: string;

  @Column("date", { name: "fecha" })
  fecha: string;

  @Column("time", { name: "hora_inicio" })
  horaInicio: NonNullable<unknown>;

  @Column("time", { name: "hora_fin" })
  horaFin: NonNullable<unknown>;

  @Column("varchar", { name: "titulo" })
  titulo: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("integer", { name: "num_asistentes", default: () => "0" })
  numAsistentes: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Notificacion, (notificacion) => notificacion.reserva)
  notificacions: Notificacion[];

  @ManyToOne(() => EstadoReserva, (estadoReserva) => estadoReserva.reservas)
  @JoinColumn([{ name: "estado_id", referencedColumnName: "id" }])
  estado: EstadoReserva;

  @ManyToOne(() => TipoEvento, (tipoEvento) => tipoEvento.reservas)
  @JoinColumn([{ name: "tipo_evento_id", referencedColumnName: "id" }])
  tipoEvento: TipoEvento;

  @ManyToOne(() => Espacio, (espacio) => espacio.reservas)
  @JoinColumn([{ name: "espacio_id", referencedColumnName: "id" }])
  espacio: Espacio;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas)
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Usuario;
}
