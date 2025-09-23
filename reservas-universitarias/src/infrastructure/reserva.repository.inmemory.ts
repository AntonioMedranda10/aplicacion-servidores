// src/infrastructure/reserva.repository.inmemory.ts
import { v4 as uuidv4 } from 'uuid';
import type { IReserva } from '../domain/entities/reserva';
import type { ID } from '../domain/entities/shared';
import { IReservaRepository, ReservaCallback } from '../domain/repositories/reserva.repository';
import { reservasInMemory } from './data/reserva.data';


export class ReservaRepositoryInMemory implements IReservaRepository {

    private database: IReserva[] = reservasInMemory;
    // Simulación de latencia de red (200ms) para forzar la asincronía
    private readonly LATENCY_MS = 200; 

    // ----------------------------------------------------------------------
    // 1. CREATE (CALLBACKS) - Simulación de latencia y validación de datos
    // ----------------------------------------------------------------------
    public create(reservaData: Omit<IReserva, 'id' | 'estado'>, callback: ReservaCallback): void {
        
        setTimeout(() => {
            
            if (!reservaData.usuarioId || !reservaData.espacioId || !reservaData.tiempoInicio || !reservaData.tiempoFin) {
                return callback(new Error('Los campos usuarioId, espacioId, tiempoInicio y tiempoFin son obligatorios.'));
            }

            if (new Date(reservaData.tiempoInicio) >= new Date(reservaData.tiempoFin)) {
                return callback(new Error('La hora de inicio debe ser anterior a la hora de fin.'));
            }
            
            // Lógica de inserción:
            const nuevaReserva: IReserva = {
                id: uuidv4(),
                ...reservaData,
                estado: 'pendiente', 
            };

            this.database.push(nuevaReserva);

            // Función callback con patrón (error, resultado) (REQUISITO)
            callback(null, nuevaReserva);

        }, this.LATENCY_MS);
    }

    // ----------------------------------------------------------------------
    // 2. READ (ASYNC/AWAIT) - Funciones async que retornan Promise
    // ----------------------------------------------------------------------
    public async findById(id: ID): Promise<IReserva | null> {
        await new Promise(resolve => setTimeout(resolve, this.LATENCY_MS));
        
        const reserva = this.database.find(r => r.id === id);
        return reserva || null;
    }

    public async findAll(): Promise<IReserva[]> {
        await new Promise(resolve => setTimeout(resolve, this.LATENCY_MS));
        
        return this.database;
    }

    // ----------------------------------------------------------------------
    // 3. UPDATE (PROMISES) - Retorno y encadenamiento con .then()/.catch()
    // ----------------------------------------------------------------------
    public update(id: ID, updateData: Partial<IReserva>): Promise<IReserva> {
        
        return new Promise((resolve, reject) => {
            
            setTimeout(() => {
                const index = this.database.findIndex(r => r.id === id);

                if (index === -1) {
                    return reject(new Error(`Reserva con ID ${id} no encontrada para actualizar.`));
                }
                const reservaExistente = this.database[index]!; 
                const reservaActualizada = {
                    ...this.database[index],
                    ...updateData,
                    id: reservaExistente.id 
                } as IReserva;

                this.database[index] = reservaActualizada;
                resolve(reservaActualizada);

            }, this.LATENCY_MS);
        });
    }

    // ----------------------------------------------------------------------
    // 4. DELETE (ASYNC/AWAIT) - Eliminación lógica o física, manejo de errores
    // ----------------------------------------------------------------------
    public async delete(id: ID): Promise<boolean> {
        
        await new Promise(resolve => setTimeout(resolve, this.LATENCY_MS));

        const index = this.database.findIndex(r => r.id === id);

        if (index === -1) {
            return false;
        }

        try {
            
            this.database.splice(index, 1);
            return true;
        } catch (error) {
            console.error(`Error al intentar eliminar la reserva ${id}:`, error);
            return false;
        }
    }
}