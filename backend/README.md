# Backend - Sistema de Gerenciamento de Produtos

API REST desenvolvida com Node.js, Express, Prisma e MySQL com autenticação JWT.

---

## Tecnologias

- **Node.js** - JavaScript
- **Express** - Framework web
- **Prisma** - ORM para MySQL
- **MySQL** - Banco de dados
- **JWT** - Autenticação com tokens
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados

---

## Instalação

```bash
# Intalação das dependências
npm install

# Configuração do banco de dados no .env
DATABASE_URL="mysql://root:@localhost:3306/nuel_tech_db"
PORT=3001
JWT_SECRET="secret"

# Execução do servidor migrations
npx prisma migrate dev

# Criação do usuário administrador
node createAdmin.js

# Iniciar servidor
npm start
```

---

## Autenticação

### Sistema de Permissões

A API possui dois níveis de usuário:

- **Usuário Comum** (`isAdmin: false`) - Pode apenas visualizar produtos
- **Administrador** (`isAdmin: true`) - Acesso total (criar, editar, deletar produtos)

### Endpoints de Autenticação

#### 1. Registrar Novo Usuário

```http
POST /auth/register
Content-Type: application/json

{
  "name": "João",
  "email": "joao@example.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

**Resposta (201):**

```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "João",
    "email": "joao@example.com",
    "isAdmin": false
  },
  "message": "Usuário registrado com sucesso!"
}
```

#### 2. Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@nueltech.com",
  "password": "admin123"
}
```

**Resposta (200):**

```json
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "name": "Administrador",
    "email": "admin@nueltech.com",
    "isAdmin": true
  },
  "message": "Login realizado com sucesso!"
}
```

---

## Endpoints de Produtos

### Rotas Públicas (sem autenticação)

#### Listar Todos os Produtos

```http
GET /products
```

#### Obter Produto por ID

```http
GET /products/:id
```

### Rotas Protegidas (requerem token de administrador)

#### Criar Produto

```http
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Notebook Dell",
  "description": "Notebook de alta performance",
  "price": 3500.00,
  "category": "Eletrônicos",
  "stock": 10
}
```

#### Atualizar Produto

```http
PUT /products/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Notebook Dell Atualizado",
  "price": 3200.00,
  "stock": 15
}
```

#### Deletar Produto

```http
DELETE /products/:id
Authorization: Bearer {token}
```

---

## Testes Realizados

### Teste 1: Registro de Usuário

**Objetivo:** Verificar se o endpoint de registro funciona corretamente

**Comando PowerShell:**

```powershell
$body = @{name='Admin User'; email='admin@test.com'; password='123456'; confirmPassword='123456'} | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/auth/register' -Method Post -Body $body -ContentType 'application/json'
```

**Resultado:** Sucesso

- Status: 201
- Token JWT gerado
- Usuário criado com `isAdmin: false`

---

### Teste 2: Login de Administrador

**Objetivo:** Verificar autenticação e obtenção de token

**Comando PowerShell:**

```powershell
$body = @{email='admin@nueltech.com'; password='admin123'} | ConvertTo-Json
$response = Invoke-RestMethod -Uri 'http://localhost:3001/auth/login' -Method Post -Body $body -ContentType 'application/json'
$response | ConvertTo-Json
```

**Resultado:** Sucesso

- Status: 200
- Token JWT válido retornado
- User com `isAdmin: true` confirmado

---

### Teste 3: Listar Produtos (Sem Autenticação)

**Objetivo:** Verificar que rotas públicas funcionam sem token

**Comando PowerShell:**

```powershell
$products = Invoke-RestMethod -Uri 'http://localhost:3001/products' -Method Get
Write-Host "Total de produtos:" $products.Count
```

**Resultado:** Sucesso

- Status: 200
- 8 produtos retornados
- Rota pública funcionando corretamente

---

### Teste 4: Criar Produto SEM Token

**Objetivo:** Verificar que a proteção de rota está funcionando

**Comando PowerShell:**

```powershell
$product = @{name='Teste'; price=10.50; category='Teste'; stock=5} | ConvertTo-Json
try {
  Invoke-RestMethod -Uri 'http://localhost:3001/products' -Method Post -Body $product -ContentType 'application/json'
}
catch {
  Write-Host "Status:" $_.Exception.Response.StatusCode.value__
}
```

**Resultado:** Sucesso (bloqueio funcionando)

- Status: 401 Unauthorized
- Mensagem: "Token não fornecido"
- Proteção funcionando corretamente

---

### Teste 5: Criar Produto COM Token de Admin

**Objetivo:** Verificar que administradores conseguem criar produtos

**Comando PowerShell:**

```powershell
$token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
$product = @{
  name='Notebook Dell'
  description='Notebook para testes'
  price=2500.00
  category='Eletrônicos'
  stock=10
} | ConvertTo-Json
$headers = @{Authorization="Bearer $token"}
Invoke-RestMethod -Uri 'http://localhost:3001/products' -Method Post -Body $product -ContentType 'application/json' -Headers $headers
```

**Resultado:** Sucesso

- Status: 201
- Produto criado com ID: 22
- Validação de token funcionando
- Middleware de admin funcionando

---

## Script createAdmin.js

O arquivo `createAdmin.js` é um **utilitário essencial** para criação de usuários administradores no sistema.

### Problema que resolve:

1. **Primeiro Admin:** Na primeira instalação, o sistema não tem nenhum administrador
2. **Segurança:** Usuários registrados pela rota `/auth/register` são criados com `isAdmin: false` por padrão
3. **Necessidade:** Para gerenciar produtos, é necessário ter pelo menos um usuário admin

### Como funciona:

```javascript
// Cria um usuário com permissão de administrador
const admin = await prisma.user.create({
  data: {
    name: "Administrador",
    email: "admin@nueltech.com",
    password: hashedPassword,
    isAdmin: true,
  },
});
```

### Uso:

```bash
node createAdmin.js
```

**Credenciais criadas:**

- Email: `admin@nueltech.com`
- Senha: `admin123`
- Tipo: Administrador

---

## Estrutura do Banco de Dados

### Tabela: users

| Campo     | Tipo     | Descrição                          |
| --------- | -------- | ---------------------------------- |
| id        | Int      | Chave primária (auto increment)    |
| name      | String   | Nome do usuário                    |
| email     | String   | Email único                        |
| password  | String   | Senha hasheada                     |
| isAdmin   | Boolean  | Nível de permissão (padrão: false) |
| createdAt | DateTime | Data de criação                    |

### Tabela: products

| Campo       | Tipo    | Descrição                       |
| ----------- | ------- | ------------------------------- |
| id          | Int     | Chave primária (auto increment) |
| name        | String  | Nome do produto                 |
| description | String? | Descrição (opcional)            |
| price       | Float   | Preço                           |
| category    | String  | Categoria                       |
| stock       | Int     | Quantidade em estoque           |

---

## Comandos

```bash
# Ver estrutura do banco
npx prisma studio

# Resetar banco de dados
npx prisma migrate reset

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Gerar Prisma Client
npx prisma generate

# Ver logs do Prisma
npx prisma db push --help
```
