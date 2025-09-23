
/**
 * Clase de error personalizada para manejar fallos en la lógica de negocio de Reservas.
 */
export class ReservaError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ReservaError';
    }
}