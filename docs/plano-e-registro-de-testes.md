# Plano de verificação e validação — PIT II

**Responsável:** Diogo Nunes dos Santos — RGM 33207445  
**Data das evidências:** 01/11/2026; **avaliações:** 01 e 02/11/2026  
**Sistema:** Cupcake Gourmet, execução local com XAMPP/PHP/MySQL. Versões exatas dos componentes não registradas.

## Critério de registro

- **Evidenciado:** comportamento visível nas capturas de tela fornecidas pelo autor.
- **Relatado:** seis participantes responderam ao formulário, com resultados mistos; isso não substitui logs técnicos.
- **Pendente:** não foi fornecida evidência suficiente para confirmar o cenário específico.

## Matriz de testes

| ID | Ação | Resultado esperado | Registro em 01/11/2026 | Evidência / ressalva |
|---|---|---|---|---|
| T01 | Abrir site | Interface carrega | **Evidenciado** | Captura da página inicial e catálogo |
| T02 | GET api.php?action=health | HTTP 200, status ok | **Pendente** | Não há captura da resposta da API |
| T03 | GET api.php?action=products | Lista de oito produtos | **Parcial** | O catálogo foi exibido; não foi capturada a resposta HTTP |
| T04 | Pesquisar Chocolate | Filtra catálogo | **Pendente** | Campo de busca visível, sem execução documentada |
| T05 | Filtrar Frutados | Apenas categoria escolhida | **Pendente** | Seletor visível, sem resultado filtrado documentado |
| T06 | Adicionar produto | Sacola e contador atualizam | **Evidenciado parcialmente; relatado por 6/6** | Sacola mostra Chocolate Belga e Red Velvet; não há captura da transição do contador |
| T07 | Aumentar e diminuir quantidade | Subtotal atualiza | **Pendente** | Botões visíveis; não há antes/depois documentado |
| T08 | Enviar sacola vazia | Mensagem de validação | **Pendente** | Sem evidência |
| T09 | Enviar e-mail inválido | Pedido não é gravado | **Pendente** | Sem evidência |
| T10 | Enviar pedido válido | Código de 12 caracteres | **Evidenciado; relatado por 5/6** | Confirmação com código alfanumérico e total de R$ 34,80 |
| T11 | Conferir tabela orders | Pedido salvo | **Pendente de inspeção direta** | Consulta posterior sugere persistência, mas não há captura da tabela |
| T12 | Conferir tabela order_items | Itens salvos e associados | **Pendente** | Sem captura do banco |
| T13 | Consultar código válido | Status e total corretos | **Evidenciado; relatado por 4/6** | Consulta mostra o mesmo código, status “Recebido” e R$ 34,80 |
| T14 | Consultar código inexistente | HTTP 404/mensagem | **Pendente** | Sem evidência |
| T15 | Desligar MySQL e recarregar | Mensagem de indisponibilidade | **Pendente** | Sem evidência |
| T16 | Testar tela estreita | Layout responsivo | **Pendente** | Capturas apresentadas em largura de desktop |
| T17 | Navegação por teclado | Controles alcançáveis | **Pendente** | Sem evidência |
| T18 | Enviar item inválido à API | HTTP 422, sem gravação | **Pendente** | Sem evidência |

## Avaliação por seis participantes

Em 01 e 02/11/2026, seis participantes responderam ao formulário considerado nesta versão. Todos declararam visualizar cupcakes e adicionar itens à sacola. **5/6** declararam finalizar um pedido demonstrativo e **4/6** consultar o pedido pelo código. As médias foram **4,0/5** na avaliação geral, **4,5/5** em navegação e **4,5/5** em aparência.

Foram sugeridas melhorias na experiência do carrinho, opção de continuar comprando, separação das etapas de endereço e pagamento e eventual login com níveis de acesso. As respostas negativas sobre consulta e finalização precisam ser investigadas; não há diagnóstico técnico suficiente para atribuir uma causa.

Detalhamento em [avaliacao-usuarios.md](avaliacao-usuarios.md).

## Evidências visuais do autor

Capturas de 01/11/2026: página inicial; catálogo; seção “Sobre”; formulário de consulta; sacola com dois produtos (subtotal R$ 26,80, entrega R$ 8,00, total R$ 34,80); confirmação de pedido fictício com código; consulta desse código exibindo “Recebido” e R$ 34,80.

As capturas estão inseridas no **laudo de qualidade do documento Word da atividade PIT II**. A imagem do formulário continha informações pessoais de demonstração; recomenda-se usar recorte ou ocultação antes de divulgar.

## Registro de defeitos e correções

O formulário trouxe sugestões de usabilidade e respostas negativas para consulta por código (2/6) e finalização (1/6). Isso sinaliza pontos para investigação, mas não permite diagnosticar defeitos específicos nem registrar correções ou retestes sem evidência. Há cenários técnicos pendentes na matriz acima.

## Limitações

As respostas dos participantes comprovam suas declarações de uso, mas não validam isoladamente códigos HTTP, consultas SQL, acessibilidade, responsividade ou resistência a entradas inválidas. Não foram fornecidas capturas de phpMyAdmin, respostas da API ou testes negativos. Pagamentos são exclusivamente simulados.
