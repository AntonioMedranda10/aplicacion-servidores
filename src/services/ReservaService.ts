import { AppDataSource } from "../data-source";
import { Reserva } from "../entities/Reserva";
import { Repository, FindOneOptions } from "typeorm";

export class ReservaService {
    private reservaRepository: Repository<Reserva>;

    constructor() {
        this.reservaRepository = AppDataSource.getRepository(Reserva);
    }

    /**
     * create(data): Crea una nueva reserva. Requiere IDs de las cuatro entidades maestras.
     */
    async create(data: Partial<Reserva>): Promise<Reserva> {
        // Lógica de Negocio: Generar un código único de reserva (UK)
        data.codigo = `RES-${Date.now().toString().slice(-6)}`; 
        
        const nuevaReserva = this.reservaRepository.create(data);
        return await this.reservaRepository.save(nuevaReserva);
    }

    /**
     * findAll(): Obtiene todas las reservas, cargando sus relaciones clave.
     */
    async findAll(): Promise<Reserva[]> {
        return await this.reservaRepository.find({
            relations: ['usuario', 'espacio', 'tipo_evento', 'estado'],
            order: { fecha: 'ASC', hora_inicio: 'ASC' }
        });
    }

    /**
     * findOne(id): Obtiene un registro por su ID con todas sus relaciones.
     */
    async findOne(id: number): Promise<Reserva | null> {
        const options: FindOneOptions<Reserva> = {
            where: { id: id },
            relations: ['usuario', 'espacio', 'tipo_evento', 'estado'],
        };
        return await this.reservaRepository.findOne(options);
    }

    /**
     * update(id, data): Actualiza un registro.
     */
    async update(id: number, data: Partial<Reserva>): Promise<Reserva | null> {
        const reserva = await this.reservaRepository.findOneBy({ id });
        if (!reserva) {
            return null;
        }
        this.reservaRepository.merge(reserva, data);
        reserva.updated_at = new Date(); // Actualiza la fecha de modificación
        return await this.reservaRepository.save(reserva);
    }

    /**
     * remove(id): Elimina un registro.
     */
    async remove(id: number): Promise<boolean> {
        const result = await this.reservaRepository.delete(id);
        return typeof result.affected === 'number' && result.affected > 0;
    }
}