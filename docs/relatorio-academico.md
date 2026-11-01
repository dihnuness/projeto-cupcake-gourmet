# Relatório técnico — Cupcake Gourmet

## Contexto, objetivo e escopo
Projeto Integrador Transdisciplinar em Engenharia de Software II. Solução web demonstrativa para uma confeitaria, destinada à consulta de cupcakes e registro de encomendas. O sistema não processa pagamentos reais, não gerencia entregadores e não tem autenticação de clientes.

## Requisitos
**RF01** listar produtos ativos; **RF02** pesquisar por nome; **RF03** filtrar categoria; **RF04** adicionar/remover/alterar quantidade da sacola; **RF05** preencher dados e escolher pagamento simulado; **RF06** validar e persistir pedido e itens; **RF07** consultar pedido por código.
**RNF01** interface responsiva; **RNF02** mensagens de erro; **RNF03** consultas preparadas; **RNF04** integridade referencial; **RNF05** preços calculados no servidor.

## Arquitetura
HTML/CSS/JavaScript (cliente) → PHP/PDO (API) → MySQL/MariaDB. A API é procedural e não implementa classes PHP. A representação de classes abaixo é **conceitual**.

## UML: classes conceituais
```mermaid
classDiagram
class Produto {
  +int id
  +string nome
  +decimal preco
  +string categoria
  +boolean ativo
}
class Pedido {
  +bigint id
  +string codigo
  +string status
  +decimal total
}
class ItemPedido {
  +bigint id
  +int quantidade
  +decimal precoUnitario
}
Pedido "1" *-- "1..*" ItemPedido
Produto "1" <-- "0..*" ItemPedido
```

## Casos de uso
```mermaid
flowchart LR
C([Cliente]) --> A([Consultar catálogo])
C --> B([Pesquisar e filtrar])
C --> D([Montar sacola])
C --> E([Registrar encomenda])
C --> F([Consultar status por código])
```

## Sequência: registrar pedido
```mermaid
sequenceDiagram
actor Cliente
participant JS as Interface
participant PHP as API PHP
participant DB as MySQL
Cliente->>JS: Preenche formulário
JS->>PHP: POST api.php?action=order
PHP->>PHP: Valida entrada
alt Entrada inválida
PHP-->>JS: HTTP 422
else Entrada válida
PHP->>DB: Inicia transação e consulta preços
DB-->>PHP: Produtos ativos
PHP->>DB: Grava pedido e itens
PHP->>DB: COMMIT
PHP-->>JS: HTTP 201 e código
end
JS-->>Cliente: Confirmação ou erro
```

## Atividades: checkout
```mermaid
flowchart TD
A([Início]) --> B[Selecionar cupcakes]
B --> C[Preencher formulário]
C --> D{Dados válidos?}
D -- Não --> E[Mostrar erro]
E --> C
D -- Sim --> F{Produtos disponíveis?}
F -- Não --> G[Mostrar indisponibilidade]
G --> B
F -- Sim --> H[Calcular valores no servidor]
H --> I[Salvar pedido e itens em transação]
I --> J{Gravação concluída?}
J -- Não --> K[Exibir falha]
J -- Sim --> L[Exibir código]
K --> M([Fim])
L --> M
```

## Modelagem e normalização
Modelo conceitual: Produto, Pedido, ItemPedido. Modelo lógico: products(id PK), orders(id PK, code UNIQUE), order_items(id PK, order_id FK, product_id FK). Separação de itens elimina grupos repetidos (1FN); atributos não-chave dependem da chave de sua entidade (2FN); dados de produto são centralizados, mas nome e preço são copiados para o item como **instantâneo histórico deliberado**. O dicionário detalhado está em `docs/dicionario-de-dados.md`.

## IHC e UX
Layout responsivo; busca visível; categorias; botão de sacola com contador; checkout com rótulos e validação nativa; feedback textual com `role=status`; estados vazios e erros. Revisar com cinco usuários reais, registrando sugestões e correções.

## Limites
Sem pagamento real, autenticação, painel administrativo, envio de e-mail ou hospedagem de produção. Projeto para demonstração local. Não inserir dados pessoais reais nos testes. O relatório descreve a solução proposta e o código, não comprova por si só a execução.
