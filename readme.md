# test-sps-server

Backend API (Node + Express) used for the SPS-Group test project.

This README explains how to install and run the server locally, and provides a brief API reference.

## Requisitos

- Node.js >= 16
- npm (ou yarn)

## Instalação

1. Clone o repositório (se ainda não):

   git clone <repo-url>

2. Entre na pasta do servidor e instale dependências:

```bash
cd test-sps-server
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz (`test-sps-server/.env`) com as seguintes variáveis mínimas:

```
PORT=4000
REACT_APP_SERVER_URL=http://localhost:4000
JWT_SECRET=uma_chave_secreta
JWT_EXPIRES_IN=1h
```

Obs.: `REACT_APP_SERVER_URL` é usado pelo frontend, mas não é necessário para o servidor rodar — o backend só precisa de `PORT`, `JWT_SECRET` e `JWT_EXPIRES_IN`.

## Scripts úteis

- `npm run dev` — inicia o servidor em modo desenvolvimento (usa nodemon; observa alterações).
- `npm test` — executa testes (jest).

Exemplo:

```bash
npm run dev
# ou
PORT=4000 npm run dev
```

## Endpoints principais

Base URL: `http://localhost:<PORT>` (padrão 4000 se definido assim no .env)

- POST /auth/login
  - Descrição: autentica usuário e retorna um token JWT.
  - Body: `{ "email": string, "password": string }`
  - Response (200): `{ token: "<jwt>" }` ou 401 em credenciais inválidas.

- GET /auth/user
  - Descrição: retorna os dados do usuário autenticado (precisa do header `Authorization: Bearer <token>`).

- GET /users
  - Descrição: lista usuários (rota protegida).
  - Query params suportados: `page`, `perPage`.
  - Response: `{ data: [...], pagination: { page, perPage, total, totalPages } }`

- GET /users/:id
  - Descrição: retorna o usuário especificado.
  - Response: `{ data: { id, name, email, createdAt, updatedAt } }` ou 404 se não encontrado.

- POST /users
  - Descrição: cria um novo usuário.
  - Body: `{ name, email, password, type }`.
  - Response: `{ data: user }`; retorna erro se email já existir.

- PUT /users/:id
  - Descrição: atualiza usuário.
  - Body: campos a atualizar (ex.: `{ name, email, password }`).

- DELETE /users/:id
  - Descrição: remove usuário.

Todas as rotas em `/users` estão protegidas pelo middleware de autenticação e requerem o header:

```
Authorization: Bearer <token>
```

## Admin preexistente

O projeto inclui um usuário admin em memória para facilitar os testes. Use as credenciais abaixo para login durante o desenvolvimento:

```
email: admin@spsgroup.com.br
password: 1234
```

## Observações

- O repositório de usuários é em memória (arquivo `src/infra/repositories/user.repository.memory.js`), então os dados não persistem entre reinícios.
- O projeto já inclui testes unitários feitos com Jest e Supertest - use `npm test`.
