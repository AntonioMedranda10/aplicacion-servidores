// src/main.ts
import chalk from 'chalk';
import { IReserva } from './domain/entities/reserva';
import { ReservaError } from './domain/exceptions/ReservaError';
import { ReservaService } from './application/reserva.service';
import { ReservaRepositoryInMemory } from './infrastructure/reserva.repository.inmemory';


const reservaRepository = new ReservaRepositoryInMemory();

const reservaService = new ReservaService(reservaRepository);

// ---  DE PRUEBA ---

const nuevaReservaData: Omit<IReserva, 'id' | 'estado'> = {
    usuarioId: 'usr-est-002', 
    espacioId: 'esp-can-std', // Estadio ULEAM
    tiempoInicio: '2025-10-30T12:00:00Z',
    tiempoFin: '2025-10-30T13:00:00Z',
    asistentesEstimados: 8,
    motivo: 'Prueba de campo por estudiante',
};


const reservaSolapadaData: Omit<IReserva, 'id' | 'estado'> = {
    usuarioId: 'usr-est-003', 
    espacioId: 'esp-can-std', // Estadio ULEAM
    tiempoInicio: '2025-09-27T10:30:00Z', // Inicia en medio de una reserva confirmada
    tiempoFin: '2025-09-27T11:30:00Z',
    asistentesEstimados: 20,
    motivo: 'Reserva que debe fallar por solapamiento',
};


// --- PRUEBAS FUNCIONALES CRUD ---

async function ejecutarPruebas() {
    console.log(chalk.yellow.bold('==================================================================='));
    console.log(chalk.yellow.bold('== INICIO DE PRUEBAS FUNCIONALES DEL MÓDULO DE RESERVAS (ULEAM) =='));
    console.log(chalk.yellow.bold('===================================================================\n'));

    let reservaIDParaUpdate: string | null = null;
    let reservaIDParaDelete: string | null = null;


    // ----------------------------------------------------------------------
    // 1. CREATE (INSERCIÓN) - Paradigma: CALLBACKS
    // ----------------------------------------------------------------------
    console.log(chalk.blue.bold('--- 1. PRUEBA DE CREACIÓN (CALLBACKS) ---'));

    await new Promise<void>(resolve => {
        reservaService.create(nuevaReservaData, (error, reserva) => {
            if (error) {
                console.error(chalk.red('❌ ERROR CALLBACK (CREACIÓN):'), error.message);
            } else {
                console.log(chalk.green('✅ CREACIÓN EXITOSA (CALLBACKS):'), `ID: ${reserva!.id}, Estado: ${reserva!.estado}`);
                reservaIDParaUpdate = reserva!.id; // Guardar ID para la prueba de Update
                resolve();
            }
        });
    });

    await new Promise<void>(resolve => {
        reservaService.create(reservaSolapadaData, (error, reserva) => {
            if (error instanceof ReservaError) {
                console.log(chalk.yellow('⚠️ VALIDACIÓN EXITOSA (CALLBACKS):'), error.message);
            } else if (error) {
                console.error(chalk.red('❌ ERROR CALLBACK (INESPERADO):'), error.message);
            } else {
                console.error(chalk.red('❌ ERROR: Se creó una reserva solapada cuando no debía.'));
            }
            resolve();
        });
    });
    
    console.log('\n');
    
    // ----------------------------------------------------------------------
    // 2. READ (CONSULTA) - Paradigma: ASYNC/AWAIT
    // ----------------------------------------------------------------------
    console.log(chalk.blue.bold('--- 2. PRUEBA DE CONSULTA (ASYNC/AWAIT) ---'));

    try {
        const listado = await reservaService.findAll();
        console.log(chalk.green('✅ CONSULTA ALL EXITOSA:'), `Total de ${listado.length} reservas encontradas.`);
        
        if (listado.length > 0 && listado[0]) {
             reservaIDParaDelete = listado[0].id;
        }

        if (reservaIDParaUpdate) {
            const reservaEncontrada = await reservaService.findById(reservaIDParaUpdate);
            console.log(chalk.green('✅ CONSULTA ID EXITOSA:'), `ID: ${reservaEncontrada!.id}, Motivo: ${reservaEncontrada!.motivo}`);
        }

        const reservaNoExistente = await reservaService.findById('ID_NO_EXISTE_123');
        if (!reservaNoExistente) {
             console.log(chalk.yellow('⚠️ CONSULTA ID CORRECTA:'), 'Reserva no encontrada (retorno null).');
        }

    } catch (e: any) {
        console.error(chalk.red('❌ ERROR ASYNC/AWAIT (CONSULTA):'), e.message);
    }
    
    console.log('\n');

    // ----------------------------------------------------------------------
    // 3. UPDATE (MODIFICACIÓN) - Paradigma: PROMISES
    // ----------------------------------------------------------------------
    console.log(chalk.blue.bold('--- 3. PRUEBA DE MODIFICACIÓN (PROMISES) ---'));
    
    if (reservaIDParaUpdate) {
        
        const updateData: Partial<IReserva> = { estado: 'confirmada', asistentesEstimados: 7 };
        
        reservaService.update(reservaIDParaUpdate, updateData)
            .then(reservaActualizada => {
                console.log(chalk.green('✅ UPDATE EXITOSO (PROMISES):'), `ID: ${reservaActualizada.id}, Nuevo Estado: ${reservaActualizada.estado}`);
            })
            .catch(error => {
                console.error(chalk.red('❌ ERROR PROMISES (UPDATE):'), error.message);
            });


        const updateDataInexistente: Partial<IReserva> = { estado: 'cancelada' };

        reservaService.update('ID_INEXISTENTE_543', updateDataInexistente)
            .then(() => {
                 console.error(chalk.red('❌ ERROR: Se actualizó un registro inexistente.'));
            })
            .catch(error => {
                console.log(chalk.yellow('⚠️ VALIDACIÓN EXITOSA (PROMISES):'), `Manejo de ID inexistente: ${error.message}`);
            });

        await new Promise(resolve => setTimeout(resolve, 300));

    } else {
        console.log(chalk.yellow('⚠️ SKIPPING UPDATE: No se pudo obtener un ID válido para la prueba de Update.'));
    }

    console.log('\n');

    // ----------------------------------------------------------------------
    // 4. DELETE (ELIMINACIÓN) - Paradigma: ASYNC/AWAIT
    // ----------------------------------------------------------------------
    console.log(chalk.blue.bold('--- 4. PRUEBA DE ELIMINACIÓN (ASYNC/AWAIT) ---'));

    if (reservaIDParaDelete) {
        try {
          
            const exito = await reservaService.delete(reservaIDParaDelete); 
            
            if (exito) {
                console.log(chalk.green('✅ DELETE EXITOSO (ASYNC/AWAIT):'), `Reserva con ID ${reservaIDParaDelete} eliminada.`);
            } else {
                 console.error(chalk.red('❌ ERROR: El delete falló inesperadamente.'));
            }

            await reservaService.delete(reservaIDParaDelete);

        } catch (e: any) {
            console.log(chalk.yellow('⚠️ MANEJO DE ERROR (ASYNC/AWAIT):'), `Intento de eliminar una reserva inexistente: ${e.message}`);
        }
    } else {
         console.log(chalk.yellow('⚠️ SKIPPING DELETE: No se pudo obtener un ID válido para la prueba de Delete.'));
    }
    
    console.log('\n' + chalk.yellow.bold('==================================================================='));
    console.log(chalk.yellow.bold('== FIN DE PRUEBAS FUNCIONALES =='));
    console.log(chalk.yellow.bold('===================================================================\n'));
}

ejecutarPruebas();