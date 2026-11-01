# Plano de verificação e validação

**Não há testes executados comprovados neste arquivo.** Preencha data, ambiente, resultado observado e evidência após cada execução.

| ID | Ação | Resultado esperado | Resultado real | Evidência |
|---|---|---|---|---|
| T01 | Abrir site | Interface carrega | Pendente | |
| T02 | GET api.php?action=health | HTTP 200, status ok | Pendente | |
| T03 | GET api.php?action=products | Lista de oito produtos | Pendente | |
| T04 | Pesquisar Chocolate | Filtra catálogo | Pendente | |
| T05 | Filtrar Frutados | Apenas categoria escolhida | Pendente | |
| T06 | Adicionar produto | Sacola e contador atualizam | Pendente | |
| T07 | Aumentar e diminuir quantidade | Subtotal atualiza | Pendente | |
| T08 | Enviar sacola vazia | Mensagem de validação | Pendente | |
| T09 | Enviar e-mail inválido | Pedido não é gravado | Pendente | |
| T10 | Enviar pedido válido | Código de 12 caracteres | Pendente | |
| T11 | Conferir tabela orders | Pedido salvo | Pendente | |
| T12 | Conferir tabela order_items | Itens salvos e associados | Pendente | |
| T13 | Consultar código válido | Status e total corretos | Pendente | |
| T14 | Consultar código inexistente | HTTP 404/mensagem | Pendente | |
| T15 | Desligar MySQL e recarregar | Mensagem de indisponibilidade | Pendente | |
| T16 | Testar tela estreita | Layout responsivo | Pendente | |
| T17 | Navegação por teclado | Controles alcançáveis | Pendente | |
| T18 | Enviar item inválido à API | HTTP 422, sem gravação | Pendente | |

## Ambiente
Data: ___ | Responsável: ___ | Windows: ___ | PHP: ___ | MySQL: ___ | Navegador: ___ | Commit: ___

## Registro de falhas
| ID | Teste | Defeito | Correção | Reteste |
|---|---|---|---|---|
| | | | | |

## Evidências
Capturar tela do catálogo, sacola, confirmação, phpMyAdmin com tabelas e registros fictícios, erros de validação e visualização mobile. Não registrar dados pessoais reais.
