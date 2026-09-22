# 👨‍💼 Employee Management System

A full-stack **Employee Management System** developed as part of the **Prodigy Infotech Internship – Task 02**.

The application provides secure employee management with authentication, validation, and complete CRUD functionality.

---

## 🚀 Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing using Argon2
- Protected employee APIs
- Logout functionality
- Token expiration handling

### 👨‍💼 Employee Management

- Add employees
- View all employees
- View employee details
- Edit employee information
- Delete employees
- Duplicate email protection

### ✅ Validation

- Required field validation
- Email validation
- Phone number validation
- Salary validation
- Date of joining validation
- Username and password validation
- Backend and frontend error handling

### 🎨 Frontend

- Modern dark dashboard
- Royal Purple + Indigo theme
- Employee statistics
- Department badges
- Responsive employee table
- Add/Edit employee modal
- Icon-based Edit and Delete actions
- Responsive layout

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT
- Argon2

### Database

- PostgreSQL

### Development Tools

- Git
- GitHub
- VS Code
- FastAPI Swagger UI

---

## 📂 Project Structure

```text
PRODIGY_FS_02/
│
├── backend/
│   └── app/
│       ├── models/
│       ├── schemas/
│       ├── routers/
│       ├── services/
│       ├── database.py
│       ├── dependencies.py
│       ├── settings.py
│       └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

## 🔄 Application Workflow

```text
User
  │
  ▼
React Frontend
  │
  │ JWT Authentication
  ▼
FastAPI Backend
  │
  ├── Authentication
  ├── Validation
  └── Employee CRUD
  │
  ▼
PostgreSQL Database
```

---

## 🔑 Authentication Flow

```text
Register
   │
   ▼
User stored in PostgreSQL
   │
   ▼
Login
   │
   ▼
Credentials verified
   │
   ▼
JWT access token generated
   │
   ▼
Token stored by frontend
   │
   ▼
Protected employee APIs accessed
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint         | Description                  |
|--------|-------------------|-------------------------------|
| POST   | `/auth/register`  | Register a new user           |
| POST   | `/auth/login`     | Login and receive JWT token   |

### Employees

| Method | Endpoint            | Description           |
|--------|----------------------|------------------------|
| POST   | `/employees/`        | Add employee           |
| GET    | `/employees/`        | Get all employees      |
| GET    | `/employees/{id}`    | Get employee by ID     |
| PUT    | `/employees/{id}`    | Update employee        |
| DELETE | `/employees/{id}`    | Delete employee        |

> ⚠️ All employee endpoints require JWT authentication.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Shikha-shi/PRODIGY_FS_02.git
cd PRODIGY_FS_02
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
DB_CONNECTION=postgresql+psycopg://username:password@localhost:5432/employee_management_db
JWT_SECRET_KEY=your-secret-key
JWT_EXPIRE_MINUTES=60
```

> **Important:** Never commit your `.env` file or secret keys to GitHub.

### 4. Start the Backend

From the backend directory:

```bash
uvicorn app.main:app --reload
```

Backend API: `http://127.0.0.1:8000`

FastAPI Swagger Documentation: `http://127.0.0.1:8000/docs`

### 5. Start the Frontend

Open another terminal and navigate to the project directory:

```bash
cd PRODIGY_FS_02/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend: `http://localhost:5173`
