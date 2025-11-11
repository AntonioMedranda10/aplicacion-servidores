# Sistema de Reservas para Canchas Deportivas - Manta

## Descripción del Proyecto

**ReservaManta** es un sistema web de reservas para canchas y espacios deportivos diseñado específicamente para la ciudad de Manta, Ecuador. La aplicación permite a los deportistas locales reservar de forma sencilla canchas de fútbol, vóley, básquet y otros deportes en horarios específicos.

### Problemática que Resuelve en Manta

Manta, como ciudad costera con gran tradición deportiva, enfrenta la problemática de la desorganización en el uso de espacios deportivos públicos y privados. Los deportistas locales a menudo encuentran canchas ocupadas, generando conflictos y pérdida de tiempo. Nuestro sistema digitaliza y organiza este proceso, optimizando el uso de la infraestructura deportiva disponible.

## Equipo de Desarrollo

-Yeiker Lopez
-Antonio Medranda
-Angel Conforme

##  Stack Tecnológico

**Framework:** React 18 con TypeScript  
**Justificación:** Elegimos React por su excelente ecosistema, comunidad activa y capacidad para crear interfaces interactivas dinámicas. TypeScript nos proporciona tipado estático para mayor robustez del código.

### Tecnologías Utilizadas
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsivo con Flexbox y Grid
- **TypeScript**: Lógica de aplicación con tipado fuerte
- **React**: Framework para componentes interactivos
- **Vite**: Herramienta de build rápida
- **Tailwind CSS**: Framework CSS para diseño rápido

##  Instalación y Ejecución

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de Instalación

```bash

cd practica1

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en navegador
# La aplicación se ejecutará en http://localhost:5173
```

### Scripts Disponibles
- `npm run dev`: Inicia servidor de desarrollo
- `npm run build`: Construye versión de producción

##  Funcionalidades Principales

###  Sistema de Autenticación
- Registro e inicio de sesión simulado
- Validación de formularios en tiempo real
- Persistencia de sesión en localStorage
- **Demo**: Email: `demo@reservamanta.com`, Contraseña: `demo123`

###  Gestión de Canchas
- Catálogo de canchas por categorías (Fútbol, Vóley, Básquet)
- Información detallada de cada cancha
- Imágenes representativas de espacios deportivos

### Sistema de Reservas
- Calendario interactivo con disponibilidad en tiempo real
- Confirmación de reserva con detalles y precios
- Historial de reservas personales

### Gestión de Usuario
- Perfil personalizable con estadísticas
- Panel de reservas activas y canceladas
- Configuración de preferencias y notificaciones

### Diseño Responsivo
- Optimizado para móviles
- Navegación táctil intuitiva
- Carga rápida de imágenes

## Contexto Local - Manta

### Espacios Deportivos Incluidos
- **Cancha Central Malecón**: Fútbol con vista al océano Pacífico
- **Vóley Playa Los Esteros**: Cancha de vóley en arena natural
- **Básquet Universidad Laica**: Instalaciones universitarias cubiertas
- **Fútbol 7 Barbasquillo**: Cancha de césped natural
- **Vóley Municipal Tarqui**: Instalación pública con piso sintético

### Oportunidad de Mercado
- **Target**: Deportistas de 16-45 años en Manta y zona metropolitana
- **Ventaja competitiva**: Enfoque local con conocimiento específico de Manta
- **Impacto esperado**: Mejor organización de espacios deportivos públicos

## Capturas de Pantalla

### Página Principal
- Canchas destacadas de Manta
- Categorías deportivas disponibles

### Catálogo de Canchas  
- Información detallada: ubicación, precio, capacidad
- Sistema de búsqueda y ordenamiento

### Detalle y Reserva
- Galería de imágenes de la cancha
- Calendario interactivo con disponibilidad
- Formulario de reserva con validaciones
- Confirmación instantánea

### Panel de Usuario
- Dashboard con estadísticas personales
- Lista de reservas activas y historial
- Edición de perfil con validaciones
- Configuración de preferencias

## Funcionalidades Técnicas

### Datos Mock Realistas
- Base de datos simulada con 6 canchas de Manta
- Sistema de horarios con disponibilidad dinámica
- Usuarios de prueba para testing

### Validaciones Frontend
- Formularios con validación en tiempo real
- Prevención de reservas en horarios ocupados
- Validación de email y contraseñas seguras
- Mensajes de error

### Estado de Aplicación
- Gestión de estado 
- Simulación de API 
- Manejo de loading 

### Arquitectura de Componentes
- Componentes reutilizables
- Separación clara de responsabilidades
- Custom hooks para lógica de negocio
- Tipado con TypeScript

conclusiones:

Durante el desarrollo de la practica fue un poco complicado elegir un tema, la logica del negocio, y entender bien cómo manejar los componentes, pero con práctica y trabajo en equipo lo logramos.
Aplicamos lo que aprendimos sobre HTML, CSS y lógica con TypeScript, además de usar herramientas modernas como Vite y Tailwind. Aunque el tiempo fue limitado, conseguimos implementar las funciones principales del sistema de reservas y dejarlo funcionando correctamente.
En general, estuvo buena la practica porque aprendimos a organizarnos, dividir tareas para poder completarlo.Logramos cumplir los objetivos de la rubrica y poder entregar en el tiempo que era.

###  Demo de Acceso

Para probar la aplicación sin registrarse:
- **Email**: demo@reservamanta.com
- **Contraseña**: demo123