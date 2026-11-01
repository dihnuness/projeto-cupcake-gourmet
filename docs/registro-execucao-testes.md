# Registro de execução dos testes — preenchimento obrigatório

Este arquivo complementa `docs/roteiro-testes.md` (T01 a T21). **Nenhum teste foi declarado aprovado apenas por inspeção de código.** A execução deve ocorrer com PHP e MySQL configurados.

## Ambiente de execução

- Data e horário:
- Responsável:
- Sistema operacional:
- Navegador:
- PHP (`php -v`):
- MySQL/MariaDB (versão):
- URL de execução:
- Commit/versão:
- Evidências (diretório ou links):

## Resultado dos 21 casos

| ID | Teste | Estado | Evidência |
|---|---|---|---|
| T01 | Saúde da API | Não executado | — |
| T02 | Catálogo pela API | Não executado | — |
| T03 | Produto por ID | Não executado | — |
| T04 | Produto inexistente | Não executado | — |
| T05 | Busca e filtros | Não executado | — |
| T06 | Sacola | Não executado | — |
| T07 | Gravar pedido | Não executado | — |
| T08 | Recalcular preço no servidor | Não executado | — |
| T09 | E-mail inválido | Não executado | — |
| T10 | Quantidade inválida | Não executado | — |
| T11 | Produto inativo/inexistente | Não executado | — |
| T12 | Atomicidade | Não executado | — |
| T13 | Consultar pedido | Não executado | — |
| T14 | CRUD sem token | Não executado | — |
| T15 | CRUD token inválido | Não executado | — |
| T16 | CRUD autorizado | Não executado | — |
| T17 | API indisponível | Não executado | — |
| T18 | Responsividade | Não executado | — |
| T19 | Acessibilidade básica | Não executado | — |
| T20 | Segredos não expostos | Não executado | — |
| T21 | Live Server demonstrativo | Não executado | — |

Atualize cada estado para **Aprovado**, **Reprovado** ou **Bloqueado** somente após observar o resultado.

## Roteiro mínimo para a apresentação

1. Importar `database/schema.sql` em MySQL/MariaDB de teste.
2. Criar `config/database.php` local a partir do exemplo, sem publicá-lo.
3. Iniciar `php -S 127.0.0.1:8000 router.php`.
4. Abrir `http://127.0.0.1:8000/api/health` e `/api/products`; registrar status e captura.
5. Abrir a loja, pesquisar e filtrar, adicionar itens e modificar quantidades.
6. Enviar pedido com **dados fictícios**; conferir confirmação.
7. Executar `SELECT id, order_code, total FROM orders ORDER BY id DESC LIMIT 5;` e `SELECT order_id, product_name, quantity, unit_price FROM order_items ORDER BY id DESC LIMIT 10;` e capturar resultados sem dados pessoais.
8. Testar pelo menos um caso inválido e documentar o erro.
9. Completar os demais casos de `docs/roteiro-testes.md` e anexar evidências.

## Registro de defeitos

| ID | Caso de teste | Defeito observado | Severidade | Correção/commit | Reteste |
|---|---|---|---|---|---|
| — | — | Preencher após executar | — | — | — |

## Validação por cinco pessoas

A disciplina solicita avaliação por cinco colegas/profissionais. A página `pesquisa.html` contém **respostas simuladas** e não comprova entrevistas ou testes reais. Coletar as avaliações efetivas separadamente, com autorização dos participantes, data, cenário, dificuldades, sugestões e capturas quando aplicável. Não substituir esses registros por simulações.

## Critério para concluir

Preencher resultados observados, anexar capturas/logs, documentar falhas e correções, e registrar o ambiente real. Sem isso, o material é um plano de testes, não um relatório de execução.
