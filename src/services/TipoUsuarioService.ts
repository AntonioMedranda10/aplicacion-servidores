import { AppDataSource } from "../data-source";
import { TipoUsuario } from "../entities/TipoUsuario";
import { Repository, FindOneOptions } from "typeorm";

export class TipoUsuarioService {
    private repository: Repository<TipoUsuario>;

    constructor() {
        this.repository = AppDataSource.getRepository(TipoUsuario);
    }

    async create(data: Partial<TipoUsuario>): Promise<TipoUsuario> {
        const entidad = this.repository.create(data);
        return await this.repository.save(entidad);
    }

    async findAll(): Promise<TipoUsuario[]> {
        return await this.repository.find({ order: { nombre: 'ASC' } });
    }

    async findOne(id: number): Promise<TipoUsuario | null> {
        const options: FindOneOptions<TipoUsuario> = { where: { id } };
        return await this.repository.findOne(options);
    }

    async findOneBy(where: Partial<TipoUsuario>): Promise<TipoUsuario | null> {
        return await this.repository.findOneBy(where as any);
    }

    async update(id: number, data: Partial<TipoUsuario>): Promise<TipoUsuario | null> {
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