
import type { ID } from './shared';

export interface IReserva {
  id: ID;
  usuarioId: ID;
  espacioId: ID;
  tiempoInicio: string; // YYYY-MM-DDTHH:mm:ssZ
  tiempoFin: string; // YYYY-MM-DDTHH:mm:ssZ
  asistentesEstimados: number;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'finalizada';
  motivo?: string | undefined;
}