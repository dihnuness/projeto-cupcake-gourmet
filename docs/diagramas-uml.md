# Diagramas UML — Cupcake Gourmet

**Base de modelagem:** implementação atual em `index.html`, `app.js`, `api/index.php` e `database/schema.sql`. Os diagramas representam responsabilidades lógicas; o PHP atual é procedural, portanto as classes abaixo são **classes conceituais de domínio**, não classes PHP já implementadas.

## 1. Diagrama de classes conceitual

```mermaid
classDiagram
direction LR
class Produto {
  +int id
  +string name
  +string description
  +string category
  +decimal price
  +decimal rating
  +string tag
  +string image
  +boolean active
}
class Pedido {
  +bigint id
  +string order_code
  +string customer_name
  +string email
  +string phone
  +string address
  +string payment_method
  +string status
  +decimal subtotal
  +decimal delivery_fee
  +decimal total
}
class ItemPedido {
  +bigint id
  +bigint order_id
  +int product_id
  +string product_name
  +int quantity
  +decimal unit_price
}
Pedido "1" *-- "1..*" ItemPedido : contém
Produto "1" <-- "0..*" ItemPedido : referencia
```

**Nota:** `Pedido` e `ItemPedido` armazenam valores históricos; a API valida os itens e calcula os preços no servidor. A cardinalidade de ao menos um item é uma regra de negócio aplicada pela API, não uma restrição de cardinalidade diretamente expressa pelo SQL.

## 2. Casos de uso (representação de atores e funcionalidades)

```mermaid
flowchart LR
  C([Cliente]) --> U1([Consultar catálogo])
  C --> U2([Pesquisar e filtrar])
  C --> U3([Montar sacola])
  C --> U4([Registrar pedido demonstrativo])
  C --> U5([Consultar status do pedido])
  A([Administrador técnico]) --> U6([Criar produto])
  A --> U7([Atualizar produto])
  A --> U8([Desativar produto])
```

O acesso administrativo é por token de API; não há painel de login de administrador implementado.

## 3. Diagrama de sequência — registro de pedido

```mermaid
sequenceDiagram
actor Cliente
participant UI as Interface JavaScript
participant API as API PHP
participant DB as MySQL
Cliente->>UI: Escolhe produtos e preenche checkout
UI->>API: POST /api/orders (IDs, quantidades, dados)
API->>API: Valida dados e quantidades
alt Dados inválidos
  API-->>UI: HTTP 422 e erro
  UI-->>Cliente: Exibe erro
else Dados válidos
  API->>DB: BEGIN e SELECT de produtos ativos
  DB-->>API: Nomes e preços atuais
  alt Produto indisponível
    API->>DB: ROLLBACK
    API-->>UI: HTTP 422
  else Produtos disponíveis
    API->>API: Recalcula subtotal, frete e total
    API->>DB: INSERT pedido e itens
    API->>DB: COMMIT
    DB-->>API: Confirma gravação
    API-->>UI: HTTP 201 e resumo
    UI-->>Cliente: Mostra confirmação
  end
end
```

## 4. Diagrama de atividades — checkout

```mermaid
flowchart TD
  A([Início]) --> B[Consultar catálogo]
  B --> C[Adicionar produtos à sacola]
  C --> D[Preencher checkout]
  D --> E{API disponível e configurada?}
  E -- Não --> F[Mostrar modo demonstrativo ou erro sem alegar persistência]
  E -- Sim --> G[Enviar pedido à API]
  G --> H{Dados válidos?}
  H -- Não --> I[Exibir erro e permitir correção]
  I --> D
  H -- Sim --> J{Produtos ativos disponíveis?}
  J -- Não --> K[Exibir indisponibilidade]
  K --> B
  J -- Sim --> L[Calcular total no servidor]
  L --> M{Transação gravada?}
  M -- Não --> N[Informar falha sem confirmar pedido]
  M -- Sim --> O[Exibir código e resumo]
  F --> P([Fim])
  N --> P
  O --> P
```

## 5. Rastreabilidade

| Elemento | Implementação / evidência |
|---|---|
| Produto, Pedido, ItemPedido | `database/schema.sql` |
| Catálogo e sacola | `index.html`, `app.js` |
| Validação e persistência de pedidos | `api/index.php` |
| Regras e requisitos | `docs/documentacao-academica.md` |
| Casos de teste | `docs/roteiro-testes.md` |

Estes diagramas documentam a arquitetura atual. Não constituem prova de execução dos testes.
