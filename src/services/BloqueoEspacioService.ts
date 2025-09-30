import { BloqueoEspacio } from "../entities/BloqueoEspacio";
// ...

export class BloqueoEspacioService {
    repository: any;
    
    // ... constructor ...

    // ... create(data: Partial<BloqueoEspacio>): Requiere 'espacio_id'
    async findAll(): Promise<BloqueoEspacio[]> {
        return await this.repository.find({ relations: ['espacio', 'bloqueado_por'] }); // Carga Usuario (DEV3)
    }
    
    // ... findOne, update, remove ...
}