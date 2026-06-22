# Pokédex API

API REST para gerenciar Pokémons com MongoDB, Docker e Frontend React.

## Começar Rápido

### Pré-requisitos
- Docker Desktop instalado

### Rodar Localmente

```bash
git clone https://github.com/seu-usuario/pokedex-api.git
cd pokedex-api

cp .env.example .env

docker compose up --build
```

API: `http://localhost:3000`

### Frontend

```bash
cd pokedex-frontend
npm install
npm start
```

Frontend: `http://localhost:3001`

**Login:** usuario: `Admin` | senha: `123456`

---

## Endpoints Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/pokemons` | Listar todos |
| POST | `/api/pokemons` | Importar da PokéAPI |
| PATCH | `/api/pokemons/:id/favoritar` | Marcar favorito |
| DELETE | `/api/pokemons/:id` | Deletar |
| POST | `/api/auth/login` | Fazer login |

---

## Testar com Postman

1. Abra Postman
2. Import → `postman_collection.json`
3. Todos os endpoints prontos para testar

## Configurando o Bearer Token no Postman

Após realizar o login, copie o valor retornado no campo `token`.

### Passo 1 - Abrir a Requisição

Selecione qualquer endpoint protegido da API no Postman.

### Passo 2 - Configurar a Autenticação

1. Clique na aba **Authorization**.
2. Em **Type**, selecione **Bearer Token**.
3. Cole o token obtido no login no campo **Token**.

### Exemplo

```text
Bearer eyJhbGciOiJIUzI1NiIs...
---
```
## Aplicações e Documentação

* **API REST:** http://localhost:3000
* **Health Check:** http://localhost:3000/health
* **Documentação Swagger:** http://localhost:3000/api-docs
* **Frontend:** http://localhost:4000 *(após executar `npm start`)*


## Parar Docker

```bash
docker compose down
```

---

## Stack

- Node.js + Express
- MongoDB + Mongoose
- React
- Docker
- JWT Auth
- PokéAPI

---

## Licença
Projeto desenvolvido para fins educacionais
