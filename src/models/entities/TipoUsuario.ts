import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("tipo_usuario")
export class TipoUsuario {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", unique: true })
  nombre: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("integer", { name: "nivel_prioridad" })
  nivelPrioridad: number;

  @Column("json", { name: "permisos", nullable: true })
  permisos: NonNullable<unknown> | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Usuario, (usuario) => usuario.tipoUsuario)
  usuarios: Usuario[];
}
