// ... imports (omitted for brevity)
import { CaracteristicaEspacio } from "../entities/CaracteristicaEspacio";
// ...

export class CaracteristicaEspacioService {
    repository: any;
    // ... constructor ...

    // ... create(data: Partial<CaracteristicaEspacio>): Requiere 'espacio_id'
    async findAll(): Promise<CaracteristicaEspacio[]> {
        return await this.repository.find({ relations: ['espacio'] });
    }
    // ... findOne, update, remove ...
}