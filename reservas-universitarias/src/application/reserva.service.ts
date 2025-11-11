// src/application/reserva.service.ts
import { IReserva } from '../domain/entities/reserva';
import { ID } from '../domain/entities/shared';
import { IReservaRepository, ReservaCallback } from '../domain/repositories/reserva.repository';
import { ReservaError } from '../domain/exceptions/ReservaError';

/**
 * Servicio de Aplicación para gestionar la lógica de negocio de las Reservas.
 * Aplica el Principio de Inversión de Dependencias (DIP) y Responsabilidad Única (SRP).
 */
export class ReservaService {

    // Se inyecta la dependencia del repositorio (DIP)
    constructor(private reservaRepository: IReservaRepository) {}

    /**
     * Lógica de Negocio clave: Verifica si una nueva reserva solapa con reservas ya confirmadas.
     */
    private async checkSolapamiento(
        espacioId: ID, 
        tiempoInicio: string, 
        tiempoFin: string,
        reservaIdAExcluir: ID | null = null
    ): Promise<boolean> {
        // Obtener todas las reservas para ese espacio
        const todasReservas = await this.reservaRepository.findAll();
        const reservasEspacio = todasReservas.filter(r => r.espacioId === espacioId);
        
        const nuevoInicio = new Date(tiempoInicio).getTime();
        const nuevoFin = new Date(tiempoFin).getTime();

        for (const reserva of reservasEspacio) {
            // Excluir la propia reserva si estamos actualizando
            if (reserva.id === reservaIdAExcluir) continue;

            // Solo verificamos conflictos con reservas confirmadas
            if (reserva.estado !== 'confirmada') continue;

            const existenteInicio = new Date(reserva.tiempoInicio).getTime();
            const existenteFin = new Date(reserva.tiempoFin).getTime();

            // Lógica de solapamiento: [inicio, fin] del nuevo intervalo se cruza con [existenteInicio, existenteFin]
            const solapa = nuevoInicio < existenteFin && nuevoFin > existenteInicio;

            if (solapa) {
                return true; 
            }
        }
        return false; 
    }

    // ----------------------------------------------------------------------
    // CREATE (CALLBACKS)
    // ----------------------------------------------------------------------

    public create(reservaData: Omit<IReserva, 'id' | 'estado'>, callback: ReservaCallback): void {
        
        this.checkSolapamiento(reservaData.espacioId, reservaData.tiempoInicio, reservaData.tiempoFin)
            .then(solapa => {
                if (solapa) {
                    return callback(new ReservaError('El espacio ya está reservado y confirmado en ese intervalo de tiempo.'));
                }
                
                this.reservaRepository.create(reservaData, (error, reserva) => {
                    if (error) {
                        return callback(new ReservaError(`Fallo en la creación de la reserva: ${error.message}`));
                    }
                    callback(null, reserva);
                });
            })
            .catch(err => {
                callback(new ReservaError(`Error en validación de solapamiento: ${err.message}`));
            });
    }


    public async findById(id: ID): Promise<IReserva | null> {
        try {
            return await this.reservaRepository.findById(id);
        } catch (e) {
            throw new ReservaError(`No se pudo consultar la reserva con ID ${id}.`);
        }
    }

    public async findAll(): Promise<IReserva[]> {
        try {
            return await this.reservaRepository.findAll();
        } catch (e) {
            throw new ReservaError('No se pudo obtener la lista de reservas.');
        }
    }


    public update(id: ID, updateData: Partial<IReserva>): Promise<IReserva> {
        return new Promise(async (resolve, reject) => {
            
            if (updateData.tiempoInicio || updateData.tiempoFin) {
                
                const actual = await this.findById(id);
                if (!actual) {
                    return reject(new ReservaError(`No se encontró la reserva ${id} para validar la actualización.`));
                }
                
                const inicio = updateData.tiempoInicio || actual.tiempoInicio;
                const fin = updateData.tiempoFin || actual.tiempoFin;
                
                const solapa = await this.checkSolapamiento(actual.espacioId, inicio, fin, id);
                
                if (solapa) {
                    return reject(new ReservaError('La actualización crea un conflicto de tiempo con otra reserva confirmada.'));
                }
            }

            this.reservaRepository.update(id, updateData)
                .then(resolve)
                .catch(error => {
                    reject(new ReservaError(`Fallo al actualizar en la capa de infraestructura: ${error.message}`));
                });
        });
    }

    // ----------------------------------------------------------------------
    // DELETE (ASYNC/AWAIT)
    // ----------------------------------------------------------------------
    public async delete(id: ID): Promise<boolean> {
        try {
            const exito = await this.reservaRepository.delete(id);
            if (!exito) {
                throw new ReservaError(`La reserva con ID ${id} no existía o no pudo ser eliminada.`);
            }
            return exito;
        } catch (error) {
            if (error instanceof ReservaError) {
                throw error;
            }
            const errorMsg = typeof error === 'object' && error !== null && 'message' in error
                ? (error as { message: string }).message
                : String(error);
            throw new ReservaError(`Error inesperado al intentar eliminar la reserva: ${errorMsg}`);
        }
    }
}