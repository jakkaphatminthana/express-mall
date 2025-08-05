# Express Mall 

> A practice project using **Express.js** with **TypeScript** and **Sequelize ORM**, focused on experimenting with **migrations**, **seeders**, and a **Docker Compose** setup using **PostgreSQL**.

## 🛠️ Tech Stack
- [Express.js](https://expressjs.com/) – Minimal web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) – Typed superset of JavaScript
- [Sequelize](https://sequelize.org/) – Promise-based Node.js ORM for Postgres, MySQL, etc.
- [PostgreSQL](https://www.postgresql.org/) – Open source relational database
- [Docker Compose](https://docs.docker.com/compose/) – Tool for defining and running multi-container Docker apps

## 🚀 Usage

### 1. Installation
```bash
pnpm install
```

### 2. Setup Environment
This project uses environment variables.
Make a copy of the `.env.example` file and rename it to `.env`

### 3. Run with Docker Compose
```bash
docker compose up
```

### 4. Run Migrations
```bash
pnpm db-migrate
```

### 5. Run Seeders
```bash
pnpm db-seed
```

### 6. Run Express
```bash
pnpm dev
```
