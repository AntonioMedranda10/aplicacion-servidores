// src/domain/repositories/reserva.repository.ts
import type { IReserva } from '../entities/reserva';
import type { ID } from '../entities/shared';

export type ReservaCallback = (error: Error | null, reserva?: IReserva) => void;

/**
 * Contrato del Repositorio para la entidad IReserva.
 * Implementa el Patrón Repository y el Contrato para Inversión de Dependencias (DIP).
 */
export interface IReservaRepository {

  create(reservaData: Omit<IReserva, 'id' | 'estado'>, callback: ReservaCallback): void;

  findById(id: ID): Promise<IReserva | null>;
  findAll(): Promise<IReserva[]>;

  update(id: ID, updateData: Partial<IReserva>): Promise<IReserva>;

  delete(id: ID): Promise<boolean>;
}