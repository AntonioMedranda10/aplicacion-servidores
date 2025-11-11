import type { ID } from './shared';

export interface IEspacio {
  id: ID;
  nombre: string;
  tipo: 'cancha' | 'auditorio' | 'cine' | 'sala';
  capacidad: number;
  ubicacion: string;
  estado: 'disponible' | 'mantenimiento';
}