# 🔄 Real-Time Chat App (Monorepo)

A real-time chat application built with WebSockets and Redis using a monorepo structure. This app allows multiple users to join, chat live, and receive updates across instances using Redis pub/sub.

---

## 🧱 Project Structure

```
my-monorepo/
├── apps/
│   ├── web/           # Frontend (React/Next.js or similar)
│   └── server/        # Backend (Node.js WebSocket server)
├── packages/          # Shared packages (config, UI, types, etc.)
├── package.json       # Monorepo root config
└── .gitignore
```

---

## 🚀 Features

- 📡 WebSocket-based real-time communication
- 🧠 Redis Pub/Sub for horizontal scalability
- 🔐 Environment variables protected via `.gitignore`
- ⚙️ Monorepo with shared config and linting
- 🧪 Ready for local dev and production deployment

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in `apps/server/`:

```bash
cp apps/server/.env.example apps/server/.env
```

Then edit `.env`:

```env
REDIS_HOST=your-redis-host
REDIS_PORT=your-redis-port
REDIS_USERNAME=default
REDIS_PASSWORD=your-password
```

> ✅ This file is ignored from Git tracking for security.

---

### 4. Run the App Locally

#### 🖥 Backend WebSocket Server

```bash
cd apps/server
npm run dev # or ts-node index.ts
```

#### 🌐 Frontend (React or Next.js)

```bash
cd apps/web
npm run dev
```

The frontend should connect to `ws://localhost:8000`.

---

## 🛠 Tech Stack

- **Backend:** Node.js, WebSocket (`ws`), Redis (`ioredis`)
- **Frontend:** React / Next.js (customizable)
- **Infrastructure:** Monorepo structure, TurboRepo (optional)
- **Deployment:** Ready for Vercel, Render, Railway, or custom VPS

---

## ✅ Roadmap Ideas

- 💬 Chat history storage (Redis Lists or DB)
- 🧍 User authentication and avatars
- ✍️ Typing indicators
- 🚫 Rate limiting with Redis
- 🌍 Public room support

---

## 🛡 Security Notes

- Secrets are stored in `.env` and excluded via `.gitignore`
- For production, use GitHub Actions or your cloud provider’s **Environment Variables UI**

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🙌 Credits

Created by [Virenishere](https://github.com/your-username)
