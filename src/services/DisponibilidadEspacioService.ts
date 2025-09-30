// ... imports (omitted for brevity)
import { DisponibilidadEspacio } from "../entities/DisponibilidadEspacio";
// ...

export class DisponibilidadEspacioService {
    repository: any;

    // ... create(data: Partial<DisponibilidadEspacio>): Requiere 'espacio_id'
    async findAll(): Promise<DisponibilidadEspacio[]> {
        return await this.repository.find({ relations: ['espacio'] });
    }
    // ... findOne, update, remove ...
}