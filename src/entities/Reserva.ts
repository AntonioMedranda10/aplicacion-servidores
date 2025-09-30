import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Usuario } from "./Usuario";
import { Espacio } from "./Espacio";
import { TipoEvento } from "./TipoEvento";
import { EstadoReserva } from "./EstadoReserva";
import { Notificacion } from "./Notificacion";

@Entity('reserva')
export class Reserva {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true }) // UK (código de reserva generado)
    codigo: string;

    @Column('date')
    fecha: Date; // Propiedad 4+

    @Column('time')
    hora_inicio: string; // Uso de string para TIME

    @Column('time')
    hora_fin: string;

    @Column()
    titulo: string;

    // --- RELACIONES (Foreign Keys) ---

    // Many-to-One con Usuario (Creador/Reservador)
    @ManyToOne(() => Usuario, (usuario) => usuario.reservas)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column()
    usuario_id: number; // Campo FK

    // Many-to-One con Espacio
    @ManyToOne(() => Espacio, (espacio) => espacio.reservas)
    @JoinColumn({ name: 'espacio_id' })
    espacio: Espacio;

    @Column()
    espacio_id: number; // Campo FK

    // Many-to-One con TipoEvento
    @ManyToOne(() => TipoEvento, (tipo_evento) => tipo_evento.reservas)
    @JoinColumn({ name: 'tipo_evento_id' })
    tipo_evento: TipoEvento;

    @Column()
    tipo_evento_id: number; // Campo FK

    // Many-to-One con EstadoReserva
    @ManyToOne(() => EstadoReserva, (estado) => estado.reservas)
    @JoinColumn({ name: 'estado_id' })
    estado: EstadoReserva;

    @Column()
    estado_id: number; // Campo FK

    // --- Otros Campos de Negocio ---
    @Column('text', { nullable: true })
    descripcion: string;

    @Column({ default: 0 })
    num_asistentes: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => Notificacion, (notificacion) => notificacion.reserva)
    notificaciones: Notificacion[]; // Relación con Notificaciones

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}