# API HTTP de Vendas (Node.js + MySQL)

Este projeto é uma **API HTTP construída sem frameworks**, utilizando apenas **Node.js puro (`http`)** e **MySQL**, com o objetivo de entender profundamente como funciona o backend por baixo dos frameworks modernos.

> Este projeto **não utiliza Express**, propositalmente.

---

## Objetivo do Projeto

O objetivo principal foi:
- Entender como funciona uma API **do zero**
- Trabalhar diretamente com:
  - requisições HTTP
  - parsing manual de JSON
  - rotas
  - conexão com banco de dados
  - SQL
  - chaves estrangeiras
  - erros reais de ambiente

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (módulo `http`)
- **MySQL / MariaDB**
- **mysql2**
- **JavaScript**

---

## 🗂️ Estrutura do Projeto
.
├── controllers/
│ └── pedidosController.js
├── db.js
├── server.js
├── routes.js
├── bdVendas.sql
└── package.json


---

## Funcionalidades

### Produtos
- Listagem de produtos cadastrados no banco de dados

### Pedidos
- Criação de pedidos a partir de uma lista de produtos
- Cálculo automático do total
- Inserção em:
  - tabela `pedidos`
  - tabela `pedido_itens`
- Relacionamento com **foreign keys**

## Como executar o projeto?
 - Instalar dependências ("npm install")
 - Configurar o db.js: 
"host: "",
user: "",
password: "",
database: "loja_perifericos""

 - Rodar o servidor: node server.js
 - Servidor disponível em: http://localhost:3001/pedidos

 # ROTAS DISPONÍVEIS
  - GET /pedidos
  - POST /pedidos

  curl -X POST http://localhost:3001/pedidos \
-H "Content-Type: application/json" \
-d '{"produtos":[1,3]}'




