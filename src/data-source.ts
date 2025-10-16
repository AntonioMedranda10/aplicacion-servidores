import "reflect-metadata";
import { DataSource } from "typeorm";
// DEV1 Entidades
import { CategoriaEspacio } from "./entities/CategoriaEspacio";
import { Ubicacion } from "./entities/Ubicacion";
import { Espacio } from "./entities/Espacio";
import { CaracteristicaEspacio } from "./entities/CaracteristicaEspacio";
import { DisponibilidadEspacio } from "./entities/DisponibilidadEspacio";
import { BloqueoEspacio } from "./entities/BloqueoEspacio";
// DEV2 Entidades
import { TipoEvento } from "./entities/TipoEvento";
import { Notificacion } from "./entities/Notificacion";
// DEV3 Entidades
import { TipoUsuario } from "./entities/TipoUsuario";
import { Usuario } from "./entities/Usuario";
import { EstadoReserva } from "./entities/EstadoReserva";
import { Reserva } from "./entities/Reserva"; 

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "uleam_reservas.sqlite",
    synchronize: true, 
    logging: false, 
    entities: [
        CategoriaEspacio, Ubicacion, Espacio, CaracteristicaEspacio, 
        DisponibilidadEspacio, BloqueoEspacio,
        TipoEvento, Notificacion,
        TipoUsuario, Usuario, EstadoReserva, Reserva
    ],
    migrations: [], 
    subscribers: [],
});

export async function initializeDataSource() {
    if (!AppDataSource.isInitialized) {
        try {
            await AppDataSource.initialize();
            console.log("Conexión a la base de datos inicializada correctamente.");
        } catch (error) {
            console.error("Error al inicializar la conexión a la base de datos:", error);
            throw error;
        }
    }
    return AppDataSource;
}