# Dicionário de dados — Cupcake Gourmet

Base física: `database/schema.sql`, MySQL/MariaDB, InnoDB, `utf8mb4`.

## products
| Campo | Tipo | Restrições | Significado |
|---|---|---|---|
| id | INT UNSIGNED | PK AUTO_INCREMENT | Identificador |
| name | VARCHAR(120) | NOT NULL | Nome |
| description | VARCHAR(500) | NOT NULL | Descrição |
| category | VARCHAR(30) | NOT NULL | Categoria |
| price | DECIMAL(10,2) | NOT NULL, CHECK > 0 | Preço |
| image | VARCHAR(300) | NOT NULL, DEFAULT '' | Imagem opcional |
| active | TINYINT(1) | NOT NULL, DEFAULT 1 | Visibilidade |

## orders
| Campo | Tipo | Restrições | Significado |
|---|---|---|---|
| id | BIGINT UNSIGNED | PK AUTO_INCREMENT | Identificador |
| code | CHAR(12) | NOT NULL UNIQUE | Código aleatório de consulta |
| customer_name | VARCHAR(120) | NOT NULL | Nome do cliente |
| email | VARCHAR(254) | NOT NULL | Contato |
| phone | VARCHAR(30) | NOT NULL | Contato |
| address | VARCHAR(300) | NOT NULL | Endereço |
| payment_method | VARCHAR(30) | NOT NULL | Modalidade simulada |
| subtotal | DECIMAL(10,2) | NOT NULL | Soma de itens |
| delivery_fee | DECIMAL(10,2) | NOT NULL | Taxa fixa |
| total | DECIMAL(10,2) | NOT NULL | Subtotal + taxa |
| status | VARCHAR(30) | NOT NULL, DEFAULT 'Recebido' | Estado do pedido |
| created_at | TIMESTAMP | NOT NULL, CURRENT_TIMESTAMP | Registro |

## order_items
| Campo | Tipo | Restrições | Significado |
|---|---|---|---|
| id | BIGINT UNSIGNED | PK AUTO_INCREMENT | Identificador |
| order_id | BIGINT UNSIGNED | FK orders.id, ON DELETE CASCADE | Pedido |
| product_id | INT UNSIGNED | FK products.id | Produto |
| product_name | VARCHAR(120) | NOT NULL | Nome histórico |
| quantity | SMALLINT UNSIGNED | NOT NULL, CHECK > 0 | Quantidade |
| unit_price | DECIMAL(10,2) | NOT NULL | Preço histórico |

**Relacionamentos:** orders 1:N order_items; products 1:N order_items. O SQL permite pedido sem itens se gravado diretamente; a API impede isso. Nome e preço do item são instantâneos históricos. A exclusão de pedido apaga seus itens; não existe rotina de exclusão na interface.

**Verificação física pendente:** executar o script no MySQL do ambiente de avaliação e registrar capturas de `SHOW TABLES` e `SHOW CREATE TABLE`.
