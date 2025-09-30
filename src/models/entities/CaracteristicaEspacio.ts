import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Espacio } from "./Espacio";

@Entity("caracteristica_espacio")
export class CaracteristicaEspacio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre" })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("boolean", { name: "disponible", default: () => "1" })
  disponible: boolean;

  @Column("integer", { name: "prioridad_orden", default: () => "1" })
  prioridadOrden: number;

  @ManyToOne(() => Espacio, (espacio) => espacio.caracteristicaEspacios)
  @JoinColumn([{ name: "espacio_id", referencedColumnName: "id" }])
  espacio: Espacio;
}
