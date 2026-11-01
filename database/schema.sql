CREATE DATABASE IF NOT EXISTS cupcake_gourmet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cupcake_gourmet;
CREATE TABLE IF NOT EXISTS products (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(120) NOT NULL,
 description VARCHAR(500) NOT NULL,
 category VARCHAR(30) NOT NULL,
 price DECIMAL(10,2) NOT NULL,
 image VARCHAR(300) NOT NULL DEFAULT '',
 active TINYINT(1) NOT NULL DEFAULT 1,
 CHECK (price > 0)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS orders (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 code CHAR(12) NOT NULL UNIQUE,
 customer_name VARCHAR(120) NOT NULL,
 email VARCHAR(254) NOT NULL,
 phone VARCHAR(30) NOT NULL,
 address VARCHAR(300) NOT NULL,
 payment_method VARCHAR(30) NOT NULL,
 subtotal DECIMAL(10,2) NOT NULL,
 delivery_fee DECIMAL(10,2) NOT NULL,
 total DECIMAL(10,2) NOT NULL,
 status VARCHAR(30) NOT NULL DEFAULT 'Recebido',
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS order_items (
 id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 order_id BIGINT UNSIGNED NOT NULL,
 product_id INT UNSIGNED NOT NULL,
 product_name VARCHAR(120) NOT NULL,
 quantity SMALLINT UNSIGNED NOT NULL,
 unit_price DECIMAL(10,2) NOT NULL,
 FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
 FOREIGN KEY (product_id) REFERENCES products(id),
 CHECK (quantity > 0)
) ENGINE=InnoDB;
INSERT INTO products (id,name,description,category,price,image) VALUES
(1,'Chocolate Belga','Chocolate intenso com cobertura cremosa','Clássicos',12.90,''),
(2,'Red Velvet','Massa vermelha e creme de baunilha','Especiais',13.90,''),
(3,'Morango','Creme leve e toque de morango','Frutados',11.90,''),
(4,'Doce de Leite','Recheio artesanal de doce de leite','Clássicos',12.50,''),
(5,'Limão Siciliano','Cupcake cítrico e refrescante','Frutados',12.90,''),
(6,'Cookies & Cream','Creme com pedacinhos crocantes','Especiais',13.90,''),
(7,'Cenoura com Brigadeiro','Cenoura fofinha e brigadeiro','Clássicos',11.90,''),
(8,'Baunilha','Baunilha clássica com cobertura suave','Clássicos',10.90,'')
ON DUPLICATE KEY UPDATE name=VALUES(name),description=VALUES(description),category=VALUES(category),price=VALUES(price),image=VALUES(image);
