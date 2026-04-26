# ⚡ Quickstart — LGC Articulate DevLang

Get the system running locally in minutes.

---

## 🧭 Overview

LGC Articulate is a full-stack communication coaching system built on:

* React + Vite (frontend)
* Express + MongoDB (backend)
* AI orchestration layer for evaluation and coaching

---

## 📦 Prerequisites

Ensure the following are installed:

* **Node.js** ≥ 18
* **npm** ≥ 9
* **MongoDB** (local or cloud instance)

---

## 🚀 1) Install Dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd ../client
npm install
```

---

## ⚙️ 2) Configure Environment

```bash
cd server
copy .env.example .env
```

Edit `server/.env`:

### 🔑 Minimum Required

```env
PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
CORS_ORIGIN=http://localhost:5173
```

---

### 🤖 Optional (Recommended for Full Features)

To enable AI evaluation and email flows:

* Configure model keys used in:

  * `server/config/attemptStack.js`
* Configure email service:

  * `BREVO_API_KEY`
  * `EMAIL_FROM`

---

## ▶️ 3) Start Backend

```bash
cd server
npm run dev
```

### Health Check

```bash
curl http://localhost:3000/health
```

---

## 🌐 4) Start Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

Access the app:

👉 http://localhost:5173

---

## 🧪 5) Smoke Test API

Test evaluation pipeline:

```bash
curl -X POST http://localhost:3000/api/evaluate/test \
  -H "Content-Type: application/json" \
  -d '{
    "userResponse": "I will send the report by Friday and confirm final review with the team."
  }'
```

---

## 🛠️ Useful Commands

### Backend

```bash
cd server
npm test
npm run test:watch
npm run lint
```

---

### Frontend

```bash
cd client
npm run lint
npm run build
npm run preview
```

---

## ⚠️ Troubleshooting

### 🔒 401 Unauthorized

* `/api/evaluate` is protected
* Login and include Bearer token

---

### 🌐 CORS Issues

* Ensure `CORS_ORIGIN` matches frontend URL

---

### 🗄️ MongoDB Errors

* Verify `MONGO_URI`
* Ensure database is running

---

### 🤖 Weak / Empty AI Output

* Check model keys
* Verify provider configuration

---

## 🧠 Developer Note

This system is designed to enforce:

* Context before response
* Structured articulation
* Controlled AI output

If something feels “off,” check:

* input structure
* prompt configuration
* response parsing

---

## 📚 Continue Reading

1. `README.md` — project overview
2. `ARCHITECTURE.md` — system design
3. `SYSTEM_MAP.md` — feature → file mapping
4. `EXAMPLES.md` — API examples

---

## 💡 Tip

Run backend first, then frontend.
Most issues during setup come from missing environment variables.

---
