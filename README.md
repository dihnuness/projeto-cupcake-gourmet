# Cupcake Gourmet — Projeto Integrador II

Sistema demonstrativo de encomendas de cupcakes, reconstruído para o Projeto Integrador Transdisciplinar em Engenharia de Software II.

## Executar no XAMPP (Windows 11)
1. Copie esta pasta para `C:\xampp\htdocs\cupcake-gourmet`.
2. Inicie Apache e MySQL no XAMPP.
3. **Se você já importou o banco do projeto antigo**, faça antes um backup e, somente se não houver dados que queira manter, exclua o banco local antigo `cupcake_gourmet` pelo phpMyAdmin. O esquema novo é diferente; `CREATE TABLE IF NOT EXISTS` não atualiza tabelas existentes. Em seguida, importe `database/schema.sql` (cria banco, tabelas e oito produtos).
4. Copie `config/database.example.php` para `config/database.php`. Em instalação local padrão do XAMPP, usuário `root`, senha vazia. **Não publique o arquivo de configuração.**
5. Acesse `http://localhost/cupcake-gourmet/`.
6. Confira `http://localhost/cupcake-gourmet/api.php?action=health` e `http://localhost/cupcake-gourmet/api.php?action=products`.
7. Faça um pedido fictício e confira `orders` e `order_items` no phpMyAdmin.

**Requisitos:** PHP 8.1+, PDO MySQL, MySQL/MariaDB, Apache. **Pagamento é simulado**, sem transações financeiras.

## Funcionalidades
Catálogo com busca e filtro; sacola com ajuste de quantidade; formulário de checkout com validação; persistência transacional de pedido e itens; consulta por código de pedido; interface responsiva; mensagens de erro. O servidor obtém preços do banco e não confia em valores enviados pelo navegador.

## Entrega acadêmica
- `docs/relatorio-academico.md`: escopo, requisitos, arquitetura, UML, modelagem e IHC.
- `docs/dicionario-de-dados.md`: campos, chaves e normalização.
- `docs/plano-e-registro-de-testes.md`: cenários e espaço para resultados reais.
- `docs/avaliacao-usuarios.md`: formulário para cinco avaliações reais.
- `docs/roteiro-video.md`: guia de demonstração.

Os testes locais e as avaliações de cinco pessoas **precisam ser executados**; não foram simulados como evidência. Não use dados pessoais reais em ambiente de demonstração.
