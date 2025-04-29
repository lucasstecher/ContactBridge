# 📦 ContactBridge

**ContactBridge** é uma API **NestJS + GraphQL** construída para integração de contatos em múltiplos bancos de dados (MySQL e MongoDB), usando autenticação via **JWT** e aplicação de regras de formatação específicas para cada cliente.

Este projeto foi desenvolvido com foco em arquitetura limpa, modularização e boas práticas de mercado.

---

## 🛠️ Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/)
- [Drizzle ORM](https://orm.drizzle.team/) (MySQL)
- [Mongoose](https://mongoosejs.com/) (MongoDB)
- [Docker & Docker Compose](https://www.docker.com/)
- [pnpm](https://pnpm.io/) como gerenciador de pacotes
- JWT (Json Web Tokens) para autenticação
- Diretivas personalizadas no GraphQL

---
### 📂 Organização do Projeto
```sh
📦 ContactBridge/
├── 📂 drizzle/                     # Migrations geradas pelo Drizzle ORM
├── 📂 node_modules/                # Dependências instaladas via pnpm
├── 📂 src/                         # Código-fonte da aplicação
│   ├── 📂 database/
│   │   └── 📂 drizzle/
│   │       └── connection.ts    # Conexão com o banco de dados MySQL (Drizzle)
│   ├── 📂 graphql/
│   │   ├── 📂 directives/
│   │   │   └── current-client.directive.ts  # Diretiva GraphQL para identificar o cliente via JWT
│   │   └── 📂 gql/
│   │       └── contacts.gql     # Definição do schema GraphQL (types, mutations, inputs)
│   ├── 📂 modules/
│   │   └── 📂 contacts/
│   │       ├── 📂 dto/             
│   │       │   ├── contact.output.ts        # DTO para retorno de contatos
│   │       │   └── create-contact.input.ts  # DTO para criação de contatos
│   │       ├── 📂 entities/
│   │       │   ├── 📂 mongo/
│   │       │   │   └── contact.entity.ts     # Schema para MongoDB (Varejão)
│   │       │   └── 📂 mysql/
│   │       │       └── contact.entity.ts     # Schema para MySQL (Macapá)
│   │       ├── 📂 repository/
│   │       │   ├── mongo.repository.ts       # Operações de banco para MongoDB
│   │       │   └── mysql.repository.ts       # Operações de banco para MySQL
│   │       ├── contacts.module.ts            # Módulo NestJS para agrupar funcionalidades de contatos
│   │       ├── contacts.resolver.ts          # Resolver GraphQL para contatos
│   │       ├── contacts.service.ts           # Lógica de negócio para salvar e formatar contatos
│   ├── app.module.ts             # Módulo principal que importa e configura todos os módulos
│   └── main.ts                   # Inicializa a aplicação NestJS
├── .dockerignore                 # Ignora arquivos ao construir imagem Docker
├── .env                           # Variáveis de ambiente da aplicação
├── .env.example                   # Exemplo de arquivo .env para setup
├── .gitignore                     # Ignora arquivos/pastas no controle de versão
├── .prettierrc                    # Configurações de formatação de código (Prettier)
├── docker-compose.yml             # Orquestração dos containers API + MySQL + MongoDB
├── dockerfile                     # Instruções para build da imagem da aplicação
├── drizzle.config.ts              # Configurações do Drizzle ORM
├── eslint.config.mjs              # Configurações do ESLint
├── nest-cli.json                  # Configurações do CLI NestJS
├── package.json                   # Configuração dos scripts e dependências
├── pnpm-lock.yaml                 # Lockfile gerado pelo pnpm
├── README.md                      # Este arquivo :)
└── tsconfig.json                  # Configurações do compilador TypeScript
```
---

## 📋 Funcionalidades

- Recebimento de múltiplos contatos via Mutation GraphQL.
- Identificação automática do cliente através do JWT.
- Inserção de contatos no banco de dados correto (MySQL ou MongoDB).
- Formatação automática dos dados:
  - **Cliente Macapá (MySQL)**: Nome em MAIÚSCULO, telefone formatado.
  - **Cliente Varejão (MongoDB)**: Nome livre, telefone apenas números.
- Separação de camadas:
  - **Resolvers**, **Services**, **Repositories**, **Entities** e **Directives**.
- Ambiente completo via Docker para API + MySQL + MongoDB.
- Migrations de banco gerenciadas via Drizzle ORM.

---

## ✅ Pré-requisitos
- [Docker + Docker Compose](https://docs.docker.com/)


---

## 🚀 Como executar o projeto

### 1. Clone o projeto

```bash
git clone https://github.com/lucasstecher/ContactBridge.git
cd ContactBridge
```

---

### 2. Defina as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```dotenv
# MongoDB
MONGO_HOST=mongodb
MONGO_PORT=27017
MONGO_USER=admin
MONGO_PASSWORD=secret
MONGO_DATABASE=varejao_db

# MySQL
DB_HOST=mysql
DB_PORT=3306
DB_USER=macapa_user
DB_PASSWORD=macapa_pass
DB_DATABASE=macapa_db
DB_ROOT_PASSWORD=secret

# API
JWT_SECRET=1259
API_PORT=3001
```
---

### 3. Suba a aplicação usando Docker
Execute:

```bash
docker-compose up --build -d
```
Esse comando irá:

- Buildar a imagem da API NestJS.

- Instalar as dependências com Pnpm.

- Rodar as migrations do Drizzle automaticamente.

- Subir a API, o banco MySQL e o MongoDB.

>✅ A API estará disponível em http://localhost:3001/graphql

---

### 🔧 Testando a API
Acesse o Apollo Sandbox no navegador:

```bash
http://localhost:3001/graphql
```
>Lembre de enviar o JWT no header Authorization: Bearer ..seu-token..

- *Exemplo de Mutation:*

```graphql
mutation {
  createContacts(contacts: [
    { name: "Lucas", cell_phone: "5541998765432" },
    { name: "Ana", cell_phone: "5541987654321" }
  ]) {
    name
    cell_phone
  }
}
```

### 🧩 Sobre o JWT

O JWT precisa conter o campo client no payload. Para não gerar os JWT na mão, basta usar os que estão abaixo:

- *Macapa*
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiY2xpZW50IjoibWFjYXBhIiwiaWF0IjoxNTE2MjM5MDIyfQ.xSNQUaLTCN_6tslV8BRsC6PBZlLgG5oYpm8HqtfR7_U
```

- *Varejao*
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiY2xpZW50IjoidmFyZWphbyIsImlhdCI6MTUxNjIzOTAyMn0.qzmOHg2nEYwDUUY4NZq2YNw7oRqU8Z91U8DD0Pky8yM
```

Você também pode gerar tokens válidos usando jwt.io, com o secret definido no .env

---

👨‍💻 Desenvolvido com ❤️ por Lucas Stecher.
