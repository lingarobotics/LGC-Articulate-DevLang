# 🔗 API Examples — LGC Articulate DevLang

This document provides practical examples for interacting with the backend API.

**Base URL:**

```bash
http://localhost:3000/api
```

---

## 🧭 Overview

* Authentication uses **JWT (Bearer Token)**
* Some routes are **public**, others require authentication
* AI responses are structured but may include raw text for flexibility

---

## 🧑‍💻 1) Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex",
    "email": "alex@example.com",
    "password": "StrongPass123"
  }'
```

### Response

```json
{
  "message": "Signup successful. Please verify your email."
}
```

---

## 🔐 2) Login (Get Token)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex@example.com",
    "password": "StrongPass123"
  }'
```

### Response

```json
{
  "message": "Login successful",
  "token": "<jwt>",
  "user": {
    "id": "...",
    "name": "Alex",
    "email": "alex@example.com"
  }
}
```

### Usage

```bash
Authorization: Bearer <jwt>
```

---

## 🧠 3) Evaluate (Protected)

```bash
curl -X POST http://localhost:3000/api/evaluate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt>" \
  -d '{
    "context": "Manager: \"Can you send the rollout plan by Friday?\"",
    "speakerRole": "Engineer",
    "listenerRole": "Manager",
    "listenerQuestion": "Can you send the rollout plan by Friday?",
    "userResponse": "I will send the rollout plan by Friday 4 PM and confirm risk checks before sharing."
  }'
```

### Response

```json
{
  "success": true,
  "attemptId": "...",
  "evaluation": {
    "final": "Score: 78/100\n...",
    "raw": "...",
    "source": "openrouter-attempt-1"
  }
}
```

---

## 🧪 4) Evaluate Test (Public)

```bash
curl -X POST http://localhost:3000/api/evaluate/test \
  -H "Content-Type: application/json" \
  -d '{
    "context": "Team lead asks for status update",
    "speakerRole": "Developer",
    "listenerRole": "Team Lead",
    "listenerQuestion": "Where do we stand?",
    "userResponse": "I completed the core changes and will finish tests by 3 PM."
  }'
```

📌 Use this for quick testing without authentication.

---

## 💬 5) Doubt Mode (Public)

```bash
curl -X POST http://localhost:3000/api/doubt \
  -H "Content-Type: application/json" \
  -d '{
    "context": "Client asks why timeline shifted",
    "speakerRole": "Project Manager",
    "listenerRole": "Client",
    "listenerQuestion": "Why did the date move?",
    "userResponse": "We had some issues and it got delayed.",
    "level": "average"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "final": "...",
    "raw": "...",
    "source": "..."
  }
}
```

---

## 📊 6) Fetch Evaluation History (Protected)

```bash
curl -X GET "http://localhost:3000/api/evaluate/user/history?page=1&limit=10" \
  -H "Authorization: Bearer <jwt>"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "userResponse": "...",
      "listenerQuestion": "...",
      "aiFeedback": {
        "final": "Score: ...",
        "raw": "...",
        "source": "..."
      },
      "createdAt": "..."
    }
  ]
}
```

---

## 📄 7) Fetch Single Attempt (Protected)

```bash
curl -X GET http://localhost:3000/api/evaluate/<attemptId> \
  -H "Authorization: Bearer <jwt>"
```

---

## ⚠️ 8) Error Cases

### Validation Error

```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": ["userResponse must be at least 10 characters long"]
  }
}
```

---

### Unauthorized Error

```json
{
  "error": "Authorization token missing"
}
```

---

### Rate Limit Error

```json
{
  "success": false,
  "error": {
    "message": "Too many requests. Please try again later."
  }
}
```

---

## 🧪 9) End-to-End Frontend Test

1. Start backend (`npm run dev`)
2. Start frontend (`npm run dev`)
3. Open:

   ```
   http://localhost:5173
   ```

Then test:

* Register / Login
* Learn Mode
* Evaluate Mode
* Doubt Mode
* History

---

## 🧠 Notes for Developers

* AI responses include both **structured fields** and **raw text**
* Parsing logic in frontend depends on response consistency
* API contract refinement is an ongoing improvement area

---

## 📚 Related Docs

* `README.md` → overview
* `QUICKSTART.md` → setup
* `ARCHITECTURE.md` → system design
* `SYSTEM_MAP.md` → feature mapping

---
