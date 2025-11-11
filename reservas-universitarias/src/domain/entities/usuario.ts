import type { ID } from './shared';

export interface IUsuario {
  id: ID;
  nombre: string;
  correo: string;
  rol: 'estudiante' | 'docente' | 'administrativo';
  identificacion: string;
}