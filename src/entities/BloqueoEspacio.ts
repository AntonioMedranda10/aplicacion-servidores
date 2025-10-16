import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Espacio } from "./Espacio";
// Necesitamos importar Usuario para la relación (aunque Usuario es de DEV3)
import { Usuario } from "./Usuario"; 

@Entity('bloqueo_espacio')
export class BloqueoEspacio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('datetime')
    fecha_inicio: Date; 

    @Column('datetime')
    fecha_fin: Date;

    @Column('text')
    motivo: string;

    @Column({ type: 'varchar', length: 30 })
    tipo_bloqueo: string; 

    // Many-to-One con Espacio
    @ManyToOne(() => Espacio, (espacio) => espacio.bloqueos)
    @JoinColumn({ name: 'espacio_id' })
    espacio: Espacio;

    @Column()
    espacio_id: number; 

    // Many-to-One con Usuario (bloqueado_por)
    @ManyToOne(() => Usuario, { nullable: true })
    @JoinColumn({ name: 'bloqueado_por_usuario_id' })
    bloqueado_por: Usuario;
    
    @Column({ nullable: true })
    bloqueado_por_usuario_id: number;

    // --- Trazabilidad ---
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}