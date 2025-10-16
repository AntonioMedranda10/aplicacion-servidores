import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";

@Entity('tipo_usuario')
export class TipoUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true }) // UK
    nombre: string;

    @Column('text')
    descripcion: string; // Propiedad 4+

    @Column('int')
    nivel_prioridad: number;

    @Column({ type: 'json', nullable: true }) // Para almacenar permisos JSON
    permisos: object;

    // Relación One-to-Many con Usuario
    @OneToMany(() => Usuario, (usuario) => usuario.tipo_usuario)
    usuarios: Usuario[];

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}