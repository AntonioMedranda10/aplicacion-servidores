import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Espacio } from "./Espacio";

@Entity("bloqueo_espacio")
export class BloqueoEspacio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("datetime", { name: "fecha_inicio" })
  fechaInicio: Date;

  @Column("datetime", { name: "fecha_fin" })
  fechaFin: Date;

  @Column("text", { name: "motivo" })
  motivo: string;

  @Column("varchar", { name: "tipo_bloqueo", length: 30 })
  tipoBloqueo: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.bloqueoEspacios)
  @JoinColumn([
    { name: "bloqueado_por_usuario_id", referencedColumnName: "id" },
  ])
  bloqueadoPorUsuario: Usuario;

  @ManyToOne(() => Espacio, (espacio) => espacio.bloqueoEspacios)
  @JoinColumn([{ name: "espacio_id", referencedColumnName: "id" }])
  espacio: Espacio;
}
