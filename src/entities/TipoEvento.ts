import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reserva } from "./Reserva";

@Entity('tipo_evento')
export class TipoEvento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true }) // UK
    nombre: string;

    @Column('text')
    descripcion: string; // Propiedad 4+

    @Column({ default: false })
    requiere_aprobacion: boolean;

    @Column({ length: 7, default: '#000000' }) // Almacena un código de color HEX
    color_hex: string;

    // Relación One-to-Many con Reserva
    @OneToMany(() => Reserva, (reserva) => reserva.tipo_evento)
    reservas: Reserva[];

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}