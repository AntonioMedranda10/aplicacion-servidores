import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "./Reserva";

@Entity("estado_reserva")
export class EstadoReserva {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", unique: true })
  nombre: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("varchar", {
    name: "color_hex",
    length: 7,
    default: () => "'#CCCCCC'",
  })
  colorHex: string;

  @Column("boolean", { name: "permite_edicion", default: () => "0" })
  permiteEdicion: boolean;

  @Column("boolean", { name: "es_final", default: () => "0" })
  esFinal: boolean;

  @Column("integer", { name: "orden" })
  orden: number;

  @OneToMany(() => Reserva, (reserva) => reserva.estado)
  reservas: Reserva[];
}
