import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CaracteristicaEspacio } from "./CaracteristicaEspacio";
import { DisponibilidadEspacio } from "./DisponibilidadEspacio";
import { Notificacion } from "./Notificacion";
import { Reserva } from "./Reserva";
import { BloqueoEspacio } from "./BloqueoEspacio";
import { Ubicacion } from "./Ubicacion";
import { CategoriaEspacio } from "./CategoriaEspacio";

@Entity("espacio")
export class Espacio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "codigo", unique: true })
  codigo: string;

  @Column("varchar", { name: "nombre" })
  nombre: string;

  @Column("integer", { name: "capacidad_maxima" })
  capacidadMaxima: number;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("varchar", { name: "estado", length: 20, default: () => "'ACTIVO'" })
  estado: string;

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

  @OneToMany(
    () => CaracteristicaEspacio,
    (caracteristicaEspacio) => caracteristicaEspacio.espacio
  )
  caracteristicaEspacios: CaracteristicaEspacio[];

  @OneToMany(
    () => DisponibilidadEspacio,
    (disponibilidadEspacio) => disponibilidadEspacio.espacio
  )
  disponibilidadEspacios: DisponibilidadEspacio[];

  @OneToMany(() => Notificacion, (notificacion) => notificacion.espacio)
  notificacions: Notificacion[];

  @OneToMany(() => Reserva, (reserva) => reserva.espacio)
  reservas: Reserva[];

  @OneToMany(() => BloqueoEspacio, (bloqueoEspacio) => bloqueoEspacio.espacio)
  bloqueoEspacios: BloqueoEspacio[];

  @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.espacios)
  @JoinColumn([{ name: "ubicacion_id", referencedColumnName: "id" }])
  ubicacion: Ubicacion;

  @ManyToOne(
    () => CategoriaEspacio,
    (categoriaEspacio) => categoriaEspacio.espacios
  )
  @JoinColumn([{ name: "categoria_id", referencedColumnName: "id" }])
  categoria: CategoriaEspacio;
}
