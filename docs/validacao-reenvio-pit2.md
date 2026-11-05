# Plano rápido de validação — reenvio PIT II

**Estado:** testes abaixo devem ser executados após publicar a versão revisada. Não marcar como aprovado sem observar o resultado.

## Fluxo principal (usar dados fictícios)

1. Abrir a página e confirmar que os oito cupcakes são carregados.
2. Pesquisar "Chocolate" e conferir o filtro; selecionar "Frutados" e conferir o resultado.
3. Clicar "Adicionar +" em dois produtos: a sacola **não** deve abrir automaticamente; abrir pelo botão Sacola.
4. Conferir subtotal e taxa de entrega (R$ 8,00), aumentar e diminuir quantidade e usar "Continuar comprando".
5. Finalizar pedido fictício, guardar o código de 12 caracteres, conferir a mensagem e a rolagem para "Consultar pedido".
6. Consultar o código: deve aparecer **Recebido (atual)**, com as demais etapas **pendentes** e o total correto.
7. Consultar código inexistente de 12 caracteres hexadecimais: deve exibir "Pedido não encontrado".
8. Testar e-mail inválido e sacola vazia: o sistema deve impedir o registro.

## Atualização de status para demonstrar rastreamento

O site não tem painel administrativo e **não** deve oferecer atualização pública de status. Somente o responsável com acesso autorizado ao banco pode executar uma alteração demonstrativa em um pedido fictício.

No phpMyAdmin, após localizar um pedido fictício pelo código, execute **uma etapa por vez** (substitua o código fictício):

```sql
UPDATE orders
SET status = 'Em preparação'
WHERE code = 'COLOQUECODIGO' AND status = 'Recebido';
```

Depois consulte o pedido novamente no site. A etapa "Em preparação" deve aparecer como atual. Etapas seguintes possíveis, se a demonstração exigir: `Pronto para entrega`, `Saiu para entrega`, `Entregue`. Não altere pedidos reais ou dados pessoais. A alteração é manual, demonstrativa, e não representa uma entrega física.

## Evidências para o template

Capture telas da página inicial, filtros, sacola, confirmação de pedido, consulta inicial, consulta após alteração controlada e respostas de erro. Registre data, resultado observado e eventual defeito. As seis avaliações de 01–02/11 são anteriores às melhorias e **não** comprovam reteste da nova versão.

## Vídeo de até 5 minutos

0:00–0:30: objetivo e tecnologias; 0:30–1:10: arquivos `index.html`, `app.js`, `api.php`, `database/schema.sql`; 1:10–3:35: catálogo, sacola, pedido e rastreamento; 3:35–4:25: testes e seis avaliações (média geral 4,0/5); 4:25–4:50: laudo, limites e melhorias.

**Nota:** a hospedagem InfinityFree não atualiza automaticamente quando o GitHub muda. Publicar os arquivos revisados no servidor antes de gravar o vídeo.
