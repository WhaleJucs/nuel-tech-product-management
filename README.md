# Sistema de Gerenciamento de Produtos

Aplicação full-stack para gerenciamento de produtos com autenticação JWT, desenvolvida como desafio técnico para a vaga de **Desenvolvedor Júnior** na **Nuel Tech**.

---

## Visão Geral

Este projeto implementa uma plataforma completa de cadastro e gerenciamento de produtos com:

- **CRUD completo** de produtos (Create, Read, Update, Delete)
- **Sistema de autenticação JWT** com roles (admin/usuário comum)
- **Controle de acesso baseado em papéis** (apenas admins podem modificar produtos)
- **Interface responsiva e moderna** com Tailwind CSS
- **Backend validado** com express-validator
- **Banco de dados relacional** com MySQL e Prisma ORM
- **Feedback visual** com notificações toast
- **Componentes reutilizáveis** e bem estruturados

---

## Requisitos do Desafio Atendidos

### Backend (Node.js)

- [x] Projeto Node.js configurado com npm
- [x] Express, Prisma, MySQL2 instalados
- [x] Prisma inicializado e configurado
- [x] Schema.prisma com modelo Product completo
- [x] Migrações criadas e executadas
- [x] Rotas CRUD implementadas:
  - `GET /products` - listar todos
  - `GET /products/:id` - obter específico
  - `POST /products` - criar
  - `PUT /products/:id` - atualizar
  - `DELETE /products/:id` - deletar

### Frontend (React)

- [x] Create React App configurado
- [x] Componentes para CRUD (listar, criar, editar, deletar)
- [x] Hooks useState e useEffect utilizados
- [x] Axios para requisições HTTP
- [x] Validação de formulários implementada

### Extra

- [x] **Autenticação JWT** com tokens de 24 horas
- [x] **Sistema de roles** (admin/usuário comum)
- [x] **Context API** para gerenciamento de estado
- [x] **Protected Routes** com redirecionamento
- [x] **Interceptors Axios** para gerenciamento automático de tokens
- [x] **Design moderno** com Tailwind CSS

---

## Tecnologias Utilizadas

### Backend

| Tecnologia            | Versão | Propósito                    |
| --------------------- | ------ | ---------------------------- |
| **Node.js**           | v18+   | JavaScript                   |
| **Express**           | 5.2.1  | Framework web                |
| **Prisma**            | 6.19.2 | ORM para banco de dados      |
| **MySQL**             | 8.0+   | Banco de dados relacional    |
| **JWT**               | 9.0.3  | Autenticação                 |
| **bcryptjs**          | 2.4.3  | Hash de senhas               |
| **express-validator** | 7.3.1  | Validação de dados           |
| **CORS**              | 2.8.6  | Compartilhamento de recursos |

### Frontend

| Tecnologia         | Versão | Propósito       |
| ------------------ | ------ | --------------- |
| **React**          | 19.2.4 | Biblioteca UI   |
| **React Router**   | 7.13.0 | Roteamento      |
| **Axios**          | 1.13.4 | Cliente HTTP    |
| **Tailwind CSS**   | 3.4.19 | Estilo e design |
| **react-toastify** | 11.0.5 | Notificações    |

---

## Testar Projeto

### Pré-requisitos

- Node.js v18 ou superior
- npm ou yarn
- MySQL 8.0 ou superior

### Configuração do Backend

```bash
# Entrar na pasta backend
cd backend

# Copiar arquivo de ambiente
cp .env.example .env

# Instalar dependências
npm install

# Configurar banco de dados no .env
# DATABASE_URL="mysql://usuario:senha@localhost:3306/nuel_tech_db"
# PORT=3001
# JWT_SECRET="secret"

# Criar banco de dados (se não existir)
# CREATE DATABASE nuel_tech_db;

# Executar migrações
npx prisma migrate dev

# Criar usuário admin (credenciais padrão)
node createAdmin.js

# Iniciar servidor
npm start
# Servidor rodando em http://localhost:3001
```

### Configuração do Frontend

```bash
# Entrar na pasta frontend
cd frontend

# Copiar arquivo de ambiente
cp .env.example .env

# Instalar dependências
npm install

# Iniciar aplicação
npm start
# Aplicação rodando em http://localhost:3000
```

---

## Autenticação e Autorização

### Fluxo de Autenticação

1. **Registro/Login** Token JWT gerado (validade: 24 horas)
2. **Token armazenado** no localStorage do navegador
3. **Interceptor Axios** adiciona token automaticamente em requisições
4. **Middlewares JWT** validam token no backend
5. **Roles verificadas** para operações protegidas

### Tipos de Usuário

| Tipo                | Permissões                                          |
| ------------------- | --------------------------------------------------- |
| **Usuário Comum**   | ✓ Visualizar produtos                               |
| **Admin**           | ✓ Visualizar, ✓ Criar, ✓ Editar, ✓ Deletar produtos |
| **Não autenticado** | ✓ Visualizar produtos                               |

### Credenciais Padrão (Admin)

```
Email:    admin@nueltech.com
Senha:    admin123
```

---
