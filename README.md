# User Manager - Frontend

Este é o frontend da aplicação **User Manager**, desenvolvida em **ReactJS + TypeScript + Next.js**. O objetivo é criar uma interface de usuário intuitiva e responsiva, com uma abordagem modular e limpa.

## 🌐 Deploy

A aplicação está disponível em produção via **Vercel**:

🔗 [https://user-manager-next.vercel.app](https://user-manager-next.vercel.app)

## 📦 Tecnologias Utilizadas

- React 19 + Next.js 15 (com Turbopack)
- TypeScript
- TailwindCSS
- React Hook Form + Zod
- Axios
- JWT Decode
- OAuth com Google (`@react-oauth/google`)
- FontAwesome

## 🚀 Funcionalidades

- Login com e-mail/senha
- Cadastro de novos usuários
- Cadastro de usuários com Google OAuth
- Listagem de usuários (admins)
- Perfil individual (usuário comum)
- Edição e exclusão de usuários
- Responsivo e com UX amigável

## 🔧 Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/AnGabSS/user-manager-next.git
cd user-manager-next
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Prepare o ambiente:**

```bash
Crie o arquivo .env baseado no exemplo .env.example
```

4. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

> O projeto usa o Turbopack por padrão com Next.js 15.

## 🗂 Estrutura de Telas

- `/` — Tela de login com opção de login social (Google)
- `/signup` — Tela de cadastro de usuários
- `/users` — Tabela de usuários caso usuário seja ADMIN:
- `/edit/:id` — Tela de edição de usuários:

## ✅ Requisitos Atendidos do Desafio

- [x] Interface responsiva e intuitiva
- [x] Integração completa com backend NestJS
- [x] Autenticação com JWT e Google OAuth
- [x] Gerenciamento de usuários com controle de permissões
- [x] Filtros e ordenações para administradores
- [x] Atualização de perfil para usuários comuns

## 📄 Considerações

- Aplicação com estrutura modular e limpa
- Requisições protegidas com tokens JWT
- UI moderna utilizando TailwindCSS

---

Feito com 💙 por [AnGabSS](https://github.com/AnGabSS)
