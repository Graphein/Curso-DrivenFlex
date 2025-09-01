# 📦 Projeto DrivenPass

Aplicação para gerenciamento seguro de credenciais (login/senha), desenvolvida com **Node.js**, **TypeScript**, **Express** e **Prisma**.  
As senhas são criptografadas com AES-256-GCM e armazenadas no banco de dados PostgreSQL.

---

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **bcrypt** (hash de senhas)
- **JWT** (autenticação)
- **AES-256-GCM** (criptografia simétrica)

---

## 📂 Estrutura do projeto
```plaintext
drivenpass/
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  ├─ config/env.ts
│  ├─ middlewares/
│  │  ├─ validateSchema.ts
│  │  ├─ errorHandler.ts
│  │  └─ auth.ts
│  ├─ utils/crypto.ts
│  ├─ routers/
│  │  ├─ index.ts
│  │  ├─ auth.router.ts
│  │  └─ credentials.router.ts
│  ├─ controllers/
│  │  ├─ auth.controller.ts
│  │  └─ credentials.controller.ts
│  ├─ services/
│  │  ├─ auth.service.ts
│  │  └─ credentials.service.ts
│  ├─ repositories/
│  │  ├─ user.repository.ts
│  │  └─ credentials.repository.ts
│  └─ schemas/
│     ├─ auth.schemas.ts
│     └─ credentials.schemas.ts
├─ .env
├─ package.json
├─ tsconfig.json
└─ README.md
```

## 📌 Endpoints principais

### 🩺 Saúde
- **GET** `/health` → `"I'm OK!"`

### 🔑 Autenticação
- **POST** `/sign-up` → Cadastro de usuário  
- **POST** `/sign-in` → Login e geração de token JWT  

### 🔐 Credenciais
- **POST** `/credentials` → Criar nova credencial  
- **GET** `/credentials` → Listar todas as credenciais  
- **GET** `/credentials/:id` → Buscar credencial por ID  
- **PUT** `/credentials/:id` → Atualizar credencial  
- **DELETE** `/credentials/:id` → Excluir credencial  
- **DELETE** `/credentials` → Excluir todas as credenciais do usuário  

