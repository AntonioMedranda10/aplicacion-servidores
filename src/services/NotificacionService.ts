import { AppDataSource } from "../data-source";
import { Notificacion } from "../entities/Notificacion";
import { Repository, FindOneOptions } from "typeorm";

export class NotificacionService {
    private notificacionRepository: Repository<Notificacion>;

    constructor() {
        this.notificacionRepository = AppDataSource.getRepository(Notificacion);
    }

    /**
     * create(data): Crea una nueva notificación.
     * data debe incluir 'usuario_id'.
     */
    async create(data: Partial<Notificacion>): Promise<Notificacion> {
        const nuevaNotificacion = this.notificacionRepository.create(data);
        return await this.notificacionRepository.save(nuevaNotificacion);
    }

    /**
     * findAll(): Obtiene todas las notificaciones, mostrando el receptor y la referencia (si existe).
     */
    async findAll(): Promise<Notificacion[]> {
        return await this.notificacionRepository.find({
            relations: ['usuario', 'reserva', 'espacio'],
            order: { created_at: 'DESC' }
        });
    }

    /**
     * findOne(id): Obtiene una notificación por ID.
     */
    async findOne(id: number): Promise<Notificacion | null> {
        const options: FindOneOptions<Notificacion> = {
            where: { id: id },
            relations: ['usuario', 'reserva', 'espacio'],
        };
        return await this.notificacionRepository.findOne(options);
    }

    /**
     * update(id, data): Actualiza un registro (e.g., marca como leído).
     */
    async update(id: number, data: Partial<Notificacion>): Promise<Notificacion | null> {
        const notificacion = await this.notificacionRepository.findOneBy({ id });
        if (!notificacion) {
            return null;
        }
        
        // Lógica de negocio: Si se marca como leído, registra la hora.
        if (data.leida === true && !notificacion.leida_at) {
            data.leida_at = new Date();
        }

        this.notificacionRepository.merge(notificacion, data);
        return await this.notificacionRepository.save(notificacion);
    }

    /**
     * remove(id): Elimina un registro.
     */
    async remove(id: number): Promise<boolean> {
        const result = await this.notificacionRepository.delete(id);
        return typeof result.affected === 'number' && result.affected > 0;
    }
}