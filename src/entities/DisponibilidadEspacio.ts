import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Espacio } from "./Espacio";

@Entity('disponibilidad_espacio')
export class DisponibilidadEspacio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    dia_semana: number; // 0=Domingo, 6=Sábado (Propiedad 4+)

    @Column('time')
    hora_inicio: string; // TypeORM usa 'string' para TIME en SQLite

    @Column('time')
    hora_fin: string;

    @Column({ default: true })
    activo: boolean;

    // Many-to-One con Espacio
    @ManyToOne(() => Espacio, (espacio) => espacio.disponibilidades)
    @JoinColumn({ name: 'espacio_id' })
    espacio: Espacio;

    @Column()
    espacio_id: number; // Campo FK
}