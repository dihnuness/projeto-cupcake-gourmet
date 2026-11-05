# Resultados da validação e laudo de qualidade — 05/11/2026

## Avaliação com usuários — 01 e 02/11/2026
Seis participantes avaliaram o Cupcake Gourmet. Médias: navegação **4,5/5**, aparência **4,5/5** e avaliação geral **4,0/5**. Todos conseguiram adicionar produtos à sacola; cinco finalizaram um pedido; quatro consultaram um código. As recomendações incluíram não abrir automaticamente a sacola, permitir continuar comprando, separar etapas de endereço/pagamento e estudar login e níveis de acesso.

## Melhorias implementadas em 05/11/2026
- Adição de produtos sem abertura automática da sacola.
- Botão **Continuar comprando**.
- Etapas visuais de acompanhamento de pedido.
- Consulta do status registrado no MySQL, sem avanço automático.
- Preenchimento do código para facilitar a consulta após finalizar.

## Retestes executados com o responsável pelo projeto — 05/11/2026

| Verificação | Resultado observado | Situação |
|---|---|---|
| Adicionar produtos | Sacola permaneceu fechada; itens adicionados | Aprovado |
| Finalizar pedido demonstrativo | Pedido registrado e código gerado | Aprovado |
| Consultar pedido pelo código | Pedido encontrado e status exibido | Aprovado |
| Alterar status manualmente no MySQL | Status do pedido de teste passou a **Em preparação** | Aprovado |
| Exibir rastreamento atualizado | Site mostrou **Recebido (concluído)** e **Em preparação (atual)** | Aprovado |
| Consultar código inexistente | Mensagem **Pedido não encontrado** | Aprovado |
| Deixar e-mail obrigatório em branco | Navegador exibiu **Preencha este campo** e impediu envio | Aprovado |

**Evidência principal:** pedido demonstrativo `30ECE15DD2A5`, total **R$ 46,70**, status **Em preparação**, conferido no site e no phpMyAdmin. Capturas preservadas na documentação de entrega, com dados pessoais ocultados.

## Laudo de qualidade

**Parecer:** os fluxos acima funcionaram nos testes manuais executados em 05/11/2026. As alterações respondem a parte das sugestões dos participantes. Os resultados não substituem testes automatizados, de segurança ou de carga.

**Limitações e melhorias futuras:** atualização do status depende de acesso autorizado ao phpMyAdmin; não há painel administrativo, autenticação de usuários ou rastreamento GPS. Separar endereço e pagamento em etapas permanece como sugestão futura. Os pagamentos são apenas simulados e não existe entrega real.

**Conclusão:** o protótipo demonstrou registro, consulta e acompanhamento de pedidos, com evidências de evolução após avaliação de usuários. Não se afirma que todas as sugestões tenham sido implementadas.
