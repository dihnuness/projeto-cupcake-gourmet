# Plano de verificação e validação — PIT II

**Responsável:** Diogo Nunes dos Santos — RGM 33207445  
**Data das evidências e avaliações:** 01/11/2026  
**Sistema:** Cupcake Gourmet, execução local com XAMPP/PHP/MySQL. Versões exatas dos componentes não registradas.

## Critério de registro

- **Evidenciado:** comportamento visível nas capturas de tela fornecidas pelo autor.
- **Relatado:** cinco participantes marcaram “Sim” no formulário; isso não substitui logs técnicos.
- **Pendente:** não foi fornecida evidência suficiente para confirmar o cenário específico.

## Matriz de testes

| ID | Ação | Resultado esperado | Registro em 01/11/2026 | Evidência / ressalva |
|---|---|---|---|---|
| T01 | Abrir site | Interface carrega | **Evidenciado** | Captura da página inicial e catálogo |
| T02 | GET api.php?action=health | HTTP 200, status ok | **Pendente** | Não há captura da resposta da API |
| T03 | GET api.php?action=products | Lista de oito produtos | **Parcial** | O catálogo foi exibido; não foi capturada a resposta HTTP |
| T04 | Pesquisar Chocolate | Filtra catálogo | **Pendente** | Campo de busca visível, sem execução documentada |
| T05 | Filtrar Frutados | Apenas categoria escolhida | **Pendente** | Seletor visível, sem resultado filtrado documentado |
| T06 | Adicionar produto | Sacola e contador atualizam | **Evidenciado parcialmente; relatado por 5/5** | Sacola mostra Chocolate Belga e Red Velvet; não há captura da transição do contador |
| T07 | Aumentar e diminuir quantidade | Subtotal atualiza | **Pendente** | Botões visíveis; não há antes/depois documentado |
| T08 | Enviar sacola vazia | Mensagem de validação | **Pendente** | Sem evidência |
| T09 | Enviar e-mail inválido | Pedido não é gravado | **Pendente** | Sem evidência |
| T10 | Enviar pedido válido | Código de 12 caracteres | **Evidenciado; relatado por 5/5** | Confirmação com código alfanumérico e total de R$ 34,80 |
| T11 | Conferir tabela orders | Pedido salvo | **Pendente de inspeção direta** | Consulta posterior sugere persistência, mas não há captura da tabela |
| T12 | Conferir tabela order_items | Itens salvos e associados | **Pendente** | Sem captura do banco |
| T13 | Consultar código válido | Status e total corretos | **Evidenciado; relatado por 5/5** | Consulta mostra o mesmo código, status “Recebido” e R$ 34,80 |
| T14 | Consultar código inexistente | HTTP 404/mensagem | **Pendente** | Sem evidência |
| T15 | Desligar MySQL e recarregar | Mensagem de indisponibilidade | **Pendente** | Sem evidência |
| T16 | Testar tela estreita | Layout responsivo | **Pendente** | Capturas apresentadas em largura de desktop |
| T17 | Navegação por teclado | Controles alcançáveis | **Pendente** | Sem evidência |
| T18 | Enviar item inválido à API | HTTP 422, sem gravação | **Pendente** | Sem evidência |

## Avaliação por cinco participantes

Em 01/11/2026, João Lucas, Matheus Dummont, Fabio Marinho, Denis santana e Douglas Santana responderam ao formulário. Todos declararam conseguir visualizar cupcakes, adicionar itens à sacola, consultar o pedido e finalizar uma encomenda demonstrativa. A nota média geral foi **4,6/5**; navegação e aparência receberam médias de **5,0/5**. Quatro participantes informaram explicitamente não ter encontrado dificuldades; um não preencheu esse campo.

Detalhamento em [avaliacao-usuarios.md](avaliacao-usuarios.md).

## Evidências visuais do autor

Capturas de 01/11/2026: página inicial; catálogo; seção “Sobre”; formulário de consulta; sacola com dois produtos (subtotal R$ 26,80, entrega R$ 8,00, total R$ 34,80); confirmação de pedido fictício com código; consulta desse código exibindo “Recebido” e R$ 34,80.

As capturas estão inseridas no **laudo de qualidade do documento Word da atividade PIT II**. A imagem do formulário continha informações pessoais de demonstração; recomenda-se usar recorte ou ocultação antes de divulgar.

## Registro de defeitos e correções

O formulário dos participantes **não descreveu defeitos específicos**. Portanto, não se registra correção decorrente desses testes nem reteste corretivo sem evidência. Há cenários técnicos ainda pendentes, listados acima, que não devem ser confundidos com falhas encontradas.

## Limitações

As respostas dos participantes comprovam suas declarações de uso, mas não validam isoladamente códigos HTTP, consultas SQL, acessibilidade, responsividade ou resistência a entradas inválidas. Não foram fornecidas capturas de phpMyAdmin, respostas da API ou testes negativos. Pagamentos são exclusivamente simulados.
