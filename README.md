# PreviPlus

PreviPlus es una plataforma para la gestión de cotizaciones previsionales, diseñada para pequeñas empresas o empleadores que requieren calcular, administrar y generar archivos Previred compatibles, a partir de los datos de sus trabajadores y los créditos disponibles. El sistema cuenta con un panel de control para gestionar negocios, trabajadores y archivos Previred, todo a través de una interfaz amigable y segura.

## Tabla de Contenidos

- [Características Principales](#características-principales)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Gestión de Créditos](#gestión-de-créditos)
- [Autenticación y Seguridad](#autenticación-y-seguridad)
- [Despliegue](#despliegue)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Características Principales

- **Gestión de Usuarios**: Registro, inicio de sesión y gestión de sesiones con autenticación JWT.
- **Gestión de Negocios**: Crear, editar y eliminar negocios.
- **Gestión de Trabajadores**: Asignar y gestionar trabajadores por negocio.
- **Generación de Archivos Previred**: Cálculo de cotizaciones previsionales y generación de archivos TXT con los 105 campos requeridos por Previred.
- **Sistema de Créditos**: Compra de créditos para poder generar archivos Previred.
- **Panel de Control**: Acceso a estadísticas y gestión de créditos, negocios y archivos Previred.

## Requisitos

- **Node.js** versión 14 o superior
- **PostgreSQL** versión 12 o superior
- **NPM** versión 6 o superior

## Instalación

1. Clona el repositorio:

   - git clone https://github.com/tuusuario/previplus.git
   - cd previplus

2. Instala las dependencias para el backend:

   - cd backend
   - npm install

3. Instala las dependencias para el frontend:

   - cd ../frontend
   - npm install

## Configuración

### Backend

1. Crea un archivo `.env` en la carpeta `backend` con las siguientes variables de entorno:

   - PORT=3000
   - DB_HOST=localhost
   - DB_PORT=5432
   - DB_USERNAME=tuusuario
   - DB_PASSWORD=tupassword
   - DB_NAME=previplus
   - JWT_SECRET=tu_secret

2. Configura la base de datos PostgreSQL con las migraciones de TypeORM:

   - npm run migration:run

### Frontend

1. Crea un archivo `.env` en la carpeta `frontend` con las siguientes variables de entorno:

   - VITE_API_URL=http://localhost:3000/api

## Uso

### Backend

1. Inicia el servidor del backend:

   - cd backend
   - npm start

2. El servidor backend estará corriendo en `http://localhost:3000`.

### Frontend

1. Inicia el servidor del frontend:

   - cd frontend
   - npm run dev

2. El frontend estará corriendo en `http://localhost:5173`.

## API Endpoints

Algunos de los principales endpoints de la API son:

- `POST /api/usuarios/login`: Autenticación de usuarios.
- `GET /api/usuarios/me`: Obtener el perfil del usuario autenticado.
- `POST /api/negocios`: Crear un nuevo negocio.
- `GET /api/negocios`: Obtener la lista de negocios del usuario autenticado.
- `POST /api/trabajadores`: Asignar un trabajador a un negocio.

## Gestión de Créditos

- **Compra de créditos**: Los usuarios pueden comprar créditos que se deducen cada vez que se genera un archivo Previred.
- **Verificación de saldo**: El sistema verifica si el usuario tiene créditos suficientes antes de permitir la generación de archivos Previred.

## Autenticación y Seguridad

- **Autenticación JWT**: Utiliza JSON Web Tokens (JWT) para manejar la autenticación de usuarios.
- **Cookies HTTP-Only**: El JWT se almacena en una cookie `httpOnly` para mayor seguridad.
- **Verificación de tokens**: Los tokens se verifican en cada solicitud a rutas protegidas.

## Despliegue

Para desplegar PreviPlus en un entorno de producción:

1. Asegúrate de configurar las variables de entorno adecuadamente en tu servidor de producción.
2. Usa un administrador de procesos como `PM2` para ejecutar el backend.

## Contribuir

¡Contribuciones son bienvenidas! Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Mira el archivo [LICENSE](LICENSE) para más detalles.