
import type { ID } from './shared';

export interface INotificacion {
  id: ID;
  usuarioId: ID;
  mensaje: string;
  fechaEnvio: string; // YYYY-MM-DDTHH:mm:ssZ
  leido: boolean;
}