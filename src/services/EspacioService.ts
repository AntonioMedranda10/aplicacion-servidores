import { AppDataSource } from "../data-source";
import { Espacio } from "../entities/Espacio";
import { Repository, FindOneOptions, FindManyOptions } from "typeorm";

/**
 * Servicio que implementa la lógica CRUD para la entidad Espacio.
 * Cumple con los 5 métodos obligatorios de la rúbrica.
 */
export class EspacioService {
    private espacioRepository: Repository<Espacio>;

    constructor() {
        // 1. Acceso al Repositorio utilizando el DataSource
        this.espacioRepository = AppDataSource.getRepository(Espacio);
    }

    /**
     * 1. create(data): Crea un nuevo espacio.
     * @param data Objeto con los datos del nuevo espacio (incluye categoria_id y ubicacion_id).
     */
    async create(data: Partial<Espacio>): Promise<Espacio> {
        const nuevoEspacio = this.espacioRepository.create(data);
        // Lógica de Negocio: Se podría validar que la categoria y ubicacion existan aquí.
        return await this.espacioRepository.save(nuevoEspacio);
    }

    /**
     * 2. findAll(): Obtiene todos los espacios, cargando sus relaciones clave.
     */
    async findAll(options?: FindManyOptions<Espacio>): Promise<Espacio[]> {
        return await this.espacioRepository.find({
            relations: ['categoria', 'ubicacion'], // Carga las relaciones maestras
            order: { nombre: 'ASC' }
        });
    }

    /**
     * 3. findOne(id): Obtiene un espacio por ID con todas sus configuraciones.
     */
    async findOne(id: number): Promise<Espacio | null> {
        const options: FindOneOptions<Espacio> = {
            where: { id: id },
            relations: ['categoria', 'ubicacion', 'caracteristicas', 'disponibilidades', 'bloqueos'],
        };
        return await this.espacioRepository.findOne(options);
    }

    async findOneBy(where: Partial<Espacio>): Promise<Espacio | null> {
        return await this.espacioRepository.findOneBy(where as any);
    }

    /**
     * 4. update(id, data): Actualiza un registro.
     */
    async update(id: number, data: Partial<Espacio>): Promise<Espacio | null> {
        const espacio = await this.espacioRepository.findOneBy({ id });
        if (!espacio) {
            return null;
        }
        this.espacioRepository.merge(espacio, data);
        espacio.updated_at = new Date(); 
        return await this.espacioRepository.save(espacio);
    }

    /**
     * 5. remove(id): Elimina un registro.
     */
    async remove(id: number): Promise<boolean> {
        const result = await this.espacioRepository.delete(id);
        // Retorna true si al menos un registro fue afectado (eliminado)
        return result.affected != null && result.affected > 0;
    }
}