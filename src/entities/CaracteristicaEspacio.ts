import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Espacio } from "./Espacio";

@Entity('caracteristica_espacio')
export class CaracteristicaEspacio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column('text', { nullable: true })
    descripcion: string; // Propiedad 4+

    @Column({ default: true })
    disponible: boolean;

    // Many-to-One con Espacio
    @ManyToOne(() => Espacio, (espacio) => espacio.caracteristicas)
    @JoinColumn({ name: 'espacio_id' })
    espacio: Espacio;

    @Column()
    espacio_id: number; // Campo FK
    
    @Column({ default: 1 }) // Ejemplo de columna adicional para completar requisito
    prioridad_orden: number;
}