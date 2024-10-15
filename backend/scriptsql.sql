-- Tabla: usuario (Login y registro de usuarios)
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    saldo_creditos DECIMAL(10, 2) DEFAULT 0.00 -- Saldo de créditos para generar archivos Previred
);

-- Tabla: negocio (Cada usuario puede crear un negocio para asignar trabajadores)
CREATE TABLE negocio (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE, -- Eliminar el negocio si se elimina el usuario
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    rut_empresa VARCHAR(12) NOT NULL -- El RUT de la empresa
);

-- Tabla: compra_credito (Registro de compra de créditos por parte de los usuarios)
CREATE TABLE compra_credito (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE,
    cantidad_creditos DECIMAL(10, 2) NOT NULL,
    fecha_compra DATE DEFAULT CURRENT_DATE
);

-- Tabla: trabajador (Trabajadores asignados a un negocio)
CREATE TABLE trabajador (
    id SERIAL PRIMARY KEY,
    rut VARCHAR(11) NOT NULL,
    dv CHAR(1) NOT NULL,
    apellido_paterno VARCHAR(30) NOT NULL,
    apellido_materno VARCHAR(30),
    nombres VARCHAR(30) NOT NULL,
    sexo CHAR(1) NOT NULL,
    nacionalidad INT NOT NULL,
    negocio_id INT REFERENCES negocio(id) ON DELETE CASCADE -- Asociado a un negocio
);

-- Tabla: informacion_laboral (Información laboral del trabajador)
CREATE TABLE informacion_laboral (
    id SERIAL PRIMARY KEY,
    trabajador_id INT REFERENCES trabajador(id) ON DELETE CASCADE, -- Asociado a un trabajador
    tipo_trabajador INT NOT NULL, -- Nacional o Extranjero
    tipo_remuneracion CHAR(1) NOT NULL, -- Regular o adicional
    regimen_previsional VARCHAR(3) NOT NULL -- AFP o SIN régimen
);

-- Tabla: historial_remuneracion (Historial mensual de remuneraciones del trabajador)
CREATE TABLE historial_remuneracion (
    id SERIAL PRIMARY KEY,
    trabajador_id INT REFERENCES trabajador(id) ON DELETE CASCADE, -- Asociado a un trabajador
    informacion_laboral_id INT REFERENCES informacion_laboral(id) ON DELETE CASCADE, -- Información laboral
    mes_remuneracion CHAR(6) NOT NULL, -- Mes de remuneración (mmaaaa)
    sueldo_imponible DECIMAL(10, 2) NOT NULL, -- Sueldo Imponible del mes
    cotizacion_obligatoria_afp DECIMAL(10, 2), -- Cotización Obligatoria del mes (AFP)
    cotizacion_sis DECIMAL(10, 2), -- Cotización SIS (Seguro de Invalidez y Sobrevivencia)
    cotizacion_fonasa DECIMAL(10, 2), -- Cotización FONASA del mes
    cotizacion_isapre DECIMAL(10, 2), -- Cotización ISAPRE del mes (si aplica)
    cotizacion_adicional_isapre DECIMAL(10, 2), -- Cotización Adicional ISAPRE (si aplica)
    monto_ges DECIMAL(10, 2), -- Monto GES (Garantía Explícita de Salud)
    cotizacion_isl DECIMAL(10, 2), -- Cotización ISL (Instituto de Seguridad Laboral)
    cotizacion_mutual DECIMAL(10, 2), -- Cotización Mutual (ACHS, Mutual CChC, etc.)
    aporte_trabajador_cesantia DECIMAL(10, 2), -- Aporte Trabajador Seguro Cesantía
    aporte_empleador_cesantia DECIMAL(10, 2) -- Aporte Empleador Seguro Cesantía
);

-- Tabla: salud (Información de salud del trabajador)
CREATE TABLE salud (
    id SERIAL PRIMARY KEY,
    trabajador_id INT REFERENCES trabajador(id) ON DELETE CASCADE, -- Asociado a un trabajador
    codigo_isapre INT, -- Código de la Isapre
    tasa_salud DECIMAL(5, 2), -- Tasa de salud
    adicional_ges DECIMAL(5, 2) -- Monto adicional por GES
);

-- Tabla: afp (Información de cotización AFP del trabajador)
CREATE TABLE afp (
    id SERIAL PRIMARY KEY,
    trabajador_id INT REFERENCES trabajador(id) ON DELETE CASCADE, -- Asociado a un trabajador
    codigo_afp INT NOT NULL, -- Código AFP
    tasa_cotizacion DECIMAL(5, 2), -- Tasa de cotización obligatoria AFP
    tasa_sis DECIMAL(5, 2) -- Tasa SIS (Seguro de Invalidez y Sobrevivencia)
);

-- Tabla: mutualidad (Información de mutualidad para accidentes laborales)
CREATE TABLE mutualidad (
    id SERIAL PRIMARY KEY,
    trabajador_id INT REFERENCES trabajador(id) ON DELETE CASCADE, -- Asociado a un trabajador
    codigo_mutual INT, -- Código de la mutualidad
    tasa_mutual DECIMAL(5, 2) -- Tasa de cotización accidentes laborales
);

-- Tabla: cesantia (Información del seguro de cesantía del trabajador)
CREATE TABLE cesantia (
    id SERIAL PRIMARY KEY,
    trabajador_id INT REFERENCES trabajador(id) ON DELETE CASCADE, -- Asociado a un trabajador
    tasa_trabajador DECIMAL(5, 2), -- Tasa aportada por el trabajador
    tasa_empleador DECIMAL(5, 2) -- Tasa aportada por el empleador
);
