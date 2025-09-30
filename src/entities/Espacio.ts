import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CategoriaEspacio } from "./CategoriaEspacio";
import { Ubicacion } from "./Ubicacion";
import { CaracteristicaEspacio } from "./CaracteristicaEspacio";
import { DisponibilidadEspacio } from "./DisponibilidadEspacio";
import { BloqueoEspacio } from "./BloqueoEspacio";
// Importar Reserva, aunque la implementa DEV3, se necesita para la relación bidireccional
import { Reserva } from "./Reserva"; 

@Entity('espacio')
export class Espacio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true }) // UK
    codigo: string;

    @Column()
    nombre: string;

    @Column({ type: 'int' })
    capacidad_maxima: number; // Propiedad 4+

    @Column('text', { nullable: true })
    descripcion: string;

    @Column({ type: 'varchar', length: 20, default: 'ACTIVO' })
    estado: string; // Sustituido enum por varchar por compatibilidad SQLite

    // --- RELACIONES (Foreign Keys) ---

    // Many-to-One con CategoriaEspacio
    @ManyToOne(() => CategoriaEspacio, (categoria) => categoria.espacios)
    @JoinColumn({ name: 'categoria_id' })
    categoria: CategoriaEspacio;

    @Column()
    categoria_id: number; // Campo FK explícito

    // Many-to-One con Ubicacion
    @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.espacios)
    @JoinColumn({ name: 'ubicacion_id' })
    ubicacion: Ubicacion;

    @Column()
    ubicacion_id: number; // Campo FK explícito

    // --- RELACIONES (One-to-Many) ---

    @OneToMany(() => CaracteristicaEspacio, (caracteristica) => caracteristica.espacio)
    caracteristicas: CaracteristicaEspacio[];

    @OneToMany(() => DisponibilidadEspacio, (disponibilidad) => disponibilidad.espacio)
    disponibilidades: DisponibilidadEspacio[];

    @OneToMany(() => BloqueoEspacio, (bloqueo) => bloqueo.espacio)
    bloqueos: BloqueoEspacio[];
    
    // Relación con Reserva (Implementada por DEV3)
    @OneToMany(() => Reserva, (reserva) => reserva.espacio)
    reservas: Reserva[];

    // --- Trazabilidad ---
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}