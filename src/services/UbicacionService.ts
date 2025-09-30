import { AppDataSource } from "../data-source";
import { Ubicacion } from "../entities/Ubicacion";
import { Repository, FindOneOptions } from "typeorm";

export class UbicacionService {
    private repository: Repository<Ubicacion>;

    constructor() {
        this.repository = AppDataSource.getRepository(Ubicacion);
    }

    async create(data: Partial<Ubicacion>): Promise<Ubicacion> {
        const nueva = this.repository.create(data);
        return await this.repository.save(nueva);
    }

    async findAll(): Promise<Ubicacion[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<Ubicacion | null> {
        const options: FindOneOptions<Ubicacion> = { where: { id } };
        return await this.repository.findOne(options);
    }

    async update(id: number, data: Partial<Ubicacion>): Promise<Ubicacion | null> {
        const entidad = await this.repository.findOneBy({ id });
        if (!entidad) return null;
        this.repository.merge(entidad, data);
        return await this.repository.save(entidad);
    }

    async findOneBy(where: Partial<Ubicacion>): Promise<Ubicacion | null> {
        return await this.repository.findOneBy(where as any);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== undefined && result.affected !== null && result.affected > 0;
    }
}