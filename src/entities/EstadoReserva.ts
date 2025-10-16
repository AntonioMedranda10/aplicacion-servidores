import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reserva } from "./Reserva";

@Entity('estado_reserva')
export class EstadoReserva {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true }) // UK
    nombre: string;

    @Column('text')
    descripcion: string; // Propiedad 4+

    @Column({ length: 7, default: '#CCCCCC' })
    color_hex: string;

    @Column({ default: false })
    permite_edicion: boolean;

    @Column({ default: false })
    es_final: boolean;

    @Column('int')
    orden: number; // Para ordenar la visualización

    // Relación One-to-Many con Reserva
    @OneToMany(() => Reserva, (reserva) => reserva.estado)
    reservas: Reserva[];
}