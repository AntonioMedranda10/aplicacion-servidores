import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Espacio } from "./Espacio";

@Entity("categoria_espacio")
export class CategoriaEspacio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", unique: true })
  nombre: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("boolean", { name: "requiere_aprobacion", default: () => "0" })
  requiereAprobacion: boolean;

  @Column("integer", { name: "tiempo_minimo_reserva" })
  tiempoMinimoReserva: number;

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

  @OneToMany(() => Espacio, (espacio) => espacio.categoria)
  espacios: Espacio[];
}
