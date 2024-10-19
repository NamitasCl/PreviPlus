# Changelog

## [Unreleased]

## [v1.2.0] - 2024-10-17
### Backend
- **Actualización de entidades `Negocio` y `Usuario`:**
  - Renombramiento de campos en la entidad `Negocio` para reflejar nombres más adecuados: `nombre` a `name`, `direccion` a `address`, `rut_empresa` a `businessRut`.
  - Se agrega un campo `isActive` para controlar el estado de los negocios.
  - Ajustes en servicios y controladores para reflejar estos cambios.
  - Optimización de consultas para obtener negocios por usuario autenticado.
  
- **Integración completa del manejo de autenticación con JWT:**
  - Implementación del login con JWT almacenado en una cookie HTTP-Only para mayor seguridad.
  - Verificación del token JWT en las rutas protegidas.
  - Creación de middleware que valida el JWT en cada solicitud y verifica la sesión del usuario.

- **Servicios de manejo de créditos y generación de archivos Previred:**
  - Implementación del sistema de compra de créditos y su gestión en la base de datos.
  - Creación de un sistema para generar archivos TXT de Previred a partir de la información almacenada.

### Frontend
- **Modificación de la lógica del `UserContext`:**
  - Implementación de persistencia de sesión del usuario usando `localStorage` y verificación del JWT al refrescar la página.
  - Validación de la autenticación del usuario al acceder a las rutas protegidas del dashboard.

- **Mejoras en el `Dashboard`:**
  - Rediseño de las vistas de `Perfil` y `Negocios` para mostrar información más detallada de los negocios y archivos Previred.
  - Uso de componentes `StatGroup` de Chakra UI para mostrar estadísticas de créditos disponibles, negocios activos y archivos Previred generados.
  - Mejoras en el estilo y la estructura de las tablas para listar negocios y archivos.

- **Optimización de rutas y protección de las mismas:**
  - Sistema robusto para proteger las rutas usando React Router DOM y el contexto de usuario.
  - Redirección automática al login si el usuario no está autenticado.

---

## [v1.1.0] - 2024-10-15
### Backend
- **Sistema de gestión de usuarios y negocios:**
  - Operaciones CRUD para usuarios y negocios usando TypeORM.
  - Relación entre `Usuario` y `Negocio` permitiendo que un usuario tenga varios negocios asociados.
  - Endpoints para autenticación y manejo de negocios.

- **Autenticación con JWT y manejo de cookies:**
  - Implementación de autenticación con JWT.
  - El token se almacena en una cookie HTTP-Only.
  - Verificación del token en cada solicitud protegida.

- **Gestión de trabajadores y archivos Previred:**
  - CRUD para la entidad `Trabajador`.
  - Generación de archivos Previred con datos de trabajadores, siguiendo el formato específico de 105 campos.

### Frontend
- **Implementación inicial del dashboard:**
  - Creación de componentes reutilizables para la interfaz del dashboard.
  - Vistas para el manejo de negocios, trabajadores y créditos.
  - Uso de Chakra UI para maquetación y diseño.

- **Manejo de autenticación en el frontend:**
  - Implementación del contexto `UserContext` para gestionar la sesión del usuario.
  - Redirección automática al login si el usuario no está autenticado.
  - Uso de React Router DOM para manejar rutas privadas.

---

## [v1.0.0] - 2024-10-10
### Backend
- **Configuración inicial del proyecto:**
  - Instalación y configuración de TypeORM con PostgreSQL.
  - Definición de entidades: `Usuario`, `Negocio`, `Trabajador`, `HistorialRemuneracion`, entre otras.
  - Implementación de servicios y controladores para gestionar las operaciones CRUD de cada entidad.
  - Configuración de JWT para manejo de autenticación y sesiones de usuario.

- **Relaciones entre entidades:**
  - Relación uno-a-muchos entre `Usuario` y `Negocio`.
  - Relación uno-a-muchos entre `Negocio` y `Trabajador`.

### Frontend
- **Creación de la landing page y el sistema de login:**
  - Desarrollo de la página principal con opciones de login y registro.
  - Implementación del formulario de login y validación con el backend.
  - Rutas privadas para restringir el acceso a usuarios autenticados.

- **Interfaz de usuario inicial:**
  - Uso de Chakra UI para diseño de la interfaz.
  - Implementación del layout del dashboard con secciones de perfil y negocios.
  - Configuración inicial del routing.