-- ============================================================
-- BASE DE DATOS: Botica Nova Salud
-- Curso: Ingeniería de Software con IA
-- ============================================================

-- DROP DATABASE IF EXISTS BoticaNovaSalud_Final;
-- CREATE DATABASE BoticaNovaSalud_Final;
USE boticanovasalud_final;

-- ============================================================
-- 1. ENTIDADES DE CLASIFICACIÓN Y PROVEEDORES
-- ============================================================

CREATE TABLE Laboratorios (
  id_laboratorio INT     AUTO_INCREMENT PRIMARY KEY,
  nombre_laboratorio VARCHAR(100) NOT NULL,     -- Ej: Pharma, Portugal, Hersil, Abott
  contacto_proveedor VARCHAR(100),
  telefono_contacto VARCHAR(15),
  estado       BOOLEAN   DEFAULT TRUE
);

CREATE TABLE Categorias (
  id_categoria   INT     AUTO_INCREMENT PRIMARY KEY,
  nombre_categoria VARCHAR(50) NOT NULL,      -- Ej: Antibióticos, Cuidado Personal
  descripcion    TEXT
);

CREATE TABLE Presentaciones (
  id_presentacion   INT     AUTO_INCREMENT PRIMARY KEY,
  nombre_presentacion VARCHAR(50) NOT NULL     -- Ej: Pastilla, Jarabe, Inyectable
);

CREATE TABLE Unidades_Medida (
  id_unidad   INT     AUTO_INCREMENT PRIMARY KEY,
  nombre_unidad VARCHAR(50) NOT NULL         -- Ej: Unidad, Blíster, Caja
);

-- ============================================================
-- 2. RECURSOS HUMANOS Y ACCESO
-- ============================================================

CREATE TABLE Cargos (
  id_cargo  INT     AUTO_INCREMENT PRIMARY KEY,
  nombre_cargo VARCHAR(50) NOT NULL         -- Ej: Administrador, Vendedor, Farmacéutico
);

CREATE TABLE Empleados (
  id_empleado INT     AUTO_INCREMENT PRIMARY KEY,
  dni     CHAR(8)   UNIQUE NOT NULL,
  nombres   VARCHAR(100) NOT NULL,
  apellidos  VARCHAR(100) NOT NULL,
  id_cargo  INT,
  FOREIGN KEY (id_cargo) REFERENCES Cargos(id_cargo)
);

CREATE TABLE Usuarios (
  id_usuario  INT     AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  id_empleado  INT     UNIQUE,
  FOREIGN KEY (id_empleado) REFERENCES Empleados(id_empleado)
);

-- ============================================================
-- 3. PRODUCTOS CON MULTIPRECIOS Y STOCK
-- ============================================================

CREATE TABLE Productos (
  id_producto     INT     AUTO_INCREMENT PRIMARY KEY,
  id_laboratorio    INT,
  id_categoria     INT,
  id_presentacion   INT,
  nombre_comercial   VARCHAR(100) NOT NULL,    -- Ej: Diclofenaco, Paracetamol
  principio_activo   VARCHAR(100),
  stock_actual_unidades  INT   NOT NULL DEFAULT 0,
  stock_minimo_unidades  INT   NOT NULL DEFAULT 20,
  fecha_vencimiento  DATE,
  FOREIGN KEY (id_laboratorio) REFERENCES Laboratorios(id_laboratorio),
  FOREIGN KEY (id_categoria)  REFERENCES Categorias(id_categoria),
  FOREIGN KEY (id_presentacion) REFERENCES Presentaciones(id_presentacion)
);

-- Tabla de precios por unidad de medida (multiprecios)
CREATE TABLE Productos_Precios (
  id_producto_precio  INT       AUTO_INCREMENT PRIMARY KEY,
  id_producto      INT,
  id_unidad       INT,
  cantidad_equivalente INT       NOT NULL,  -- Ej: Caja de 100 pastillas
  precio_venta     DECIMAL(10,2)  NOT NULL,
  FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
  FOREIGN KEY (id_unidad)  REFERENCES Unidades_Medida(id_unidad)
);

-- ============================================================
-- 4. FACTURACIÓN Y VENTAS
-- ============================================================

CREATE TABLE Tipos_Comprobantes (
  id_tipo_comprobante INT     AUTO_INCREMENT PRIMARY KEY,
  nombre_documento  VARCHAR(20) NOT NULL,     -- Boleta / Factura
  serie_actual    CHAR(4)   NOT NULL,     -- Ej: B001, F001
  correlativo_actual INT     DEFAULT 0
);

CREATE TABLE Clientes (
  id_cliente     INT     AUTO_INCREMENT PRIMARY KEY,
  numero_documento  CHAR(11)   UNIQUE NOT NULL, -- DNI (8 díg.) o RUC (11 díg.)
  nombres_razon_social VARCHAR(150) NOT NULL,
  direccion      VARCHAR(200),
  telefono      VARCHAR(15)
);

CREATE TABLE Ventas (
  id_venta      INT      AUTO_INCREMENT PRIMARY KEY,
  id_tipo_comprobante INT,
  serie_documento   CHAR(4),
  numero_documento  VARCHAR(10),
  fecha_hora     TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
  id_cliente     INT,
  id_usuario     INT,              -- Vendedor que realiza la venta
  total        DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_tipo_comprobante) REFERENCES Tipos_Comprobantes(id_tipo_comprobante),
  FOREIGN KEY (id_cliente)     REFERENCES Clientes(id_cliente),
  FOREIGN KEY (id_usuario)     REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Detalle_Ventas (
  id_detalle     INT      AUTO_INCREMENT PRIMARY KEY,
  id_venta      INT,
  id_producto     INT,
  id_producto_precio INT,              -- Identifica si se vendió por caja, unidad, etc.
  cantidad      INT      NOT NULL,
  precio_unitario   DECIMAL(10,2),
  subtotal      DECIMAL(10,2),
  FOREIGN KEY (id_venta)      REFERENCES Ventas(id_venta),
  FOREIGN KEY (id_producto)    REFERENCES Productos(id_producto),
  FOREIGN KEY (id_producto_precio) REFERENCES Productos_Precios(id_producto_precio)
);

-- ============================================================
-- 5. DATOS DE PRUEBA (INSERTS)
-- ============================================================

-- Laboratorios
INSERT INTO Laboratorios (nombre_laboratorio, contacto_proveedor, telefono_contacto) VALUES
('Pharma Genéricos', 'Juan Ríos', '999111222'),
('Portugal', 'María López', '999333444'),
('Hersil', 'Carlos Vega', '999555666'),
('Abott', 'Ana Torres', '999777888');

-- Categorías
INSERT INTO Categorias (nombre_categoria, descripcion) VALUES
('Analgésicos', 'Medicamentos para el dolor'),
('Antibióticos', 'Medicamentos contra infecciones bacterianas'),
('Antiinflamatorios', 'Medicamentos para reducir inflamación'),
('Cuidado Personal', 'Productos de higiene y bienestar'),
('Vitaminas', 'Suplementos vitamínicos');

-- Presentaciones
INSERT INTO Presentaciones (nombre_presentacion) VALUES
('Pastilla'),
('Jarabe'),
('Inyectable'),
('Cápsula'),
('Crema');

-- Unidades de Medida
INSERT INTO Unidades_Medida (nombre_unidad) VALUES
('Unidad'),
('Blíster'),
('Caja'),
('Frasco');

-- Cargos
INSERT INTO Cargos (nombre_cargo) VALUES
('Administrador'),
('Vendedor'),
('Farmacéutico');

-- Empleados
INSERT INTO Empleados (dni, nombres, apellidos, id_cargo) VALUES
('12345678', 'Luis', 'Mamani Quispe', 1),
('87654321', 'Rosa', 'Flores Huanca', 2),
('11223344', 'Pedro', 'Ccopa Apaza', 3);

-- Usuarios
INSERT INTO Usuarios (username, password_hash, id_empleado) VALUES
('admin',  SHA2('admin123', 256),  1),
('vendedor1',SHA2('venta123', 256),  2),
('farmacia1',SHA2('farma123', 256),  3);

-- Productos
INSERT INTO Productos (id_laboratorio, id_categoria, id_presentacion, nombre_comercial, principio_activo, stock_actual_unidades, stock_minimo_unidades, fecha_vencimiento) VALUES
(1, 3, 3, 'Diclofenaco 75mg/5mL', 'Diclofenaco sódico', 200, 20, '2026-12-31'),
(2, 1, 2, 'Paracetamol 120mg/5mL', 'Paracetamol', 150, 20, '2026-06-30'),
(3, 2, 1, 'Amoxicilina 500mg', 'Amoxicilina', 300, 50, '2025-12-31'),
(4, 5, 4, 'Vitamina C 1000mg', 'Ácido ascórbico', 500, 30, '2027-01-01');

-- Precios por unidad de medida
INSERT INTO Productos_Precios (id_producto, id_unidad, cantidad_equivalente, precio_venta) VALUES
(1, 1, 1,  3.50),  -- Diclofenaco x Unidad
(1, 3, 10, 30.00), -- Diclofenaco x Caja (10 ampollas)
(2, 4, 1,  12.50), -- Paracetamol Jarabe x Frasco
(3, 2, 12, 15.00), -- Amoxicilina x Blíster (12 pastillas)
(3, 3, 100, 110.00), -- Amoxicilina x Caja (100 pastillas)
(4, 1, 1,  1.50),  -- Vitamina C x Unidad
(4, 2, 10, 13.00); -- Vitamina C x Blíster

-- Tipos de Comprobante
INSERT INTO Tipos_Comprobantes (nombre_documento, serie_actual, correlativo_actual) VALUES
('BOLETA', 'B001', 0),
('FACTURA', 'F001', 0);

-- Clientes
INSERT INTO Clientes (numero_documento, nombres_razon_social, direccion, telefono) VALUES
('00000000000', 'Consumidor Final', NULL, NULL),
('12345678',  'Juan García Pérez', 'Av. Lima 123', '987654321'),
('20501234567', 'Farmacia del Pueblo SAC', 'Jr. Ayacucho 456', '999000111');

-- Venta de prueba (Boleta)
INSERT INTO Ventas (id_tipo_comprobante, serie_documento, numero_documento, id_cliente, id_usuario, total) VALUES
(1, 'B001', '00000001', 2, 2, 33.50);

INSERT INTO Detalle_Ventas (id_venta, id_producto, id_producto_precio, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 2, 3.50, 7.00),
(1, 2, 3, 1, 12.50, 12.50),
(1, 4, 6, 9, 1.50, 13.50);

-- ============================================================
-- 6. VISTAS ÚTILES
-- ============================================================

-- Vista: Catálogo de productos con precios
CREATE OR REPLACE VIEW v_catalogo_productos AS
SELECT
  p.id_producto,
  p.nombre_comercial,
  p.principio_activo,
  cat.nombre_categoria,
  pre.nombre_presentacion,
  lab.nombre_laboratorio,
  um.nombre_unidad,
  pp.cantidad_equivalente,
  pp.precio_venta,
  p.stock_actual_unidades,
  p.fecha_vencimiento
FROM Productos p
JOIN Laboratorios  lab ON p.id_laboratorio = lab.id_laboratorio
JOIN Categorias   cat ON p.id_categoria  = cat.id_categoria
JOIN Presentaciones pre ON p.id_presentacion = pre.id_presentacion
JOIN Productos_Precios pp ON p.id_producto  = pp.id_producto
JOIN Unidades_Medida um ON pp.id_unidad   = um.id_unidad;

-- Vista: Detalle de ventas con producto y comprobante
CREATE OR REPLACE VIEW v_detalle_ventas AS
SELECT
  v.id_venta,
  tc.nombre_documento   AS tipo_comprobante,
  v.serie_documento,
  v.numero_documento,
  v.fecha_hora,
  c.nombres_razon_social AS cliente,
  CONCAT(e.nombres,' ', e.apellidos) AS vendedor,
  p.nombre_comercial   AS producto,
  um.nombre_unidad,
  dv.cantidad,
  dv.precio_unitario,
  dv.subtotal,
  v.total
FROM Ventas v
JOIN Detalle_Ventas   dv ON v.id_venta      = dv.id_venta
JOIN Tipos_Comprobantes tc ON v.id_tipo_comprobante = tc.id_tipo_comprobante
JOIN Clientes      c  ON v.id_cliente      = c.id_cliente
JOIN Usuarios      u  ON v.id_usuario      = u.id_usuario
JOIN Empleados      e  ON u.id_empleado     = e.id_empleado
JOIN Productos      p  ON dv.id_producto     = p.id_producto
JOIN Productos_Precios  pp ON dv.id_producto_precio = pp.id_producto_precio
JOIN Unidades_Medida   um ON pp.id_unidad      = um.id_unidad;

-- Vista: Stock bajo mínimo
CREATE OR REPLACE VIEW v_stock_critico AS
SELECT
  id_producto,
  nombre_comercial,
  stock_actual_unidades,
  stock_minimo_unidades
FROM Productos
WHERE stock_actual_unidades < stock_minimo_unidades;

-- ============================================================
-- 7. RUTINAS: STORED PROCEDURES, FUNCIONES Y TRIGGERS
-- ============================================================

DELIMITER $$

-- ------------------------------------------------------------
-- FUNCIÓN 1: Calcular el subtotal de un ítem de venta
-- ------------------------------------------------------------
CREATE FUNCTION fn_calcular_subtotal(
  p_cantidad   INT,
  p_precio_unit  DECIMAL(10,2)
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  RETURN p_cantidad * p_precio_unit;
END$$

-- ------------------------------------------------------------
-- FUNCIÓN 2: Obtener el precio de venta de un producto según unidad
-- ------------------------------------------------------------
CREATE FUNCTION fn_obtener_precio(
  p_id_producto  INT,
  p_id_unidad   INT
)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  DECLARE v_precio DECIMAL(10,2) DEFAULT 0.00;

  SELECT precio_venta INTO v_precio
  FROM Productos_Precios
  WHERE id_producto = p_id_producto
   AND id_unidad  = p_id_unidad
  LIMIT 1;

  RETURN IFNULL(v_precio, 0.00);
END$$

-- ------------------------------------------------------------
-- FUNCIÓN 3: Verificar si hay stock suficiente
-- ------------------------------------------------------------
CREATE FUNCTION fn_hay_stock(
  p_id_producto INT,
  p_cantidad  INT
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
  DECLARE v_stock INT DEFAULT 0;

  SELECT stock_actual_unidades INTO v_stock
  FROM Productos
  WHERE id_producto = p_id_producto;

  RETURN v_stock >= p_cantidad;
END$$

-- ------------------------------------------------------------
-- STORED PROCEDURE 1: Registrar una venta completa
-- ------------------------------------------------------------
CREATE PROCEDURE sp_registrar_venta(
  IN p_id_tipo_comprobante INT,
  IN p_id_cliente     INT,
  IN p_id_usuario     INT,
  IN p_productos_json   JSON,
  OUT p_id_venta      INT,
  OUT p_mensaje       VARCHAR(200)
)
sp_registrar_venta: BEGIN
  DECLARE v_serie     CHAR(4);
  DECLARE v_correlativo  INT;
  DECLARE v_num_doc    VARCHAR(10);
  DECLARE v_total     DECIMAL(10,2) DEFAULT 0.00;
  DECLARE v_precio    DECIMAL(10,2);
  DECLARE v_cantidad   INT;
  DECLARE v_subtotal   DECIMAL(10,2);
  DECLARE v_id_producto  INT;
  DECLARE v_id_pp     INT;
  DECLARE v_idx      INT DEFAULT 0;
  DECLARE v_count     INT;
  DECLARE v_stock_ok   BOOLEAN;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_id_venta = NULL;
    SET p_mensaje = 'ERROR: Fallo en la transacción. Venta cancelada.';
  END;

  START TRANSACTION;

  SELECT serie_actual, correlativo_actual + 1
  INTO  v_serie, v_correlativo
  FROM  Tipos_Comprobantes
  WHERE id_tipo_comprobante = p_id_tipo_comprobante
  FOR UPDATE;

  UPDATE Tipos_Comprobantes
  SET  correlativo_actual = v_correlativo
  WHERE id_tipo_comprobante = p_id_tipo_comprobante;

  SET v_num_doc = LPAD(v_correlativo, 8, '0');

  SET v_count = JSON_LENGTH(p_productos_json);
  SET v_idx  = 0;

  WHILE v_idx < v_count DO
    SET v_id_producto = JSON_UNQUOTE(JSON_EXTRACT(p_productos_json, CONCAT('$[', v_idx, '].id_producto')));
    SET v_cantidad  = JSON_UNQUOTE(JSON_EXTRACT(p_productos_json, CONCAT('$[', v_idx, '].cantidad')));

    SET v_stock_ok = fn_hay_stock(v_id_producto, v_cantidad);

    IF NOT v_stock_ok THEN
      ROLLBACK;
      SET p_id_venta = NULL;
      SET p_mensaje = CONCAT('ERROR: Stock insuficiente para el producto ID ', v_id_producto);
      LEAVE sp_registrar_venta;
    END IF;

    SET v_idx = v_idx + 1;
  END WHILE;

  SET v_idx = 0;
  WHILE v_idx < v_count DO
    SET v_id_pp  = JSON_UNQUOTE(JSON_EXTRACT(p_productos_json, CONCAT('$[', v_idx, '].id_producto_precio')));
    SET v_cantidad = JSON_UNQUOTE(JSON_EXTRACT(p_productos_json, CONCAT('$[', v_idx, '].cantidad')));

    SELECT precio_venta INTO v_precio
    FROM  Productos_Precios
    WHERE id_producto_precio = v_id_pp;

    SET v_total = v_total + fn_calcular_subtotal(v_cantidad, v_precio);
    SET v_idx  = v_idx + 1;
  END WHILE;

  INSERT INTO Ventas (id_tipo_comprobante, serie_documento, numero_documento, id_cliente, id_usuario, total)
  VALUES (p_id_tipo_comprobante, v_serie, v_num_doc, p_id_cliente, p_id_usuario, v_total);

  SET p_id_venta = LAST_INSERT_ID();

  SET v_idx = 0;
  WHILE v_idx < v_count DO
    SET v_id_producto = JSON_UNQUOTE(JSON_EXTRACT(p_productos_json, CONCAT('$[', v_idx, '].id_producto')));
    SET v_id_pp    = JSON_UNQUOTE(JSON_EXTRACT(p_productos_json, CONCAT('$[', v_idx, '].id_producto_precio')));
    SET v_cantidad  = JSON_UNQUOTE(JSON_EXTRACT(p_productos_json, CONCAT('$[', v_idx, '].cantidad')));

    SELECT precio_venta INTO v_precio
    FROM  Productos_Precios
    WHERE id_producto_precio = v_id_pp;

    SET v_subtotal = fn_calcular_subtotal(v_cantidad, v_precio);

    INSERT INTO Detalle_Ventas (id_venta, id_producto, id_producto_precio, cantidad, precio_unitario, subtotal)
    VALUES (p_id_venta, v_id_producto, v_id_pp, v_cantidad, v_precio, v_subtotal);

    UPDATE Productos
    SET  stock_actual_unidades = stock_actual_unidades - v_cantidad
    WHERE id_producto = v_id_producto;

    SET v_idx = v_idx + 1;
  END WHILE;

  COMMIT;
  SET p_mensaje = CONCAT('OK: Venta registrada. Comprobante: ', v_serie, '-', v_num_doc);
END$$

-- ------------------------------------------------------------
-- STORED PROCEDURE 2: Buscar producto por nombre o principio activo
-- ------------------------------------------------------------
CREATE PROCEDURE sp_buscar_producto(
  IN p_termino VARCHAR(100)
)
BEGIN
  SELECT
    p.id_producto,
    p.nombre_comercial,
    p.principio_activo,
    cat.nombre_categoria,
    pre.nombre_presentacion,
    lab.nombre_laboratorio,
    um.nombre_unidad,
    pp.precio_venta,
    p.stock_actual_unidades
  FROM Productos p
  JOIN Laboratorios   lab ON p.id_laboratorio = lab.id_laboratorio
  JOIN Categorias    cat ON p.id_categoria  = cat.id_categoria
  JOIN Presentaciones  pre ON p.id_presentacion = pre.id_presentacion
  JOIN Productos_Precios pp ON p.id_producto   = pp.id_producto
  JOIN Unidades_Medida  um ON pp.id_unidad   = um.id_unidad
  WHERE p.nombre_comercial LIKE CONCAT('%', p_termino, '%')
    OR p.principio_activo LIKE CONCAT('%', p_termino, '%');
END$$

-- ------------------------------------------------------------
-- STORED PROCEDURE 3: Reporte de ventas por rango de fechas
-- ------------------------------------------------------------
CREATE PROCEDURE sp_reporte_ventas(
  IN p_fecha_ini DATE,
  IN p_fecha_fin DATE
)
BEGIN
  SELECT
    DATE(v.fecha_hora)             AS fecha,
    tc.nombre_documento             AS comprobante,
    CONCAT(v.serie_documento,'-',v.numero_documento) AS numero,
    c.nombres_razon_social           AS cliente,
    CONCAT(e.nombres,' ',e.apellidos)      AS vendedor,
    v.total
  FROM Ventas v
  JOIN Tipos_Comprobantes tc ON v.id_tipo_comprobante = tc.id_tipo_comprobante
  JOIN Clientes      c ON v.id_cliente     = c.id_cliente
  JOIN Usuarios      u ON v.id_usuario     = u.id_usuario
  JOIN Empleados      e ON u.id_empleado     = e.id_empleado
  WHERE DATE(v.fecha_hora) BETWEEN p_fecha_ini AND p_fecha_fin
  ORDER BY v.fecha_hora DESC;
END$$

-- ------------------------------------------------------------
-- STORED PROCEDURE 4: Consultar stock y alertar productos críticos
-- ------------------------------------------------------------
CREATE PROCEDURE sp_stock_critico()
BEGIN
  SELECT
    p.id_producto,
    p.nombre_comercial,
    lab.nombre_laboratorio,
    p.stock_actual_unidades AS stock_actual,
    p.stock_minimo_unidades AS stock_minimo,
    (p.stock_minimo_unidades - p.stock_actual_unidades) AS unidades_faltantes,
    p.fecha_vencimiento,
    CASE
      WHEN p.fecha_vencimiento < CURDATE()    THEN 'VENCIDO'
      WHEN p.fecha_vencimiento < DATE_ADD(CURDATE(), INTERVAL 30 DAY) THEN 'POR VENCER'
      ELSE 'VIGENTE'
    END AS estado_vencimiento
  FROM Productos p
  JOIN Laboratorios lab ON p.id_laboratorio = lab.id_laboratorio
  WHERE p.stock_actual_unidades < p.stock_minimo_unidades
    OR p.fecha_vencimiento   < DATE_ADD(CURDATE(), INTERVAL 30 DAY)
  ORDER BY p.stock_actual_unidades ASC;
END$$

-- ------------------------------------------------------------
-- TRIGGER 1: Auditar descuento de stock tras insertar detalle de venta
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Log_Movimientos_Stock (
  id_log    INT    AUTO_INCREMENT PRIMARY KEY,
  id_producto  INT,
  tipo_movimiento ENUM('ENTRADA','SALIDA') NOT NULL,
  cantidad   INT,
  stock_anterior INT,
  stock_nuevo  INT,
  fecha_hora  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  referencia  VARCHAR(100)
);

CREATE TRIGGER trg_log_salida_stock
AFTER INSERT ON Detalle_Ventas
FOR EACH ROW
BEGIN
  DECLARE v_stock_anterior INT;
  DECLARE v_stock_nuevo  INT;

  SELECT stock_actual_unidades INTO v_stock_anterior
  FROM  Productos
  WHERE id_producto = NEW.id_producto;

  SET v_stock_nuevo  = v_stock_anterior;
  SET v_stock_anterior = v_stock_anterior + NEW.cantidad;

  INSERT INTO Log_Movimientos_Stock (id_producto, tipo_movimiento, cantidad, stock_anterior, stock_nuevo, referencia)
  VALUES (NEW.id_producto, 'SALIDA', NEW.cantidad, v_stock_anterior, v_stock_nuevo, CONCAT('Venta ID ', NEW.id_venta));
END$$

-- ------------------------------------------------------------
-- TRIGGER 2: Impedir venta si el producto está vencido
-- ------------------------------------------------------------
CREATE TRIGGER trg_validar_vencimiento
BEFORE INSERT ON Detalle_Ventas
FOR EACH ROW
BEGIN
  DECLARE v_vencimiento DATE;

  SELECT fecha_vencimiento INTO v_vencimiento
  FROM  Productos
  WHERE id_producto = NEW.id_producto;

  IF v_vencimiento IS NOT NULL AND v_vencimiento < CURDATE() THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'ERROR: No se puede vender un producto vencido.';
  END IF;
END$$

-- ------------------------------------------------------------
-- TRIGGER 3: Actualizar correlativo en Tipos_Comprobantes
-- ------------------------------------------------------------
CREATE TRIGGER trg_actualizar_correlativo
AFTER INSERT ON Ventas
FOR EACH ROW
BEGIN
  UPDATE Tipos_Comprobantes
  SET  correlativo_actual = GREATEST(correlativo_actual,
                     CAST(NEW.numero_documento AS UNSIGNED))
  WHERE id_tipo_comprobante = NEW.id_tipo_comprobante;
END$$

DELIMITER ;
