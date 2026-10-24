# Plano e roteiro de testes — Cupcake Gourmet

**Importante:** este documento é um plano para execução. Não marque como aprovado sem executar o caso no ambiente definido. Registre data, versão, ambiente, resultado real e evidência.

## Ambiente de teste

- Sistema operacional: ____________________
- Navegador/versão: ____________________
- Versão do PHP: ____________________
- MySQL/MariaDB: ____________________
- URL/ambiente: ____________________
- Responsável e data: ____________________

## Casos funcionais e de integração

| ID | Cenário | Procedimento | Resultado esperado | Resultado real |
|---|---|---|---|---|
| T01 | API de saúde | Abrir `GET /api/health` | HTTP 200 e `status: ok` | A preencher |
| T02 | Listar catálogo | Abrir `GET /api/products` | HTTP 200 com produtos ativos | A preencher |
| T03 | Buscar produto | Abrir `GET /api/products/1` | HTTP 200 com dados do produto | A preencher |
| T04 | Produto inexistente | Abrir `GET /api/products/999999` | HTTP 404 | A preencher |
| T05 | Filtros e busca | Usar busca e categorias na interface | Lista visual reflete filtro e termo | A preencher |
| T06 | Sacola | Adicionar item, aumentar/diminuir quantidade e remover | Quantidades e totais visuais atualizados | A preencher |
| T07 | Pedido válido | Enviar dados de teste com produto ativo | HTTP 201; pedido e itens persistidos | A preencher |
| T08 | Total calculado no servidor | Enviar item com ID/quantidade; tentar incluir campo de preço adulterado | API ignora preço enviado e usa banco | A preencher |
| T09 | E-mail inválido | Enviar e-mail inválido em `POST /api/orders` | HTTP 422 e mensagem de validação | A preencher |
| T10 | Quantidade inválida | Enviar quantidade 0, negativa ou maior que 20 | HTTP 422 | A preencher |
| T11 | Produto inativo/inexistente | Enviar ID não ativo no pedido | HTTP 422; sem pedido parcial | A preencher |
| T12 | Atomicidade | Forçar falha de gravação em ambiente de teste controlado | Nenhum pedido/itens parciais ficam gravados | A preencher |
| T13 | Consulta de pedido | Abrir `GET /api/orders/{id}` | Status e valores sem dados de contato | A preencher |
| T14 | CRUD sem token | Tentar `POST /api/products` sem token | HTTP 403 | A preencher |
| T15 | CRUD token inválido | Tentar alteração com token incorreto | HTTP 403 | A preencher |
| T16 | CRUD autorizado | Criar/editar/desativar produto com token correto | Operação aceita e produto atualizado/desativado | A preencher |
| T17 | API indisponível | Desligar API e tentar checkout | Interface informa indisponibilidade; não inventa confirmação | A preencher |
| T18 | Responsividade | Testar larguras de celular, tablet e desktop | Conteúdo não transborda e controles são utilizáveis | A preencher |
| T19 | Acessibilidade básica | Navegar por teclado, conferir labels e foco | Fluxo principal operável sem mouse | A preencher |
| T20 | Segredo | Ver código-fonte do navegador e arquivos publicados | Credenciais e token não aparecem no front-end | A preencher |
| T21 | Live Server sem back-end | Abrir `index.html` com Live Server, adicionar item e concluir o formulário com dados fictícios | Interface mostra resumo local e informa que nada foi enviado ou gravado; nenhum pedido aparece no banco | A preencher |

## Registro de execução

Copie este bloco para cada execução:

- **Caso:**
- **Data/hora:**
- **Ambiente/versão:**
- **Passos executados:**
- **Resultado esperado:**
- **Resultado observado:**
- **Status:** Aprovado / Reprovado / Bloqueado
- **Evidência (captura, log ou consulta SQL):**
- **Defeito aberto e correção:**

## Consultas de verificação no banco

```sql
SELECT id, order_code, status, subtotal, delivery_fee, total, created_at
FROM orders ORDER BY id DESC LIMIT 10;

SELECT oi.order_id, oi.product_name, oi.quantity, oi.unit_price
FROM order_items oi WHERE oi.order_id = ?;
```

Usar somente em banco de teste e não incluir dados pessoais reais nas capturas anexadas ao relatório.

## Critérios de aceite

- Todos os casos críticos T01–T04, T07–T16 e T20 executados e sem falhas abertas críticas.
- Pedido e itens persistem corretamente e o total é recalculado no servidor.
- Tentativas administrativas não autorizadas são recusadas.
- A interface não apresenta pedido como gravado quando a API está indisponível.
- No Live Server, catálogo, sacola e checkout demonstrativo podem ser testados sem PHP; esse fluxo não valida a API nem persiste pedidos.
- Evidências reais são anexadas e eventuais limitações são descritas honestamente.
