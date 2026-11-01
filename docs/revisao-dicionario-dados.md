# Revisão do dicionário de dados e do projeto físico

**Fonte primária:** `database/schema.sql` da versão consultada. Banco: `cupcake_gourmet`, codificação `utf8mb4`, tabelas InnoDB. Este documento complementa o dicionário resumido em `docs/modelo-dados.md`.

## Entidade `products`

| Campo | Tipo SQL | Nulo | Chave / padrão | Significado |
|---|---|---|---|---|
| id | INT UNSIGNED | Não | PK, AUTO_INCREMENT | Identificador |
| name | VARCHAR(120) | Não | — | Nome |
| description | VARCHAR(1000) | Não | — | Descrição |
| category | ENUM('Clássicos','Especiais','Frutados') | Não | — | Categoria |
| price | DECIMAL(10,2) | Não | CHECK > 0 | Preço |
| rating | DECIMAL(2,1) | Não | DEFAULT 4.8; CHECK 0..5 | Avaliação |
| tag | VARCHAR(60) | Não | DEFAULT 'Artesanal' | Selo |
| image | VARCHAR(1000) | Não | — | Caminho/URL de imagem |
| active | TINYINT(1) | Não | DEFAULT 1 | Produto ativo |
| created_at | TIMESTAMP | Não | CURRENT_TIMESTAMP | Criação |
| updated_at | TIMESTAMP | Não | CURRENT_TIMESTAMP ON UPDATE | Atualização |

Índice: `idx_products_active_category(active, category)`.

## Entidade `orders`

| Campo | Tipo SQL | Nulo | Chave / padrão | Significado |
|---|---|---|---|---|
| id | BIGINT UNSIGNED | Não | PK, AUTO_INCREMENT | Identificador |
| order_code | VARCHAR(20) | Não | UNIQUE | Código de consulta |
| customer_name | VARCHAR(150) | Não | — | Nome informado |
| email | VARCHAR(254) | Não | — | E-mail |
| phone | VARCHAR(30) | Não | — | Telefone |
| address | VARCHAR(500) | Não | — | Endereço |
| payment_method | ENUM('Pix (simulação)','Cartão (simulação)','Pagamento na entrega (simulação)') | Não | — | Forma demonstrativa |
| status | ENUM('Recebido','Confirmado','Em preparo','Saiu para entrega','Entregue','Cancelado') | Não | DEFAULT 'Recebido' | Situação |
| subtotal | DECIMAL(10,2) | Não | — | Soma dos itens |
| delivery_fee | DECIMAL(10,2) | Não | DEFAULT 8.00 | Frete demonstrativo |
| total | DECIMAL(10,2) | Não | — | Valor total |
| created_at | TIMESTAMP | Não | CURRENT_TIMESTAMP | Data do pedido |

Índices: `idx_orders_created(created_at)` e `idx_orders_status(status)`.

## Entidade `order_items`

| Campo | Tipo SQL | Nulo | Chave / padrão | Significado |
|---|---|---|---|---|
| id | BIGINT UNSIGNED | Não | PK, AUTO_INCREMENT | Identificador |
| order_id | BIGINT UNSIGNED | Não | FK -> orders.id, ON DELETE CASCADE | Pedido |
| product_id | INT UNSIGNED | Não | FK -> products.id | Produto |
| product_name | VARCHAR(120) | Não | — | Nome histórico |
| quantity | SMALLINT UNSIGNED | Não | CHECK > 0 | Quantidade |
| unit_price | DECIMAL(10,2) | Não | CHECK > 0 | Preço histórico |
| created_at | TIMESTAMP | Não | CURRENT_TIMESTAMP | Inclusão |

Índice: `idx_items_order(order_id)`.

## Relacionamentos e integridade

- `orders (1) -> (N) order_items`: a aplicação exige ao menos um item ao criar o pedido.
- `products (1) -> (N) order_items`: um produto pode constar em vários itens de pedidos.
- Exclusão de pedido remove itens por cascata; exclusão física de produto referenciado não tem cascata.
- O catálogo usa desativação lógica `active=0`, preservando o histórico.
- O esquema **não** impõe diretamente CHECK de subtotal/total positivos nem consistência entre `total` e `subtotal + delivery_fee`; o cálculo é responsabilidade da API.
- O esquema contém dados pessoais; usar somente dados fictícios nos testes e não expor capturas com contatos reais.

## Conferência com o SQL

A descrição acima foi revisada por leitura do código SQL, **não por execução do script em MySQL**. Antes da entrega, importar `database/schema.sql` e registrar evidência de `SHOW TABLES;`, `SHOW CREATE TABLE products;`, `SHOW CREATE TABLE orders;` e `SHOW CREATE TABLE order_items;`.
