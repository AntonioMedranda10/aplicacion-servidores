import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Espacio } from "./Espacio";

@Entity('categoria_espacio')
export class CategoriaEspacio {
    @PrimaryGeneratedColumn() // Clave primaria autoincremental 
    id: number;

    @Column({ unique: true }) // UK
    nombre: string;

    @Column('text') // Al menos 4 propiedades 
    descripcion: string;

    @Column({ default: false })
    requiere_aprobacion: boolean;

    @Column('int')
    tiempo_minimo_reserva: number;

    // Relación: Una Categoría tiene muchos Espacios
    @OneToMany(() => Espacio, (espacio) => espacio.categoria)
    espacios: Espacio[];
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}