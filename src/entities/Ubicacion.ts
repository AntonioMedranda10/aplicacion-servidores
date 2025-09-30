import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Espacio } from "./Espacio";

@Entity('ubicacion')
export class Ubicacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_edificio: string;

    @Column({ unique: true }) // UK
    codigo_edificio: string;

    @Column({ nullable: true })
    piso: string;

    @Column({ nullable: true })
    numero_aula: string;

    // Relación: Una Ubicación tiene muchos Espacios
    @OneToMany(() => Espacio, (espacio) => espacio.ubicacion)
    espacios: Espacio[];

    @Column('text', { nullable: true })
    sector: string; // 4+ propiedades 
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}