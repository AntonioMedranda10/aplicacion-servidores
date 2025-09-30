import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { TipoUsuario } from "./TipoUsuario";
import { Reserva } from "./Reserva";
import { Notificacion } from "./Notificacion";
import { BloqueoEspacio } from "./BloqueoEspacio";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string; 

    @Column()
    nombre: string; 

    @Column()
    apellido: string;

    @Column({ type: 'varchar', length: 20, default: 'PENDIENTE' })
    estado: string; // Sustituido enum por varchar por compatibilidad SQLite

    // --- RELACIONES (Foreign Keys) ---

    // Many-to-One con TipoUsuario
    @ManyToOne(() => TipoUsuario, (tipo) => tipo.usuarios)
    @JoinColumn({ name: 'tipo_usuario_id' })
    tipo_usuario: TipoUsuario;

    @Column()
    tipo_usuario_id: number; 

    // --- RELACIONES (One-to-Many) ---
    
    @OneToMany(() => Reserva, (reserva) => reserva.usuario)
    reservas: Reserva[];

    @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
    notificaciones: Notificacion[];

    @OneToMany(() => BloqueoEspacio, (bloqueo) => bloqueo.bloqueado_por)
    bloqueos_realizados: BloqueoEspacio[];

    @Column({ nullable: true })
    telefono: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'datetime', nullable: true })
    ultimo_login: Date;
}