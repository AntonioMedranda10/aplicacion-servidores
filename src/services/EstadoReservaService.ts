import { AppDataSource } from "../data-source";
import { EstadoReserva } from "../entities/EstadoReserva";
import { Repository } from "typeorm";

export class EstadoReservaService {
    private repository: Repository<EstadoReserva>;

    constructor() {
        this.repository = AppDataSource.getRepository(EstadoReserva);
    }

    async create(data: Partial<EstadoReserva>): Promise<EstadoReserva> {
        const entidad = this.repository.create(data);
        return await this.repository.save(entidad);
    }

    async findOneBy(where: Partial<EstadoReserva>): Promise<EstadoReserva | null> {
        return await this.repository.findOneBy(where as any);
    }

    async findAll(): Promise<EstadoReserva[]> {
        return await this.repository.find({ order: { orden: 'ASC' } }); // Ordenado por lógica de negocio
    }

    async update(id: number, data: Partial<EstadoReserva>): Promise<EstadoReserva | null> {
        const entidad = await this.repository.findOneBy({ id });
        if (!entidad) return null;
        this.repository.merge(entidad, data);
        return await this.repository.save(entidad);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return typeof result.affected === 'number' && result.affected > 0;
    }
}