# Sistema de Reservas ULEAM – TypeORM + SQLite

## 📘 Descripción General

Este proyecto implementa un **sistema de reservas de espacios universitarios** (estadio, paraninfo, auditorios, etc.) dentro de la Universidad Laica Eloy Alfaro de Manabí (ULEAM).
Desarrollado con **Node.js**, **TypeScript** y **TypeORM**, el sistema gestiona usuarios, tipos de usuarios, reservas, notificaciones y bloqueos de espacios.

Incluye:

* Estructura de entidades con relaciones.
* Base de datos **SQLite** para desarrollo local.
* Script de **seeding automático** en `main.ts`.
* Configuración lista para desplegar en otros SGBD (PostgreSQL, MySQL, etc.).

---

## 🏗️ Estructura del Proyecto

```
typeorm-uleam-reservas/
├── package.json
├── tsconfig.json
├── uleam_reservas.sqlite
├── src/
│   ├── main.ts
│   ├── data-source.ts
│   ├── entities/
│   │   ├── Usuario.ts
│   │   ├── TipoUsuario.ts
│   │   ├── Reserva.ts
│   │   ├── Espacio.ts
│   │   ├── Notificacion.ts
│   │   ├── BloqueoEspacio.ts
│   └── seed/
│       ├── seedData.ts
│       └── seedUtils.ts
└── README.md
```

---

## 🧩 Entidades y Relaciones

### 1. **Usuario**

Representa a las personas registradas en el sistema.

| Campo          | Tipo     | Descripción                 |
| -------------- | -------- | --------------------------- |
| id             | number   | Identificador único         |
| nombre         | string   | Nombre completo del usuario |
| correo         | string   | Correo institucional        |
| contraseña     | string   | Contraseña encriptada       |
| tipoUsuario    | relación | Relación con `TipoUsuario`  |
| reservas       | relación | Relación con `Reserva`      |
| notificaciones | relación | Relación con `Notificacion` |

**Relaciones:**

* Muchos `Usuario` → Un `TipoUsuario`
* Un `Usuario` → Muchas `Reservas`
* Un `Usuario` → Muchas `Notificaciones`

---

### 2. **TipoUsuario**

Define el rol o perfil del usuario dentro del sistema (Administrador, Docente, Estudiante).

| Campo    | Tipo     | Descripción                           |
| -------- | -------- | ------------------------------------- |
| id       | number   | Identificador único                   |
| nombre   | string   | Tipo de usuario (Ej. "Administrador") |
| usuarios | relación | Usuarios asociados a este tipo        |

**Relaciones:**

* Un `TipoUsuario` → Muchos `Usuarios`

---

### 3. **Espacio**

Representa los lugares disponibles para reservar (auditorios, estadio, aulas, etc.).

| Campo     | Tipo     | Descripción                    |
| --------- | -------- | ------------------------------ |
| id        | number   | Identificador único            |
| nombre    | string   | Nombre del espacio             |
| ubicación | string   | Lugar físico dentro del campus |
| capacidad | number   | Capacidad máxima               |
| reservas  | relación | Reservas asociadas             |
| bloqueos  | relación | Bloqueos realizados            |

**Relaciones:**

* Un `Espacio` → Muchas `Reservas`
* Un `Espacio` → Muchos `BloqueosEspacio`

---

### 4. **Reserva**

Registro de una reserva de espacio por parte de un usuario.

| Campo       | Tipo     | Descripción                    |
| ----------- | -------- | ------------------------------ |
| id          | number   | Identificador único            |
| fechaInicio | Date     | Fecha y hora de inicio         |
| fechaFin    | Date     | Fecha y hora de fin            |
| usuario     | relación | Usuario que realiza la reserva |
| espacio     | relación | Espacio reservado              |

**Relaciones:**

* Muchos `Reservas` → Un `Usuario`
* Muchas `Reservas` → Un `Espacio`

---

### 5. **BloqueoEspacio**

Registra bloqueos temporales de espacios (por mantenimiento o eventos).

| Campo       | Tipo     | Descripción                        |
| ----------- | -------- | ---------------------------------- |
| id          | number   | Identificador único                |
| motivo      | string   | Razón del bloqueo                  |
| fechaInicio | Date     | Fecha y hora de inicio del bloqueo |
| fechaFin    | Date     | Fecha y hora de fin del bloqueo    |
| espacio     | relación | Espacio afectado                   |

**Relaciones:**

* Muchos `BloqueoEspacio` → Un `Espacio`

---

### 6. **Notificacion**

Mensajes automáticos enviados a los usuarios sobre sus reservas.

| Campo   | Tipo     | Descripción                  |
| ------- | -------- | ---------------------------- |
| id      | number   | Identificador único          |
| mensaje | string   | Contenido de la notificación |
| fecha   | Date     | Fecha de envío               |
| usuario | relación | Usuario destinatario         |

**Relaciones:**

* Muchas `Notificaciones` → Un `Usuario`

---

## ⚙️ Instalación y Configuración

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/<usuario>/typeorm-uleam-reservas.git
cd typeorm-uleam-reservas
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Compilar el proyecto TypeScript

```bash
npm run build
```

### 4️⃣ Ejecutar el seeding (main.ts)

El archivo `src/main.ts` inicializa la base de datos, sincroniza las entidades y ejecuta el **script de seeding** para crear datos iniciales.

#### Ejecución con ts-node (modo desarrollo)

```bash
npx ts-node src/main.ts
```

#### Ejecución en modo compilado

```bash
node dist/main.js
```

Esto generará la base de datos `uleam_reservas.sqlite` con registros iniciales.

---

## 🧪 Script de Seeding (`main.ts`)

El archivo `main.ts` realiza los siguientes pasos:

1. Importa la configuración de `data-source.ts`.
2. Conecta la base de datos.
3. Sincroniza las entidades.
4. Inserta datos iniciales para:

   * `TipoUsuario` (Administrador, Docente, Estudiante)
   * `Usuario` (usuarios de ejemplo)
   * `Espacio` (auditorios, estadio, etc.)
   * `Reserva` (reservas simuladas)
5. Cierra la conexión.

Ejemplo de salida en consola:

```
Conexión establecida correctamente.
Datos iniciales insertados con éxito.
Base de datos uleam_reservas.sqlite generada.
```

---

## 🧱 Dependencias Principales

| Paquete              | Descripción                                             |
| -------------------- | ------------------------------------------------------- |
| **typeorm**          | ORM principal para entidades y relaciones               |
| **sqlite3**          | Driver de base de datos                                 |
| **typescript**       | Lenguaje base del proyecto                              |
| **ts-node**          | Ejecución de archivos TypeScript sin compilación previa |
| **reflect-metadata** | Soporte de decoradores para TypeORM                     |

---

## 🚀 Ejecución Rápida

```bash
npm install
npx ts-node src/main.ts
```

El sistema generará automáticamente la base `uleam_reservas.sqlite` con los datos iniciales.

---

## 📄 Licencia

Proyecto académico desarrollado para la **Universidad Laica Eloy Alfaro de Manabí (ULEAM)**
Facultad de Ingeniería – Carrera de Software.
Uso educativo y libre distribución con fines académicos.

---
