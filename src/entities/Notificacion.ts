import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Reserva } from "./Reserva";
import { Espacio } from "./Espacio";

@Entity('notificacion')
export class Notificacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20 })
    tipo: string; // Sustituido enum por varchar por compatibilidad SQLite

    @Column()
    titulo: string; // Propiedad 4+

    @Column('text')
    mensaje: string;

    @Column({ default: false })
    leida: boolean;

    // --- RELACIONES (Foreign Keys) ---

    // Many-to-One con Usuario (Receptor)
    @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @Column()
    usuario_id: number; // Campo FK

    // Relación opcional con Reserva
    @ManyToOne(() => Reserva, { nullable: true })
    @JoinColumn({ name: 'reserva_id' })
    reserva: Reserva;

    @Column({ nullable: true })
    reserva_id: number; // Campo FK opcional

    // Relación opcional con Espacio
    @ManyToOne(() => Espacio, { nullable: true })
    @JoinColumn({ name: 'espacio_id' })
    espacio: Espacio;

    @Column({ nullable: true })
    espacio_id: number; // Campo FK opcional
    
    // Trazabilidad y Metadata
    @Column({ type: 'json', nullable: true })
    metadata: object;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', nullable: true })
    leida_at: Date;
}