import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Espacio } from "./Espacio";

@Entity("disponibilidad_espacio")
export class DisponibilidadEspacio {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "dia_semana" })
  diaSemana: number;

  @Column("time", { name: "hora_inicio" })
  horaInicio: NonNullable<unknown>;

  @Column("time", { name: "hora_fin" })
  horaFin: NonNullable<unknown>;

  @Column("boolean", { name: "activo", default: () => "1" })
  activo: boolean;

  @ManyToOne(() => Espacio, (espacio) => espacio.disponibilidadEspacios)
  @JoinColumn([{ name: "espacio_id", referencedColumnName: "id" }])
  espacio: Espacio;
}
