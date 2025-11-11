# 📘 Sistema de Reservas Universitarias (ULEAM)

Este proyecto implementa un **módulo de reservas** para la Universidad Laica Eloy Alfaro de Manabí (ULEAM), enfocado en la administración de espacios como canchas, auditorios, salas de cine y otros lugares disponibles.

Se desarrolló en **TypeScript con Node.js**, aplicando una arquitectura limpia y utilizando diferentes **paradigmas de asincronía** (Callbacks, Promises y Async/Await).

---

## 👨‍💻 Integrantes y Contribuciones

* **Ángel Conforme Anchundia**

  * Diseño de entidades principales.
  * Documentación del proyecto.
* **Yeiker Lopez**
  * Implementación del CRUD de reservas.
* **Ántonio Medranda**
  * Manejo de asincronía con **Callbacks, Promises y Async/Await**.



---

## 🏗️ Arquitectura del Sistema

El sistema se diseñó siguiendo un **modelo modular con separación de capas**:

* **Domain**

  * Definición de entidades (`IReserva`) y excepciones (`ReservaError`).

* **Infrastructure**

  * Implementación de repositorio en memoria (`ReservaRepositoryInMemory`).

* **Application**

  * Lógica de negocio y casos de uso (`ReservaService`).

* **Interface (main.ts)**

  * Punto de entrada para ejecutar pruebas funcionales del CRUD.

📌 **Ventaja:** esta arquitectura permite reemplazar fácilmente la persistencia en memoria por una base de datos real (SQL, NoSQL) sin afectar la lógica del dominio.

---

## ⚙️ Instrucciones de Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tuusuario/reservas-universitarias.git
   cd reservas-universitarias
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Compilar el proyecto:

   ```bash
   npm run build
   ```

---

## ▶️ Instrucciones de Ejecución

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Ejecutar versión compilada:

```bash
node dist/main.js
```

---

## 📑 Documentación de APIs

El sistema expone un servicio de reservas con operaciones CRUD:

### Métodos implementados

* **create(reservaData, callback)**
  📌 Inserta una nueva reserva usando *callbacks*.

  * Maneja validaciones de negocio (conflictos de horario, solapamientos).

* **findAll()**
  📌 Retorna todas las reservas almacenadas en memoria (*async/await*).

* **findById(id)**
  📌 Retorna una reserva por su ID (*async/await*).

* **update(id, updateData)**
  📌 Modifica atributos de una reserva existente (*promises*).

* **delete(id)**
  📌 Elimina una reserva del sistema (*async/await*).

---

## 🔄 Paradigmas Implementados

El proyecto implementa **tres paradigmas asíncronos en Node.js**:

1. **Callbacks** → método `create()`
2. **Promises** → método `update()`
3. **Async/Await** → métodos `findById()`, `findAll()`, `delete()`

---

## 🖼️ Evidencias de Funcionamiento

### Ejemplo de creación exitosa

```
✅ CREACIÓN EXITOSA (CALLBACKS): ID: 1234-5678, Estado: pendiente
```

### Ejemplo de validación de solapamiento

```
⚠️ VALIDACIÓN EXITOSA (CALLBACKS): Conflicto de horarios detectado.
```

### Ejemplo de consulta

```
✅ CONSULTA ALL EXITOSA: Total de 2 reservas encontradas.
```

### Ejemplo de actualización

```
✅ UPDATE EXITOSO (PROMISES): ID: 1234-5678, Nuevo Estado: confirmada
```

### Ejemplo de eliminación

```
✅ DELETE EXITOSO (ASYNC/AWAIT): Reserva con ID 1234-5678 eliminada.
```

📌 Se recomienda adjuntar **capturas de pantalla** desde la consola en un directorio `docs/evidencias/` y referenciarlas aquí con:

```markdown
![Evidencia Creación](docs/evidencias/creacion.png)
```

---

## 📌 Conclusiones Individuales

* **Ángel Conforme Anchundia**
  La práctica me permitió reforzar conceptos de asincronía en Node.js y aplicar múltiples paradigmas en un mismo sistema. Además, comprendí cómo diseñar un módulo escalable y con separación de responsabilidades, listo para evolucionar a un backend con base de datos real.



---

## ✅ Estado del Proyecto

* CRUD completo de reservas.
* Validaciones de negocio implementadas.
* Ejecución de pruebas con diferentes paradigmas asíncronos.
* Documentación completa.
