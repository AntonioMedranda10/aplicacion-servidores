// src/infrastructure/data/reserva.data.ts
import { v4 as uuidv4 } from 'uuid';
import type { IReserva } from '../../domain/entities/reserva';
import type { ID } from '../../domain/entities/shared';

// IDs de ejemplo para Usuario y Espacio (asumiendo que existen)
const USUARIO_ID_DOCENTE: ID = 'usr-doc-001';

// IDs y Nombres de Espacios (Modificados según tu solicitud)
const ESPACIO_ID_CANCHA_STADIUM: ID = 'esp-can-std';
const ESPACIO_ID_CANCHA_MULTIPLE: ID = 'esp-can-mul';
const ESPACIO_ID_CINE: ID = 'esp-cin-uleam';
const ESPACIO_ID_AUDITORIO: ID = 'esp-aud-sanchez';


export const reservasInMemory: IReserva[] = [
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_CANCHA_STADIUM,
        tiempoInicio: '2025-09-27T10:00:00Z',
        tiempoFin: '2025-09-27T11:00:00Z',
        asistentesEstimados: 10,
        estado: 'confirmada',
        motivo: 'Partido de fútbol - Copa Docente',
    },
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_CANCHA_MULTIPLE,
        tiempoInicio: '2025-09-28T15:00:00Z',
        tiempoFin: '2025-09-28T17:00:00Z',
        asistentesEstimados: 15,
        estado: 'confirmada',
        motivo: 'Práctica de Baloncesto',
    },
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_CINE,
        tiempoInicio: '2025-10-10T19:00:00Z',
        tiempoFin: '2025-10-10T21:30:00Z',
        asistentesEstimados: 40, // Capacidad ajustada a 40
        estado: 'pendiente',
        motivo: 'Función: "El Código de Turing"',
    },
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_AUDITORIO,
        tiempoInicio: '2025-09-01T14:00:00Z',
        tiempoFin: '2025-09-01T16:00:00Z',
        asistentesEstimados: 30,
        estado: 'cancelada',
        motivo: 'Conferencia pospuesta de Bioquímica',
    },
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_CANCHA_STADIUM,
        tiempoInicio: '2025-09-20T18:00:00Z',
        tiempoFin: '2025-09-20T19:00:00Z',
        asistentesEstimados: 12,
        estado: 'finalizada',
        motivo: 'Clase de educación física',
    },
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_CINE,
        tiempoInicio: '2025-10-15T16:00:00Z',
        tiempoFin: '2025-10-15T18:00:00Z',
        asistentesEstimados: 25,
        estado: 'confirmada',
        motivo: 'Función: "La Red Social"',
    },
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_CANCHA_MULTIPLE,
        tiempoInicio: '2025-11-01T10:00:00Z',
        tiempoFin: '2025-11-01T12:00:00Z',
        asistentesEstimados: 10,
        estado: 'confirmada',
        motivo: 'Torneo interno de Voleibol',
    },
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_AUDITORIO,
        tiempoInicio: '2025-11-05T08:00:00Z',
        tiempoFin: '2025-11-05T10:00:00Z',
        asistentesEstimados: 100,
        estado: 'pendiente',
        motivo: 'Charla de emprendimiento',
    },
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_CANCHA_STADIUM,
        tiempoInicio: '2025-11-10T14:00:00Z',
        tiempoFin: '2025-11-10T15:00:00Z',
        asistentesEstimados: 5,
        estado: 'confirmada',
        motivo: 'Práctica de tiro libre',
    },
    {
        id: uuidv4(),
        usuarioId: USUARIO_ID_DOCENTE,
        espacioId: ESPACIO_ID_CINE,
        tiempoInicio: '2025-12-01T08:00:00Z',
        tiempoFin: '2025-12-01T10:00:00Z',
        asistentesEstimados: 35,
        estado: 'confirmada',
        motivo: 'Proyección documental de Geología',
    },
];