import { FindOneOptions } from "typeorm";
import { Usuario } from "../entities/Usuario";

export class UsuarioService {
    repository: any;
    private repositoryTyped: any;

    constructor() {
        try {
            const { AppDataSource } = require('../data-source');
            this.repositoryTyped = AppDataSource.getRepository(Usuario);
        } catch (e) {
            this.repositoryTyped = null;
        }
    }

    async create(data: Partial<Usuario>): Promise<Usuario> {
        if (!this.repositoryTyped) {
            const { AppDataSource } = require('../data-source');
            this.repositoryTyped = AppDataSource.getRepository(Usuario);
        }
        const entidad = this.repositoryTyped.create(data);
        return await this.repositoryTyped.save(entidad);
    }
    async findAll(): Promise<Usuario[]> {
        return await this.repository.find({ relations: ['tipo_usuario'] });
    }

    async findOne(id: number): Promise<Usuario | null> {
        const options: FindOneOptions<Usuario> = { 
            where: { id },
            relations: ['tipo_usuario'] 
        };
        return await this.repositoryTyped.findOne(options);
    }
    
    async findOneBy(where: Partial<Usuario>): Promise<Usuario | null> {
        if (!this.repositoryTyped) {
            const { AppDataSource } = require('../data-source');
            this.repositoryTyped = AppDataSource.getRepository(Usuario);
        }
        return await this.repositoryTyped.findOneBy(where as any);
    }
}