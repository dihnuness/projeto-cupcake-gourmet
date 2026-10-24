CREATE DATABASE IF NOT EXISTS cupcake_gourmet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cupcake_gourmet;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category ENUM('Clássicos','Especiais','Frutados') NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.8,
  tag VARCHAR(60) NOT NULL DEFAULT 'Artesanal',
  image VARCHAR(1000) NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (price > 0), CHECK (rating >= 0 AND rating <= 5),
  INDEX idx_products_active_category (active, category)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_code VARCHAR(20) NOT NULL UNIQUE,
  customer_name VARCHAR(150) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  address VARCHAR(500) NOT NULL,
  payment_method ENUM('Pix (simulação)','Cartão (simulação)','Pagamento na entrega (simulação)') NOT NULL,
  status ENUM('Recebido','Confirmado','Em preparo','Saiu para entrega','Entregue','Cancelado') NOT NULL DEFAULT 'Recebido',
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 8.00,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_orders_created (created_at), INDEX idx_orders_status (status)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  product_name VARCHAR(120) NOT NULL,
  quantity SMALLINT UNSIGNED NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products(id),
  CHECK (quantity > 0), CHECK (unit_price > 0),
  INDEX idx_items_order (order_id)
) ENGINE=InnoDB;

INSERT INTO products (id,name,description,category,price,rating,tag,image) VALUES
(1,'Chocolate Belga','Massa de chocolate intenso, recheio cremoso e cobertura aveludada de chocolate belga.','Clássicos',12.90,4.9,'Mais vendido','https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=85'),
(2,'Red Velvet','Massa red velvet macia com creme suave e um toque delicado de baunilha.','Especiais',13.90,4.9,'Favorito','https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=85'),
(3,'Baunilha & Frutas','Massa de baunilha, creme delicado e frutas selecionadas para um sabor fresco.','Frutados',11.90,4.8,'Levinho','https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=85'),
(4,'Doce de Leite','Massa amanteigada com recheio generoso de doce de leite e cobertura cremosa.','Clássicos',12.50,4.8,'Artesanal','https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=85'),
(5,'Morango Encantado','Cupcake delicado com notas de morango e cobertura rosada feita artesanalmente.','Frutados',13.50,5.0,'Da estação','assets/morango-encantado.jpg'),
(6,'Cookies & Cream','Massa macia, creme inspirado em cookies e pedacinhos crocantes em cada mordida.','Especiais',13.90,4.9,'Irresistível','https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=800&q=85'),
(7,'Cenoura com Brigadeiro','Massa fofinha de cenoura com brigadeiro cremoso, uma combinação cheia de afeto.','Clássicos',11.90,4.8,'Conforto','https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=85'),
(8,'Limão Siciliano','Massa leve com toque cítrico de limão siciliano e cobertura suave.','Frutados',12.90,4.7,'Refrescante','https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=85')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), category=VALUES(category), price=VALUES(price), rating=VALUES(rating), tag=VALUES(tag), image=VALUES(image);
