
import type { ID } from './shared';

export interface IHorario {
  id: ID;
  espacioId: ID;
  diaSemana: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  horaApertura: string; // HH:mm
  horaCierre: string; // HH:mm
}