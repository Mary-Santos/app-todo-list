📝 #To-do List App

Este é um projeto fullstack de uma aplicação **To-do List**, utilizando:

- 📱 #Frontend: React Native com Expo
- 🔧 #Backend: NestJS
- 🛢 #Banco de dados**: PostgreSQL com Prisma ORM

---

⚙️ #Tecnologias

- React Native (Expo)
- NestJS (TypeScript)
- Prisma ORM
- PostgreSQL

---

🧩 #Estrutura do Projeto

```
app-to-do-list/
├── backend/        # API NestJS + Prisma
└── frontend/       # App mobile React Native (Expo)
```

---

🚀 #Como rodar o projeto

#1. Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL
- Yarn ou npm
- Expo CLI (para o app mobile):  
  ```bash
  npm install -g expo-cli
  ```

---

📦 #Backend (NestJS + Prisma)

🔧 #Instalação

```bash
cd backend
npm install
```

⚙️ #Configure o banco

Crie um arquivo `.env` com a variável `DATABASE_URL`, por exemplo:

```env
DATABASE_URL="postgresql://postgres:senha@localhost:5432/app"
```

🛠 #Migre o banco de dados

```bash
npx prisma migrate dev
```

▶️ #Start

Modo desenvolvimento (hot reload):

```bash
npm run start:dev
```

---

📱 #Frontend (React Native)

🔧 #Instalação

```bash
cd frontend
npm install
```

⚙️ #Configure a URL da API

Crie um arquivo `.env`:

```env
API_URL=http://localhost:3000
```

> Use o IP local da máquina se for testar no celular físico (ex: `http://192.168.X.X:3000`)

▶️ #Start

```bash
npm run start
```

ou

```bash
expo start
```

---

✅ #Funcionalidades

- Criar, listar, editar e remover tarefas
- Integração completa com API via HTTP
- Armazenamento em banco de dados PostgreSQL via Prisma

