// ... imports (omitted for brevity)
import { AppDataSource } from "../data-source";
import { TipoEvento } from "../entities/TipoEvento";
import { Repository, FindOneOptions } from "typeorm";

export class TipoEventoService {
    private repository: Repository<TipoEvento>;

    constructor() {
        this.repository = AppDataSource.getRepository(TipoEvento);
    }

    async create(data: Partial<TipoEvento>): Promise<TipoEvento> {
        const entidad = this.repository.create(data);
        return await this.repository.save(entidad);
    }

    async findAll(): Promise<TipoEvento[]> {
        return await this.repository.find({ order: { nombre: 'ASC' } });
    }

    async findOne(id: number): Promise<TipoEvento | null> {
        const options: FindOneOptions<TipoEvento> = { where: { id } };
        return await this.repository.findOne(options);
    }

    async findOneBy(where: Partial<TipoEvento>): Promise<TipoEvento | null> {
        return await this.repository.findOneBy(where as any);
    }

    async update(id: number, data: Partial<TipoEvento>): Promise<TipoEvento | null> {
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