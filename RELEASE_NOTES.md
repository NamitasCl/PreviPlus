# Release Notes

## Versión 1.0.0 - Lanzamiento Inicial

- **Fecha:** 15 de octubre de 2024

### Lo nuevo
- Lanzamiento inicial de **Previplus**, una plataforma para la gestión de cotizaciones previsionales.
- **Backend**:
  - Configuración inicial con **TypeORM** y **PostgreSQL**.
  - CRUD para entidades clave: `Usuario`, `Negocio`, y `Trabajador`.
  - Autenticación segura utilizando **JWT**.
  - Generación de archivos Previred en formato estándar.
- **Frontend**:
  - Landing Page con opciones de registro e inicio de sesión.
  - Dashboard inicial para gestión de datos.
  - Protección de rutas privadas con **React Router DOM**.

### Bug fixes
- No aplica, ya que es el lanzamiento inicial.

### How to upgrade
- No aplica, ya que es el lanzamiento inicial.

### Deprecated
- No hay elementos marcados como obsoletos en esta versión.

---

## Versión 1.1.0 - Mejoras de Seguridad y Gestión

- **Fecha:** 17 de octubre de 2024

### Lo nuevo
- **Backend**:
  - Refuerzo en las relaciones entre entidades para mejorar la trazabilidad.
  - Validaciones iniciales en la generación de archivos Previred.
  - Manejo seguro de JWT mediante cookies HTTP-Only.
- **Frontend**:
  - Persistencia de sesión utilizando `localStorage`.
  - Nuevas vistas para gestión de perfiles y negocios.
  - Mejoras en la usabilidad del dashboard mediante componentes reutilizables.

### Bug fixes
- Corrección de errores en el proceso de autenticación para evitar sesiones expiradas prematuramente.
- Resolución de inconsistencias en el manejo de datos de trabajadores en el dashboard.

### How to upgrade
1. Actualiza las dependencias del proyecto utilizando `npm install`.
2. Ejecuta las migraciones de la base de datos para aplicar los cambios en las relaciones:
   ```bash
   npm run typeorm migration:run
   ```
3. Reinicia los servicios del backend y frontend.

### Deprecated
- El esquema anterior de persistencia de JWT mediante encabezados, reemplazado por cookies HTTP-Only.

---

## Versión 1.2.0 - Créditos y Métricas

- **Fecha:** 19 de octubre de 2024

### Lo nuevo
- **Backend**:
  - Implementación de un sistema de créditos para controlar la generación de archivos Previred.
  - Optimización de consultas SQL para mejorar el rendimiento con usuarios autenticados.
- **Frontend**:
  - Sección de métricas y estadísticas en el dashboard: créditos, negocios activos y archivos generados.
  - Rediseño de componentes del dashboard con **Chakra UI** para mejorar la experiencia de usuario.

### Bug fixes
- Solución de errores en la validación de datos para la generación de archivos Previred.
- Corrección de fallos en la carga de gráficos estadísticos en el dashboard.

### How to upgrade
1. Actualiza las dependencias del proyecto:
   ```bash
   npm install
   ```
2. Asegúrate de que las migraciones estén sincronizadas:
   ```bash
   npm run typeorm migration:run
   ```
3. Reinicia los servicios del sistema.

### Deprecated
- El sistema de créditos será reemplazado por un sistema de membresía en versiones futuras.

---

## Versión 1.3.0 - Ajustes y Mejoras Continuas

- **Fecha:** 15 de noviembre de 2024

### Lo nuevo
- **Backend**:
  - Incorporación de validaciones adicionales en el sistema de generación de archivos Previred.
  - Mejora en la estructura de la base de datos, con nuevas relaciones y normalización de tablas.
  - Inclusión de servicios para actualizar trabajadores por RUT y manejar datos más dinámicos.
- **Frontend**:
  - Ajuste en las vistas del historial de archivos Previred para incluir filtros por negocio y mes.
  - Mejoras en la experiencia del usuario al navegar entre secciones protegidas.
  - Actualización de estilos para componentes clave del dashboard.

### Bug fixes
- Resolución de problemas menores en el manejo de sesiones expuestas al refrescar la página.
- Corrección de errores en los cálculos previsionales para casos límite.

### How to upgrade
1. Actualiza las dependencias del proyecto:
   ```bash
   npm install
   ```
2. Asegúrate de que las migraciones estén sincronizadas:
   ```bash
   npm run typeorm migration:run
   ```
3. Reinicia los servicios del sistema.

### Deprecated
- El antiguo sistema de validaciones manuales de datos ha sido reemplazado por validaciones automáticas y más robustas.

---

## Versión 1.4.0 - Transición a Membresías

- **Fecha:** 8 de diciembre de 2024

### Lo nuevo
- **Backend**:
  - Eliminación completa del sistema de créditos.
  - Implementación inicial del sistema de membresías, utilizando un controlador provisional.
  - Nuevas migraciones para manejar estados de membresías en la base de datos.
- **Frontend**:
  - Ajustes en la interfaz para reflejar el cambio a membresías.
  - Inclusión de un banner informativo sobre el sistema de membresías y sus beneficios.

### Bug fixes
- Solución de errores en el flujo de validación de datos durante la transición de créditos a membresías.
- Ajustes en la interfaz de usuario para manejar dinámicamente los mensajes de error relacionados con membresías.

### How to upgrade
1. Elimina cualquier dato relacionado con créditos en la base de datos.
2. Aplica las nuevas migraciones para manejar estados de membresía:
   ```bash
   npm run typeorm migration:run
   ```
3. Reinicia los servicios y prueba el flujo completo de membresías.

### Deprecated
- El sistema de créditos ha sido completamente eliminado en favor de las membresías.