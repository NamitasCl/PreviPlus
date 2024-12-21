# Changelog

## [Unreleased]

---

## [v1.3.0] - 2024-12-18

### Backend

- **Migración Completa a TypeScript:**
  - Transición del backend de JavaScript a TypeScript para mejor tipificación y mantenibilidad.
  - Refactorización de controladores, servicios y entidades para aprovechar el tipado estático.
  - Eliminación de archivos legacy de JavaScript.

- **Mejoras en la Arquitectura:**
  - Implementación de un servicio centralizado `AppDataSource` para la conexión y gestión de PostgreSQL.
  - Introducción de `docker-compose` para configurar entornos de desarrollo con base de datos.
  - Refactorización de lógica en servicios para simplificar controladores.

- **Nueva Configuración de Pruebas:**
  - Integración de Jest para pruebas unitarias e integración en TypeScript.
  - Configuración de `jest.config.ts` para soporte de transformaciones y alias.
  - Pruebas automatizadas para `UsuarioService` y `ArchivoPreviredService`.

- **Actualización en la Generación de Archivos Previred:**
  - Creación de una clase de servicio para gestionar la generación de archivos Previred.
  - Validaciones exhaustivas para garantizar la calidad de los datos.
  - Registro y trazabilidad de archivos generados.

### Frontend

- **Mejoras en el Dashboard:**
  - Interfaz actualizada para reflejar nuevas funcionalidades, como generación de archivos y estadísticas detalladas.
  - Validación en tiempo real en formularios para mejorar la experiencia del usuario.
  - Inclusión de mensajes de error descriptivos y guías durante el uso.

- **Nueva Sección de Generación de Archivos:**
  - Rediseño completo de la vista para facilitar la generación de archivos Previred.
  - Función de previsualización de datos antes de la generación.

### Infraestructura

- **Docker:**
  - Configuración de `docker-compose` para manejar contenedores de desarrollo.
  - Mapeo de volúmenes para persistencia de datos entre reinicios.

### Seguridad

- **Optimización de Autenticación JWT:**
  - Uso de cookies HTTP-Only para almacenar tokens de sesión, mejorando la seguridad.
  - Validaciones adicionales para prevenir entradas maliciosas.

---

## [v1.2.0] - 2024-10-17

### Backend

- **Actualización de Entidades:**
  - Renombramiento de campos en la entidad `Negocio`:
    - `nombre` a `name`.
    - `direccion` a `address`.
    - `rut_empresa` a `businessRut`.
  - Adición del campo `isActive` para gestionar el estado de los negocios.

- **Gestión de Créditos y Archivos Previred:**
  - Implementación de compra de créditos y deducción automática al generar archivos.
  - Generación de archivos TXT conforme a los 105 campos requeridos.

- **Mejoras en la Autenticación:**
  - Uso de cookies HTTP-Only para el almacenamiento de tokens JWT.
  - Middleware para validar tokens JWT en rutas protegidas.

### Frontend

- **Persistencia de Sesión:**
  - Uso de `localStorage` para mantener la sesión activa y verificar JWT al recargar.
  - Validación de autenticación en rutas protegidas.

- **Dashboard Mejorado:**
  - Nuevas vistas para `Perfil` y `Negocios`, incluyendo estadísticas detalladas.
  - Componentes de Chakra UI para un diseño más profesional.

- **Protección de Rutas:**
  - Sistema para proteger rutas privadas y redirigir al login si no hay autenticación.

---

## [v1.1.0] - 2024-10-15

### Backend

- **Sistema de Gestión de Usuarios y Negocios:**
  - CRUD para `Usuario` y `Negocio`.
  - Relación uno-a-muchos entre usuarios y negocios.

- **Autenticación con JWT:**
  - Implementación inicial de autenticación con JSON Web Tokens.
  - Uso de cookies HTTP-Only para mayor seguridad.

- **Gestión de Trabajadores y Archivos:**
  - CRUD para trabajadores.
  - Generación de archivos Previred en formato estándar.

### Frontend

- **Inicio del Dashboard:**
  - Creación de componentes para manejo de negocios, trabajadores y créditos.
  - Layout inicial con Chakra UI.

- **Autenticación:**
  - Gestión de sesión con `UserContext`.
  - Protección de rutas privadas con React Router DOM.

---

## [v1.0.0] - 2024-10-10

### Backend

- **Configuración Inicial:**
  - Instalación y configuración de TypeORM con PostgreSQL.
  - Definición de entidades base (`Usuario`, `Negocio`, `Trabajador`).
  - Configuración de autenticación con JWT.

- **Relaciones entre Entidades:**
  - Relación uno-a-muchos entre `Usuario` y `Negocio`.
  - Relación uno-a-muchos entre `Negocio` y `Trabajador`.

### Frontend

- **Landing Page y Login:**
  - Desarrollo de la página principal con opciones de login y registro.
  - Formulario de login inicial.

- **Interfaz de Usuario:**
  - Uso de Chakra UI para diseño inicial.
  - Configuración de rutas privadas para acceso al dashboard.

---

Este changelog detalla la evolución de **PreviPlus** desde su creación hasta la versión más reciente, destacando mejoras significativas en funcionalidad, seguridad y experiencia de usuario.
