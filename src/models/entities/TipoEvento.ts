import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "./Reserva";

@Entity("tipo_evento")
export class TipoEvento {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", unique: true })
  nombre: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("boolean", { name: "requiere_aprobacion", default: () => "0" })
  requiereAprobacion: boolean;

  @Column("varchar", {
    name: "color_hex",
    length: 7,
    default: () => "'#000000'",
  })
  colorHex: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Reserva, (reserva) => reserva.tipoEvento)
  reservas: Reserva[];
}
