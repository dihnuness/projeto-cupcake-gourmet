# Contrato da API — Cupcake Gourmet

Base local: `http://127.0.0.1:8000/api`. Todas as respostas usam JSON UTF-8. Os endpoints são servidos por `api/index.php`, com rewrite do Apache ou `router.php` no servidor PHP embutido.

O Live Server do Visual Studio Code serve apenas os arquivos estáticos do front-end e não executa estes endpoints. Para testar a API e a persistência, inicie o servidor PHP e configure o MySQL/MariaDB conforme o `README.md`.

## Respostas e erros

- `200 OK`: consulta ou atualização bem-sucedida.
- `201 Created`: produto ou pedido criado.
- `400 Bad Request`: corpo ou parâmetro malformado.
- `403 Forbidden`: token administrativo ausente/inválido.
- `404 Not Found`: rota ou recurso inexistente.
- `405 Method Not Allowed`: método não suportado.
- `422 Unprocessable Entity`: dados rejeitados por validação.
- `500 Internal Server Error`: falha interna; detalhes técnicos ficam no log do servidor.

## `GET /products`

Lista produtos ativos. Exemplo de resposta:

```json
{"data":[{"id":1,"name":"Chocolate Belga","description":"...","category":"Clássicos","price":12.9,"rating":4.9,"tag":"Mais vendido","image":"https://..."}]}
```

## `GET /products/{id}`

Retorna um produto ativo ou `404`.

## `POST /products` (admin)

Cabeçalho obrigatório: `X-Admin-Token: <token configurado no servidor>`.

```json
{"name":"Cupcake de teste","description":"Descrição do produto","category":"Clássicos","price":12.5,"rating":4.8,"tag":"Novo","image":"https://example.com/cupcake.jpg"}
```

Categorias permitidas: `Clássicos`, `Especiais`, `Frutados`. Nome: 2–120 caracteres; descrição: até 1000; preço positivo até 10000; avaliação entre 0 e 5. `PUT /products/{id}` atualiza; `DELETE /products/{id}` desativa. O token é para demonstração e deve ser mantido exclusivamente no servidor/cliente administrativo confiável.

## `POST /orders`

Registra pedido. O navegador envia apenas ID e quantidade dos itens; preços e totais são calculados pelo servidor com os dados do banco.

```json
{
  "name":"Pessoa de Teste",
  "email":"teste@example.com",
  "phone":"71999999999",
  "address":"Rua de Teste, 123, Centro, Cidade",
  "payment":"Pix (simulação)",
  "items":[{"id":1,"qty":2},{"id":3,"qty":1}]
}
```

Sucesso `201`:

```json
{"message":"Pedido registrado. Pagamento não processado: modo de demonstração.","data":{"id":1,"code":"CG-A1B2C3D4","status":"Recebido","subtotal":37.7,"delivery_fee":8,"total":45.7}}
```

A resposta de exemplo é ilustrativa, não representa um pedido real. O endpoint valida campos e quantidades, confere se os produtos estão ativos, inicia transação, grava pedido e itens e confirma a transação. Se houver falha, deve desfazer a transação.

## `GET /orders/{id}`

Retorna ID, código, status, valores e data de criação. Não retorna nome, e-mail, telefone ou endereço. Para produção, considere consulta autenticada ou código de consulta secreto para reduzir risco de enumeração de IDs.

## `GET /health`

Retorna estado básico da API. Não verifica métricas avançadas, latência ou saúde completa de infraestrutura.
