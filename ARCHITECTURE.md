# 🏗️ Architecture — LGC Articulate DevLang

This document describes the current system architecture as implemented today.
It is intended to give engineers a **clear mental model of structure, flow, and responsibility boundaries**.

---

## 🧭 1) System Overview

LGC Articulate is a **full-stack communication coaching system** built around structured articulation.

It consists of:

* **Frontend (`client/`)** → React-based UI for interaction
* **Backend (`server/`)** → API, business logic, AI orchestration, persistence

---

## 🧠 Core Processing Model

The entire system follows a consistent pipeline:

```
User Input → Structured Processing → AI Evaluation → Guided Feedback
```

Each mode applies this pattern differently:

* **Learn** → Predefined structured flow
* **Evaluate** → AI scoring + persistence
* **Doubt** → AI coaching + refinement

---

## 🔄 2) Backend Request Lifecycle

Every backend request follows a strict layered flow:

```
route → middleware → controller → service → model/utils → response
```

### Responsibility Breakdown

| Layer         | Responsibility                                |
| ------------- | --------------------------------------------- |
| Route         | Endpoint definition + middleware wiring       |
| Middleware    | Validation, auth, sanitization, rate limiting |
| Controller    | HTTP request/response handling                |
| Service       | Business logic + orchestration                |
| Model / Utils | Data persistence + helper logic               |

---

## 🖥️ 3) Frontend Architecture (`client/`)

### Entry & Composition

* `src/main.jsx` → React bootstrap
* `src/app/App.jsx` → Global shell (navbar, overlays, layout)
* `src/app/Routes.jsx` → Route mapping

---

### Feature-Based Structure

Frontend is organized using **feature-first slices**:

* `features/learn/` → Guided articulation learning
* `features/evaluate/` → AI scoring + result rendering
* `features/doubt/` → Coaching flow
* `features/auth/` → Authentication lifecycle
* `features/home/` → Informational pages

---

### Shared Layer

* `shared/components/` → Reusable UI primitives
* `shared/utils/highlight.js` → Text highlighting logic
* `services/api.js` → API abstraction layer
* `utils/auth.js` → Token management
* `utils/usageTracker.js` → Usage tracking

---

### State Management Strategy

* Local state (`useState`) at component/page level
* Custom hooks for feature orchestration:

  * `useEvaluateFlow`
  * `useDoubtFlow`
* LocalStorage used for:

  * auth token
  * draft persistence
  * usage tracking

---

## 🧠 4) Backend Architecture (`server/`)

### Application Bootstrap

`server.js` is responsible for:

* Loading environment variables
* Validating configuration
* Applying middleware
* Mounting routes
* Connecting to database
* Starting server

---

### Route Layer

* `routes/authRoutes.js`
* `routes/evaluationRoutes.js`
* `routes/doubtRoutes.js`

Handles **endpoint mapping only**.

---

### Middleware Layer

* `authMiddleware.js` → JWT verification
* `validationMiddleware.js` → Input validation & sanitization
* `errorHandler.js` → Standardized error responses
* `rateLimiter.js` → Request limiting

---

### Controller Layer

* `authController.js`
* `evaluateController.js`
* `doubtController.js`

Handles:

* request parsing
* response formatting
* delegation to services

---

### Service Layer

* `evaluationService.js` → evaluation workflow + persistence
* `aiRefinementService.js` → AI orchestration (core engine)
* `emailService.js` → email flows

---

### Data Layer

* `User.js` → user model + password hashing
* `attemptModel.js` → evaluation attempts + AI output

---

### Configuration & Utilities

* `config/index.js` → runtime configuration

* `config/database.js` → MongoDB lifecycle

* `config/attemptStack.js` → AI model fallback strategy

* `config/modelPrompts.js`, `aiPrompt.js` → prompt definitions

* `utils/aiGuard.js` → output validation

* `utils/contextFormatter.js` → prompt formatting

* `utils/defensiveValidator.js` → strict validation

---

## 🔗 5) End-to-End Data Flows

---

### Evaluate Flow

1. Frontend builds payload from scenario + user response
2. `POST /api/evaluate` with JWT
3. Middleware validates and authenticates
4. Controller delegates to service
5. Service calls AI refinement (`mode: evaluation`)
6. AI output validated via `aiGuard`
7. Attempt stored in MongoDB
8. Response returned to frontend
9. UI parses and renders structured feedback

---

### Doubt Flow

1. User submits context + response + level
2. `POST /api/doubt`
3. Validation middleware runs
4. Controller calls AI refinement (`mode: doubt`)
5. Response returned and rendered

---

### Authentication Flow

1. Signup → user created + verification token
2. Verify → account activated
3. Login → JWT issued
4. Forgot/Reset → email-based token flow
5. Protected routes require Bearer token

---

## 🧩 6) Architectural Principles

The system enforces:

* **Separation of concerns** across layers
* **Feature-based frontend organization**
* **Centralized AI orchestration**
* **Controlled AI output via guards**
* **Reusable shared components and utilities**

---

## ⚠️ 7) Known Architecture Gaps

* API response shape inconsistency (frontend compensating for drift)
* Mixed user/session storage patterns in evaluation persistence
* Hardcoded API base URL in frontend
* AI parsing relies on structured text patterns (fragility risk)

---

## 🛠️ 8) Debugging Guide

* **UI issue** → check feature components
* **API issue** → route → controller → service
* **AI issue** →

  * `aiRefinementService.js`
  * `modelPrompts.js`
  * `aiGuard.js`
* **Data issue** → models + MongoDB

---

## 📚 9) Related Docs

* `README.md` → high-level overview
* `QUICKSTART.md` → setup guide
* `SYSTEM_MAP.md` → feature-to-file mapping
* `EXAMPLES.md` → API usage examples

---
