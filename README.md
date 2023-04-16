# Trabalho de Frameworks

## ***Ferramentas:***
* Vue
* Node.JS
* Express
* Vite

## ***Rotas Front:***
* /login - Pagina de login Erp
* /dashboard - Pagina Principal
* /user - Pagina com listagem e filtros
* /user/{uuid} - Visualiza informações do usuario podendo editar
* /product - Pagina com listagem e filtros
* /product/{id} - Pagina permite visualizar e alterar informações
* /client - Pagina com listagem e filtros
* /client{uuid} - Pagina permite visualizar e alterar informações
* /orders - Listagem das vendas e fitros por status e cliente
* /orders/{id} - Pagina permite visualizar venda
* /report - Listagem de relatórios
* /report/orders - Relatório de vendas
* /report/client - Relatórios de clientes

## ***Rotas Backend:***
* /login [POST] - BasicAuth
* /user [GET,POST] - Usado para recuperar todos usuarios e cadastrar
* /user/{uuid} [GET,PUT] - Busca user completo ou alterar usuario
* /product [GET,POST] - Consultar e cadastrar produtos
* /product/{id} [GET,PUT] - Busca informarções do produto e altera cadastro
* /client [GET,POST] - Busca todos clientes e cadastra cliente
* /client{uuid} [GET,PUT] - Busca informarções do cliente e altera cadastro
* /orders [GET,POST] - Busca todas as vendas e cadastra nova venda
* /orders/{id} [GET,PUT] - Busca informarções da venda e altera venda se não tiver finalizada

## ***Tabelas:***

