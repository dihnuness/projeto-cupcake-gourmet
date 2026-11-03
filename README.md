# 🧁 Cupcake Gourmet

**Projeto Integrador Transdisciplinar em Engenharia de Software II**

O Cupcake Gourmet é um sistema web demonstrativo para uma confeitaria. O projeto permite explorar um catálogo de cupcakes, montar uma sacola, registrar pedidos fictícios e consultar pedidos por um código gerado pelo sistema.

> **Projeto acadêmico:** não são realizadas vendas, cobranças ou transações financeiras reais. Utilize dados fictícios nas demonstrações.

## 🌐 Demonstração online

**[Acessar o Cupcake Gourmet](https://cupcakegourmet.infinityfreeapp.com/)**

## Funcionalidades

- Catálogo de cupcakes com busca por nome e filtro por categoria.
- Sacola com inclusão, remoção e ajuste de quantidades.
- Formulário de pedido com validação dos dados.
- Registro de pedidos e seus itens no banco de dados.
- Código para consultar um pedido após sua realização.
- Interface responsiva e mensagens de feedback.
- Preços consultados e calculados pelo servidor, sem confiar nos valores enviados pelo navegador.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Interface | HTML, CSS e JavaScript |
| Backend | PHP 8.1+ e PDO |
| Banco de dados | MySQL/MariaDB |
| Servidor local | Apache (XAMPP) |
| Hospedagem de demonstração | InfinityFree |

## Documentação acadêmica

- [Relatório técnico: escopo, requisitos, arquitetura e modelagem](docs/relatorio-academico.md)
- [Dicionário de dados](docs/dicionario-de-dados.md)
- [Plano e registro de testes](docs/plano-e-registro-de-testes.md)
- [Avaliação com usuários](docs/avaliacao-usuarios.md)

## Validação com usuários

O sistema foi avaliado por **seis participantes**, em 01 e 02/11/2026. Todos relataram conseguir visualizar os produtos e adicioná-los à sacola; **5/6** relataram finalizar um pedido demonstrativo e **4/6** consultar um pedido pelo código. A **média da avaliação geral foi de 4,0/5** (navegação e aparência: **4,5/5** cada). O feedback indicou oportunidades de melhoria na experiência do carrinho e no fluxo de compra.

Os resultados são respostas declaradas pelos participantes; não substituem testes técnicos automatizados. Consulte os documentos de avaliação e de testes para ver as evidências e limitações.

## Executar localmente

**Requisitos:** PHP 8.1+ com PDO MySQL, MySQL/MariaDB e Apache (por exemplo, via XAMPP).

1. Coloque o projeto em `C:\xampp\htdocs\cupcake-gourmet`.
2. Inicie Apache e MySQL no XAMPP.
3. Em uma instalação nova, importe `database/schema.sql` no MySQL. **Se já existir um banco com dados, faça backup e revise o esquema antes de importar; não exclua dados sem necessidade.**
4. Copie `config/database.example.php` para `config/database.php` e ajuste as credenciais do seu ambiente.
5. Acesse `http://localhost/cupcake-gourmet/` no navegador.

**Segurança:** não publique `config/database.php`, senhas ou dados pessoais reais. O arquivo de configuração local está listado no `.gitignore`.

---

Desenvolvido como atividade acadêmica do curso de **Engenharia de Software**.
