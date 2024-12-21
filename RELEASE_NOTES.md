# Previplus - Release Notes v1.1.0

**Fecha de Lanzamiento:** [Fecha]

---

## Descripción General

La versión v1.1.0 de **Previplus** presenta mejoras significativas sobre el MVP inicial, ampliando las funcionalidades, optimizando la seguridad y refinando la experiencia de usuario. Este lanzamiento incorpora nuevas capacidades de gestión, así como ajustes en el backend y frontend para mejorar la eficiencia y la integración del sistema.

---

## Nuevas Funcionalidades

### 1. Gestión Avanzada de Negocios
- **Actualización de Negocios:** 
  - Inclusión de campos adicionales para especificar detalles de las mutualidades y CCAF asociadas.
  - Opciones para activar o desactivar negocios sin necesidad de eliminarlos.
- **Optimización de Consultas:** Mejoras en la carga de datos de negocios vinculados al usuario autenticado.

### 2. Generación de Archivos Previred Mejorada
- **Validaciones Extensivas:** 
  - Implementación de reglas automáticas para verificar datos obligatorios antes de la generación del archivo.
  - Nuevas alertas que guían al usuario en caso de errores en los datos ingresados.
- **Historial de Archivos:** Registro de los archivos generados, incluyendo fechas y negocios asociados.

### 3. Sistema de Créditos Refinado
- **Monitoreo de Créditos:**
  - Se muestra el saldo de créditos en tiempo real en el panel de usuario.
  - Alertas automáticas al alcanzar un saldo crítico.
- **Proceso de Compra Mejorado:** 
  - Integración de flujos más simples para adquirir créditos desde el frontend.

### 4. Seguridad Mejorada
- **Autenticación JWT Refinada:** 
  - Incorporación de tiempos de expiración ajustables y verificación periódica del estado del token.
- **Cifrado Avanzado:**
  - Mejoras en la encriptación de datos sensibles, cumpliendo con los estándares más recientes de seguridad.
  
### 5. Experiencia de Usuario
- **Frontend Optimizado:**
  - Rediseño del dashboard con secciones más claras y accesibles.
  - Navegación responsiva optimizada para dispositivos móviles.
- **Soporte a Usuarios:** Incorporación de un sistema de ayuda con tutoriales básicos para el uso del sistema.

---

## Limitaciones y Áreas de Desarrollo

### Limitaciones
1. **Integraciones de Terceros:** 
   - No incluye soporte directo para sincronización con ERP o sistemas contables externos.
2. **Reportes Avanzados:** 
   - Las vistas gráficas de estadísticas están planeadas para próximas versiones.
3. **Seguridad Avanzada:** 
   - Autenticación multifactor (MFA) sigue en desarrollo.

### Áreas en Desarrollo
1. **Optimización de Pruebas:** Cobertura ampliada con Jest para pruebas de extremo a extremo.
2. **Soporte Multilingüe:** En progreso para ampliar el alcance de la plataforma.

---

## Próximos Pasos

### 1. Mejoras de Funcionalidades
- **Reportes Visuales:**
  - Incorporar estadísticas gráficas para facilitar la interpretación del uso del sistema.
- **Gestión de Archivos:**
  - Añadir la opción de descargar y eliminar archivos generados desde el historial.

### 2. Expansión de Seguridad
- **Autenticación Multifactor (MFA):**
  - Implementación de MFA para cuentas administradoras.
- **Auditorías de Accesos:** 
  - Log detallado de todas las operaciones realizadas por usuarios.

### 3. Sincronización con Sistemas Externos
- **Importación y Exportación:** 
  - Compatibilidad con formatos CSV y XLSX para una carga masiva de datos.
- **Integración con ERP:** Planificada para permitir la sincronización bidireccional.

---

## Notas Técnicas

- **Lenguaje:** TypeScript.
- **Frameworks:**
  - **Backend:** Node.js con TypeORM.
  - **Frontend:** React con Vite y Chakra UI.
- **Base de Datos:** PostgreSQL con cifrado AES.
- **Pruebas:** Ampliación de cobertura de pruebas automatizadas para flujos críticos con Jest.
- **Infraestructura:** Listo para despliegue en entornos locales y en la nube.

---

## Comentarios y Feedback

Tu opinión sigue siendo clave en nuestra misión de mejorar **Previplus**. Invitamos a todos los usuarios a probar esta versión y proporcionar sugerencias que nos permitan priorizar nuevas funcionalidades y mejoras en futuras versiones.

¡Gracias por confiar en **Previplus** para la gestión de tus cotizaciones previsionales!