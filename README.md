# PreviPlus

PreviPlus es una plataforma para la gestión eficiente de cotizaciones previsionales, diseñada para pequeñas empresas y empleadores que buscan calcular, administrar y generar archivos Previred compatibles. Con funcionalidades que abarcan desde la gestión de trabajadores hasta el control de créditos y generación de archivos, PreviPlus ofrece una interfaz intuitiva, segura y preparada para las necesidades actuales de las organizaciones.

## Tabla de Contenidos

- [Características Principales](#características-principales)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Uso](#uso)
  - [Backend](#backend-1)
  - [Frontend](#frontend-1)
- [API Endpoints](#api-endpoints)
- [Gestión de Créditos](#gestión-de-créditos)
- [Autenticación y Seguridad](#autenticación-y-seguridad)
- [Despliegue](#despliegue)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Características Principales

- **Gestión de Usuarios:**
  - Registro de nuevos usuarios, inicio de sesión y autenticación con JWT.
  - Seguridad mejorada con cookies HTTP-Only.

- **Gestión de Negocios:**
  - CRUD completo para crear, editar, listar y eliminar negocios.
  - Asociación de negocios a usuarios autenticados.

- **Gestión de Trabajadores:**
  - Registro y administración de trabajadores por negocio.
  - Validación y actualización de información laboral y previsional.

- **Generación de Archivos Previred:**
  - Generación automática de archivos TXT con los 105 campos requeridos por Previred.
  - Validaciones de datos para asegurar cumplimiento con estándares.

- **Sistema de Créditos:**
  - Gestión de créditos para la generación de archivos Previred.
  - Control de saldo y compras a través de la plataforma.

- **Panel de Control:**
  - Visualización de estadísticas sobre créditos, negocios activos y archivos generados.
  - Interfaz diseñada con foco en la usabilidad.

## Requisitos

- **Node.js:** Versión 14 o superior.
- **PostgreSQL:** Versión 12 o superior.
- **NPM:** Versión 6 o superior.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/previplus.git
   cd previplus
   ```

2. Instala las dependencias para el backend:
   ```bash
   cd backend
   npm install
   ```

3. Instala las dependencias para el frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Configuración

### Backend

1. Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=tuusuario
   DB_PASSWORD=tupassword
   DB_NAME=previplus
   JWT_SECRET=tu_secret
   ```

2. Configura la base de datos PostgreSQL ejecutando las migraciones de TypeORM:
   ```bash
   npm run migration:run
   ```

### Frontend

1. Crea un archivo `.env` en la carpeta `frontend` con el siguiente contenido:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

## Uso

### Backend

1. Inicia el servidor del backend:
   ```bash
   cd backend
   npm start
   ```
2. Accede al servidor en `http://localhost:3000`.

### Frontend

1. Inicia el servidor del frontend:
   ```bash
   cd frontend
   npm run dev
   ```
2. Accede al frontend en `http://localhost:5173`.

## API Endpoints

Principales endpoints disponibles:

- **Usuarios:**
  - `POST /api/usuarios/login`: Autenticación.
  - `GET /api/usuarios/me`: Información del usuario autenticado.

- **Negocios:**
  - `POST /api/negocios`: Crear negocio.
  - `GET /api/negocios`: Listar negocios del usuario.

- **Trabajadores:**
  - `POST /api/trabajadores`: Crear trabajador.
  - `GET /api/trabajadores`: Listar trabajadores por negocio.

## Gestión de Créditos

- **Compra y Deducción:** Los créditos se deducen automáticamente cada vez que se genera un archivo Previred.
- **Verificación de Saldo:** Antes de generar un archivo, el sistema valida si hay suficientes créditos disponibles.

## Autenticación y Seguridad

- **Autenticación JWT:**
  - Manejo de sesiones a través de JSON Web Tokens.
  - Uso de cookies HTTP-Only para evitar accesos no autorizados.

- **Verificación de Tokens:** Cada solicitud a rutas protegidas valida el JWT del usuario.

## Despliegue

1. Configura las variables de entorno en el servidor de producción.
2. Usa un administrador de procesos como `PM2` para ejecutar el backend.
3. Asegúrate de que PostgreSQL esté configurado y accesible.

## Contribuir

¡Tus aportes son bienvenidos! Sigue estos pasos para contribuir:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request en el repositorio principal.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.