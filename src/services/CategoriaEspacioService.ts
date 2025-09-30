import { AppDataSource } from "../data-source";
import { CategoriaEspacio } from "../entities/CategoriaEspacio";
import { Repository, FindOneOptions, FindManyOptions } from "typeorm";

export class CategoriaEspacioService {
    private repository: Repository<CategoriaEspacio>;

    constructor() {
        this.repository = AppDataSource.getRepository(CategoriaEspacio);
    }

    async create(data: Partial<CategoriaEspacio>): Promise<CategoriaEspacio> {
        const entidad = this.repository.create(data);
        return await this.repository.save(entidad);
    }

    async findAll(): Promise<CategoriaEspacio[]> {
        return await this.repository.find({ order: { nombre: 'ASC' } });
    }

    async findOne(id: number): Promise<CategoriaEspacio | null> {
        const options: FindOneOptions<CategoriaEspacio> = { where: { id } };
        return await this.repository.findOne(options);
    }

    async findOneBy(where: Partial<CategoriaEspacio>): Promise<CategoriaEspacio | null> {
        return await this.repository.findOneBy(where as any);
    }

    async update(id: number, data: Partial<CategoriaEspacio>): Promise<CategoriaEspacio | null> {
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