# Cupcake Gourmet — Projeto Integrador

Aplicação web responsiva de catálogo e pedidos para uma confeitaria de cupcakes. O pacote contém front-end (HTML/CSS/JavaScript), API REST em PHP 8.1+ e banco de dados MySQL/MariaDB.

## Escolha tecnológica: PHP em vez de Java

Foi escolhido **PHP com PDO e MySQL** porque a interface existente é HTML/CSS/JavaScript e o objetivo é uma aplicação web pequena, com implantação simples em hospedagens compartilhadas que já oferecem PHP/MySQL. Isso reduz a configuração e a quantidade de componentes necessários. Java (por exemplo, Spring Boot) seria uma boa escolha para serviços maiores, com equipes e infraestrutura dedicadas, mas exigiria empacotamento, execução de JVM e configuração adicionais que não trazem vantagem proporcional para este escopo acadêmico.

## Funcionalidades

- Catálogo de produtos consultado pela API, com busca e filtros no navegador.
- Sacola com quantidades e cálculo visual de subtotal, taxa de entrega e total.
- Criação persistente de pedidos em transação SQL; o servidor recalcula preços usando o catálogo do banco (não confia nos valores enviados pelo navegador).
- Consulta pública limitada do status de um pedido por ID.
- CRUD de produtos protegido por token administrativo via cabeçalho `X-Admin-Token`.
- Validação de entrada, consultas preparadas PDO, chaves estrangeiras, respostas JSON e códigos HTTP.
- Scripts SQL de criação e carga inicial; documentação acadêmica e roteiro de testes.

## Requisitos

- PHP 8.1 ou superior.
- Extensões PHP `pdo_mysql` e `mbstring`.
- MySQL 8+ ou MariaDB compatível com InnoDB e `utf8mb4`.
- Apache com `mod_rewrite` para URLs amigáveis, ou o servidor local descrito abaixo.

## Instalação local

1. Instale PHP e MySQL/MariaDB. Crie um usuário de banco com permissão apenas para o banco `cupcake_gourmet`.
2. Importe `database/schema.sql` pelo phpMyAdmin ou terminal: `mysql -u SEU_USUARIO -p < database/schema.sql` (o script cria o banco).
   Se já tinha o banco instalado, atualize a imagem do produto executando: `UPDATE products SET image = 'assets/morango-encantado.jpg' WHERE id = 5;`.
3. Copie `config/database.example.php` para `config/database.php` e configure host, banco, usuário, senha e um token aleatório com pelo menos 32 caracteres. **Nunca publique `database.php`.**
4. No terminal, entre na pasta do projeto e execute `php -S 127.0.0.1:8000 router.php`.
5. Abra `http://127.0.0.1:8000`. O navegador deve buscar os produtos da API. Verifique `http://127.0.0.1:8000/api/health` para o estado do serviço.
6. Adicione um produto à sacola e faça um pedido de teste. Confira as tabelas `orders` e `order_items` no banco.

## Testar a interface com Live Server (sem PHP ou banco)

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão **Live Server**, se ainda não estiver instalada.
3. Clique com o botão direito em `index.html` e selecione **Open with Live Server**.
4. Teste busca, filtros, detalhes do produto, sacola, quantidades e o formulário de checkout.
5. No checkout, a interface monta um resumo demonstrativo e informa que ele **não foi enviado nem salvo**. Esse modo testa somente o front-end; não cria pedidos na API ou no banco.

Para testar gravação real de pedidos, use o servidor PHP e o banco da seção **Instalação local**. O Live Server serve arquivos estáticos e não executa PHP. Se a API não estiver configurada, o catálogo local continua disponível e o checkout permanece claramente identificado como demonstração local.

## Endpoints

| Método | Caminho | Acesso | Finalidade |
|---|---|---|---|
| GET | `/api/health` | Público | Verifica serviço (não substitui monitoramento de infraestrutura) |
| GET | `/api/products` | Público | Lista produtos ativos |
| GET | `/api/products/{id}` | Público | Consulta produto ativo |
| POST | `/api/products` | Token admin | Cria produto |
| PUT/PATCH | `/api/products/{id}` | Token admin | Atualiza produto |
| DELETE | `/api/products/{id}` | Token admin | Desativa produto (soft delete) |
| POST | `/api/orders` | Público | Registra pedido e itens em transação |
| GET | `/api/orders/{id}` | Público, resposta reduzida | Consulta status e valores, sem dados de contato |

Exemplo de criação de produto (substitua o token e os dados):

```bash
curl -X POST http://127.0.0.1:8000/api/products \
  -H 'Content-Type: application/json' \
  -H 'X-Admin-Token: SEU_TOKEN_ADMIN' \
  -d '{"name":"Cupcake de teste","description":"Descrição de teste","category":"Clássicos","price":12.5,"rating":4.8,"tag":"Novo","image":"https://example.com/cupcake.jpg"}'
```

## Segurança e limites conhecidos

- Pagamentos são **simulações**. Nenhum cartão, senha bancária ou dado de pagamento é coletado/processado. Não anuncie pagamento real sem integrar um provedor confiável.
- Token administrativo compartilhado é uma proteção mínima para um projeto didático, não substitui contas individuais, gestão de sessão, MFA, rotação e auditoria. Não coloque o token no JavaScript.
- Antes de produção, adicionar rate limiting, logs/auditoria, política de backup, monitoramento, proteção antiabuso, gestão de consentimento/privacidade, HTTPS obrigatório e testes de segurança.
- A consulta de pedido usa ID incremental; para uso real, prefira código aleatório de consulta e/ou autenticação para evitar enumeração.
- O endpoint público de criação armazena dados pessoais de contato e endereço. Defina finalidade, retenção, acesso restrito e aviso de privacidade conforme LGPD antes de operar com clientes reais.
- A taxa de entrega está fixa em R$ 8,00 para fins demonstrativos; ajuste a regra no back-end antes da implantação.
- A imagem de “Morango Encantado” está incluída em `assets/morango-encantado.jpg` e é creditada abaixo. As demais imagens do catálogo são URLs externas; confirme disponibilidade e licenças antes de uso comercial.

### Crédito da imagem “Morango Encantado”

“Strawberry cupcakes”, de Selma Broeder, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Strawberry_cupcakes_(6092771387).jpg), licenciada sob [Creative Commons Attribution 2.0 (CC BY 2.0)](https://creativecommons.org/licenses/by/2.0/).

## Estrutura

```text
index.html                 interface
styles.css                 identidade visual responsiva
app.js                     interações e integração com API
router.php                 roteador para servidor PHP embutido
api/index.php              API REST
api/.htaccess               rewrite para Apache
config/database.example.php modelo de configuração
config/.htaccess            bloqueio de acesso direto (Apache)
database/schema.sql         tabelas e dados iniciais
docs/                       documentação acadêmica e testes
```

## Documentação acadêmica

Consulte `docs/documentacao-academica.md`, `docs/modelo-dados.md`, `docs/api.md` e `docs/roteiro-testes.md`. Os testes devem ser executados no ambiente-alvo e seus resultados reais registrados antes da entrega; este repositório não afirma que testes de integração com um banco específico já foram executados.
