import { initializeDataSource, AppDataSource } from './data-source';

// Importar todos los servicios necesarios para el seeding y la prueba
// DEV3 (Usuarios y Roles)
import { TipoUsuarioService } from './services/TipoUsuarioService';
import { UsuarioService } from './services/UsuarioService';
import { EstadoReservaService } from './services/EstadoReservaService';
import { ReservaService } from './services/ReservaService';
// DEV1 (Espacios y Configuración)
import { CategoriaEspacioService } from './services/CategoriaEspacioService';
import { UbicacionService } from './services/UbicacionService';
import { EspacioService } from './services/EspacioService';
// DEV2 (Eventos y Notificaciones)
import { TipoEventoService } from './services/TipoEventoService';
import { NotificacionService } from './services/NotificacionService';

// Interfaces de datos para el Seeding
interface SeedingData {
    tipoUsuarioAdminId: number;
    usuarioAdminId: number;
    categoriaAulaId: number;
    ubicacionEdificioId: number;
    espacioAulaId: number;
    tipoEventoClaseId: number;
    estadoPendienteId: number;
}


async function main() {
    console.log("==========================================");
    console.log("🚀 INICIANDO SISTEMA DE RESERVAS ULEAM");
    console.log("==========================================");

    // 1. Inicializar Conexión (Punto 4.2)
    await initializeDataSource();

    // Instanciar todos los servicios
    const tipoUsuarioService = new TipoUsuarioService();
    const usuarioService = new UsuarioService();
    const categoriaService = new CategoriaEspacioService();
    const ubicacionService = new UbicacionService();
    const espacioService = new EspacioService();
    const estadoReservaService = new EstadoReservaService();
    const tipoEventoService = new TipoEventoService();
    const reservaService = new ReservaService();
    const notificacionService = new NotificacionService();
    
    // Almacenamiento de IDs generados para mantener la lógica de relaciones
    const ids: SeedingData = {} as SeedingData;

    try {
        // --------------------------------------------------------------------
        // 2. SEEDING DE DATOS MAESTROS (SIN DEPENDENCIAS)
        // --------------------------------------------------------------------
        console.log("\n--- 1. Seeding: Datos Maestros (Roles, Categorías, Ubicación) ---");
        
        // DEV3: TipoUsuario (idempotente)
        let tipoAdmin = await tipoUsuarioService.findOneBy({ nombre: 'ADMINISTRADOR' });
        if (!tipoAdmin) {
            tipoAdmin = await tipoUsuarioService.create({ nombre: 'ADMINISTRADOR', descripcion: 'Gestión total del sistema', nivel_prioridad: 10 });
            console.log(`✅ Creado TipoUsuario: ${tipoAdmin.nombre} (ID: ${tipoAdmin.id})`);
        } else {
            console.log(`ℹ️ TipoUsuario existente: ${tipoAdmin.nombre} (ID: ${tipoAdmin.id})`);
        }
        let tipoProfesor = await tipoUsuarioService.findOneBy({ nombre: 'PROFESOR' });
        if (!tipoProfesor) {
            tipoProfesor = await tipoUsuarioService.create({ nombre: 'PROFESOR', descripcion: 'Puede reservar espacios para clases', nivel_prioridad: 5 });
        }
        ids.tipoUsuarioAdminId = tipoAdmin.id;

        // DEV1: CategoriaEspacio
        let catAula = await categoriaService.findOneBy({ nombre: 'AULA ESTÁNDAR' });
        if (!catAula) {
            catAula = await categoriaService.create({ nombre: 'AULA ESTÁNDAR', requiere_aprobacion: false, tiempo_minimo_reserva: 60, descripcion: 'Aula estándar para clases regulares' });
            console.log(`✅ Creado Categoria: ${catAula.nombre} (ID: ${catAula.id})`);
        } else {
            console.log(`ℹ️ Categoria existente: ${catAula.nombre} (ID: ${catAula.id})`);
        }
        ids.categoriaAulaId = catAula.id;

        // DEV1: Ubicacion
        let ubicacionCiencias = await ubicacionService.findOneBy({ codigo_edificio: 'ECI' });
        if (!ubicacionCiencias) {
            ubicacionCiencias = await ubicacionService.create({ nombre_edificio: 'EDIFICIO CIENCIAS', codigo_edificio: 'ECI', piso: '1', sector: 'CENTRAL' });
            console.log(`✅ Creada Ubicación: ${ubicacionCiencias.nombre_edificio} (ID: ${ubicacionCiencias.id})`);
        } else {
            console.log(`ℹ️ Ubicación existente: ${ubicacionCiencias.nombre_edificio} (ID: ${ubicacionCiencias.id})`);
        }
        ids.ubicacionEdificioId = ubicacionCiencias.id;

        // DEV2: TipoEvento
        let tipoClase = await tipoEventoService.findOneBy({ nombre: 'CLASE REGULAR' });
        if (!tipoClase) {
            tipoClase = await tipoEventoService.create({ nombre: 'CLASE REGULAR', requiere_aprobacion: false, color_hex: '#3366ff', descripcion: 'Evento de tipo clase' });
            console.log(`✅ Creado TipoEvento: ${tipoClase.nombre} (ID: ${tipoClase.id})`);
        } else {
            console.log(`ℹ️ TipoEvento existente: ${tipoClase.nombre} (ID: ${tipoClase.id})`);
        }
        ids.tipoEventoClaseId = tipoClase.id;

        // DEV3: EstadoReserva
        let estadoPendiente = await estadoReservaService.findOneBy({ nombre: 'PENDIENTE' });
        if (!estadoPendiente) {
            estadoPendiente = await estadoReservaService.create({ nombre: 'PENDIENTE', color_hex: '#ffc107', orden: 1, descripcion: 'Reservas pendientes de aprobación' });
            await estadoReservaService.create({ nombre: 'APROBADA', color_hex: '#28a745', orden: 2, descripcion: 'Reservas aprobadas' });
            console.log(`✅ Creado Estado: ${estadoPendiente.nombre} (ID: ${estadoPendiente.id})`);
        } else {
            console.log(`ℹ️ Estado existente: ${estadoPendiente.nombre} (ID: ${estadoPendiente.id})`);
        }
        ids.estadoPendienteId = estadoPendiente.id;


        // --------------------------------------------------------------------
        // 3. SEEDING DE DATOS DEPENDIENTES (Usuario y Espacio)
        // --------------------------------------------------------------------
        console.log("\n--- 2. Seeding: Datos Dependientes (Usuario, Espacio) ---");
        
        // DEV3: Usuario (Depende de TipoUsuario)
        let usuarioAdmin = await usuarioService.findOneBy?.({ email: 'admin@uleam.edu.ec' } as any);
        if (!usuarioAdmin) {
            usuarioAdmin = await usuarioService.create({ 
                email: 'admin@uleam.edu.ec', 
                password_hash: 'hash_seguro_123', 
                nombre: 'Juan', 
                apellido: 'Perez', 
                tipo_usuario_id: ids.tipoUsuarioAdminId 
            });
            console.log(`✅ Creado Usuario: ${usuarioAdmin.email} (ID: ${usuarioAdmin.id})`);
        } else {
            console.log(`ℹ️ Usuario existente: ${usuarioAdmin.email} (ID: ${usuarioAdmin.id})`);
        }
        ids.usuarioAdminId = usuarioAdmin.id;

        // DEV1: Espacio (Depende de CategoriaEspacio y Ubicacion)
        let espacioAula = await espacioService.findOneBy({ codigo: 'A-201' });
        if (!espacioAula) {
            espacioAula = await espacioService.create({
                codigo: 'A-201',
                nombre: 'Aula Magna de Informática',
                capacidad_maxima: 50,
                categoria_id: ids.categoriaAulaId,
                ubicacion_id: ids.ubicacionEdificioId,
                estado: 'ACTIVO'
            });
            console.log(`✅ Creado Espacio: ${espacioAula.nombre} (ID: ${espacioAula.id})`);
        } else {
            console.log(`ℹ️ Espacio existente: ${espacioAula.nombre} (ID: ${espacioAula.id})`);
        }
        ids.espacioAulaId = espacioAula.id;


        // --------------------------------------------------------------------
        // 4. PRUEBA TRANSACCIONAL (Reserva y Notificación)
        // --------------------------------------------------------------------
        console.log("\n--- 3. Prueba Transaccional: Creación de Reserva y Notificación ---");

        // DEV3: Reserva (Depende de Usuario, Espacio, TipoEvento, EstadoReserva)
        const nuevaReserva = await reservaService.create({
            usuario_id: ids.usuarioAdminId,
            espacio_id: ids.espacioAulaId,
            tipo_evento_id: ids.tipoEventoClaseId,
            estado_id: ids.estadoPendienteId,
            fecha: new Date(),
            hora_inicio: '10:00:00',
            hora_fin: '12:00:00',
            titulo: 'Clase de Programación Web',
            num_asistentes: 30
        });
        console.log(`✅ Creada Reserva: ${nuevaReserva.titulo} (Código: ${nuevaReserva.codigo})`);

        // DEV2: Notificacion (Depende de Usuario, Reserva, Espacio)
        const notificacionReserva = await notificacionService.create({
            usuario_id: ids.usuarioAdminId,
            reserva_id: nuevaReserva.id,
            espacio_id: ids.espacioAulaId,
            tipo: 'RESERVA',
            titulo: 'Reserva Creada Exitosamente',
            mensaje: `Tu reserva ${nuevaReserva.codigo} ha sido enviada para aprobación.`,
        });
        console.log(`✅ Creada Notificación para Usuario ${ids.usuarioAdminId} (ID: ${notificacionReserva.id})`);


        // --------------------------------------------------------------------
        // 5. DEMOSTRACIÓN CRUD COMPLETO (Usando Reserva como ejemplo)
        // --------------------------------------------------------------------
        console.log("\n--- 4. Demostración CRUD (Entidad Reserva) ---");

        // FIND ALL (2. findAll())
        const todasReservas = await reservaService.findAll();
        console.log(`\n📋 [FIND ALL]: Total de Reservas en DB: ${todasReservas.length}`);
        console.log(`   Primera Reserva (relaciones cargadas): ${todasReservas[0].usuario.nombre} - ${todasReservas[0].espacio.nombre} - Estado: ${todasReservas[0].estado.nombre}`);

        // FIND ONE (3. findOne())
        const reservaEncontrada = await reservaService.findOne(nuevaReserva.id);
        console.log(`\n🔎 [FIND ONE]: Reserva ID ${reservaEncontrada?.id} encontrada:`);
        console.log(`   Título: ${reservaEncontrada?.titulo}`);

        // UPDATE (4. update())
        const estadoAprobada = await estadoReservaService.findOneBy({ nombre: 'APROBADA' });
        const reservaActualizada = await reservaService.update(nuevaReserva.id, { estado_id: estadoAprobada?.id, titulo: 'Clase de Programación WEB (APROBADA)' });
        console.log(`\n🔄 [UPDATE]: Reserva ID ${reservaActualizada?.id} actualizada.`);
        console.log(`   Nuevo Título: ${reservaActualizada?.titulo}. Nuevo Estado ID: ${reservaActualizada?.estado_id}`);
        
        // UPDATE de Notificación (demostrando lógica de negocio)
        const notificacionLeida = await notificacionService.update(notificacionReserva.id, { leida: true });
        console.log(`\n🔄 [UPDATE]: Notificación ID ${notificacionLeida?.id} marcada como leída en: ${notificacionLeida?.leida_at.toISOString()}`);


    // REMOVE (5. remove()) - primero eliminar dependencias (notificación)
    const notificacionEliminada = await notificacionService.remove(notificacionReserva.id);
    console.log(`\n❌ [REMOVE]: Notificación ID ${notificacionReserva.id} eliminada: ${notificacionEliminada ? 'SÍ' : 'NO'}`);

    const eliminado = await reservaService.remove(nuevaReserva.id);
    console.log(`\n❌ [REMOVE]: Reserva ID ${nuevaReserva.id} eliminada: ${eliminado ? 'SÍ' : 'NO'}`);

        const totalFinal = await reservaService.findAll();
        console.log(`   Total de Reservas restantes: ${totalFinal.length}`);
        
        console.log("\n==========================================");
        console.log("✅ DEMOSTRACIÓN COMPLETA FINALIZADA.");
        console.log("==========================================");

    } catch (error) {
        console.error("⛔ ERROR CRÍTICO DURANTE EL SEEDING O LA PRUEBA:", error);
    } finally {
        // Cierra la conexión de la DB al finalizar
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log("Conexión a la base de datos cerrada.");
        }
    }
}

main();