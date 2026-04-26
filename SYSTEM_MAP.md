# SYSTEM_MAP

This document is a practical map of the current codebase for new engineers.
It links **Feature → Flow → Files → Responsibility**.

---

## 1) System Purpose

LGC Articulate is a communication coaching platform with three user modes:

* Learn mode: guided scenario learning
* Evaluate mode: AI scoring of user responses
* Doubt mode: AI coaching for unclear responses

The stack is split into:

* Frontend: React + Vite (`client/`)
* Backend: Express + MongoDB + AI orchestration (`server/`)

---

## 🧠 Mental Model

The system follows a consistent processing pattern:

**User Input → Structured Processing → AI Evaluation → Guided Feedback**

Each mode applies this differently:

* **Learn** → Pre-defined structured learning flow
* **Evaluate** → AI scoring + persistence
* **Doubt** → AI coaching + refinement

Understanding this flow helps navigate both frontend and backend quickly.

---

## 🔄 End-to-End Request Flow

1. User interacts with frontend (React UI)
2. Frontend builds structured payload
3. API request sent via `client/src/services/api.js`
4. Express middleware validates and sanitizes input
5. Controller routes request to service layer
6. Service orchestrates AI evaluation/coaching
7. AI output is validated (`aiGuard`)
8. Result is stored in MongoDB (if applicable)
9. Response returned to frontend
10. UI parses and renders structured feedback

---

## 2) Runtime Topology

* Browser app runs at `http://localhost:5173`
* API runs at `http://localhost:3000`
* Frontend calls backend through `client/src/services/api.js`
* Backend persists attempts and users in MongoDB

---

## 3) Feature Maps

---

### A. Learn Mode

**Purpose:**

* Teach articulation patterns using curated scenarios.

**User Flow:**

1. Open `/learn`
2. Pick a scenario card
3. View intro and roles
4. Step through conversation
5. Reveal articulation insights

**System Flow:**

* `LearnPage` loads scenario data and selection state.
* `ScenarioPlayer` controls step progression.
* `DialoguePlayer` plays lines incrementally.
* `ArticulationReveal` shows original vs improved wording.

**Key Files:**

* `client/src/features/learn/LearnPage.jsx`
* `client/src/features/learn/data/learnScenarios.js`
* `client/src/features/learn/components/ScenarioList.jsx`
* `client/src/features/learn/components/ScenarioPlayer.jsx`
* `client/src/features/learn/components/DialoguePlayer.jsx`
* `client/src/features/learn/components/ArticulationReveal.jsx`

---

### B. Evaluate Mode

**Purpose:**

* Score communication quality and store attempts for later review.

**User Flow:**

1. Open `/evaluate`
2. Select a scenario
3. Enter response
4. Submit for evaluation
5. View score, breakdown, and feedback
6. Optional: open `/history`

**System Flow:**

* Frontend builds payload from scenario + user input.
* `POST /api/evaluate` is called with Bearer token.
* Backend validates input and auth.
* Service calls AI refinement (`mode: evaluation`).
* AI output is guarded for format quality.
* Attempt is saved in MongoDB.
* Result is returned and rendered.

**Key Files:**

* Frontend:

  * `client/src/features/evaluate/EvaluatePage.jsx`
  * `client/src/features/evaluate/state/useEvaluateFlow.js`
  * `client/src/features/evaluate/data/scenarios.js`
  * `client/src/features/evaluate/components/ResultPanel.jsx`
  * `client/src/features/evaluate/components/ScoreCard.jsx`
  * `client/src/features/evaluate/components/BreakdownCards.jsx`
  * `client/src/features/evaluate/components/AIFeedbackSections.jsx`
  * `client/src/features/evaluate/HistoryPage.jsx`
* Backend:

  * `server/routes/evaluationRoutes.js`
  * `server/controllers/evaluateController.js`
  * `server/services/evaluationService.js`
  * `server/services/aiRefinementService.js`
  * `server/utils/aiGuard.js`
  * `server/models/attemptModel.js`

---

### C. Doubt Mode

**Purpose:**

* Provide coaching-style guidance when user is unsure.

**User Flow:**

1. Open `/doubt`
2. Fill context, roles, listener question, current response, and level
3. Submit
4. Read AI coaching result

**System Flow:**

* Frontend state is handled by `useDoubtFlow`.
* Input is persisted to localStorage.
* `POST /api/doubt` is called.
* Backend sanitizes and validates.
* Controller calls AI refinement (`mode: doubt`).
* Output is returned and rendered.

**Key Files:**

* `client/src/features/doubt/DoubtPage.jsx`
* `client/src/features/doubt/components/DoubtForm.jsx`
* `client/src/features/doubt/components/DoubtResult.jsx`
* `client/src/features/doubt/state/useDoubtFlow.js`
* `server/routes/doubtRoutes.js`
* `server/controllers/doubtController.js`
* `server/services/aiRefinementService.js`

---

### D. Authentication and Account Recovery

**Purpose:**

* Secure private routes and support account lifecycle.

**User Flow:**

1. Register
2. Verify email via link
3. Login
4. Optional forgot/reset password
5. Logout

**System Flow:**

* Auth pages call `/api/auth/*` endpoints.
* Backend controller handles signup/login/verify/reset.
* Passwords are hashed in user model pre-save hook.
* JWT is issued on login and stored in localStorage.
* Private API routes check JWT using auth middleware.

**Key Files:**

* Frontend:

  * `client/src/features/auth/LoginPage.jsx`
  * `client/src/features/auth/RegisterPage.jsx`
  * `client/src/features/auth/VerifyPage.jsx`
  * `client/src/features/auth/ForgotPasswordPage.jsx`
  * `client/src/features/auth/ResetPasswordPage.jsx`
  * `client/src/utils/auth.js`
* Backend:

  * `server/routes/authRoutes.js`
  * `server/controllers/authController.js`
  * `server/models/User.js`
  * `server/services/emailService.js`
  * `server/middleware/authMiddleware.js`

---

## 4) Cross-Cutting Layers

**Frontend shared:**

* `client/src/app/App.jsx` (global shell)
* `client/src/app/Routes.jsx` (route map)
* `client/src/shared/components/*` (reusable UI)
* `client/src/styles/base.css`, `client/src/styles/theme.css`

**Backend shared:**

* `server/server.js` (startup and route mounting)
* `server/config/index.js` (runtime config)
* `server/config/database.js` (Mongo lifecycle)
* `server/middleware/validationMiddleware.js`
* `server/middleware/errorHandler.js`
* `server/config/attemptStack.js`
* `server/config/modelPrompts.js`
* `server/config/aiPrompt.js`

---

## 5) Feature → File Responsibility Map

| Feature          | Primary Files                                                    | Responsibility                        |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------- |
| Learn            | `LearnPage.jsx`, `learnScenarios.js`, `ScenarioPlayer.jsx`       | Guided scenario learning              |
| Evaluate         | `EvaluatePage.jsx`, `useEvaluateFlow.js`, `evaluationService.js` | Scoring and persistence flow          |
| Evaluate History | `HistoryPage.jsx`, `evaluateController.js`, `attemptModel.js`    | Fetch and display past attempts       |
| Doubt            | `DoubtPage.jsx`, `useDoubtFlow.js`, `doubtController.js`         | Coaching flow and response generation |
| Auth             | `LoginPage.jsx`, `authController.js`, `User.js`                  | Identity, verification, JWT           |
| API Core         | `server.js`, `routes/*`, `middleware/*`                          | Request pipeline and security         |
| AI Control       | `aiRefinementService.js`, `attemptStack.js`, `aiGuard.js`        | Prompting, retries, output guardrails |

---

## ⚠️ Known Architecture Notes

* Frontend handles multiple evaluation response shapes → indicates API contract drift.
* `evaluationService` vs `attemptModel` inconsistency in user/session fields.
* Hardcoded API base URL in frontend (`api.js`).
* AI response parsing depends on text format (potential fragility).

---

## 🛠️ Debugging Entry Points

* **UI issue** → Check feature page + components
* **API issue** → `routes/` → `controller/` → `service/`
* **AI output issue** →

  * `aiRefinementService.js`
  * `modelPrompts.js`
  * `aiGuard.js`
* **Data issue** → Check `models/` and MongoDB

---

## 📚 Recommended Reading Order

1. `README.md`
2. `QUICKSTART.md`
3. `ARCHITECTURE.md`
4. This file (`SYSTEM_MAP.md`)
5. Feature folders (`client/src/features/`)
6. Backend flow (`routes → controllers → services`)

---
