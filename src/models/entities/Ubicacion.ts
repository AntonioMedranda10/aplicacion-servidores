import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Espacio } from "./Espacio";

@Entity("ubicacion")
export class Ubicacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre_edificio" })
  nombreEdificio: string;

  @Column("varchar", { name: "codigo_edificio", unique: true })
  codigoEdificio: string;

  @Column("varchar", { name: "piso", nullable: true })
  piso: string | null;

  @Column("varchar", { name: "numero_aula", nullable: true })
  numeroAula: string | null;

  @Column("text", { name: "sector", nullable: true })
  sector: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Espacio, (espacio) => espacio.ubicacion)
  espacios: Espacio[];
}
