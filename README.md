# MERN To-Do App ✅

A simple **MERN stack** (MongoDB, Express.js, React, Node.js) application for managing tasks. You can add, update, mark complete, and delete tasks.

---

## 🚀 Features

* Create, read, update, and delete (CRUD) tasks
* Mark tasks as completed/incomplete
* Responsive React frontend
* RESTful API with Express & MongoDB
* Error handling & async middleware
* Environment-based configuration

---

## 🛠️ Tech Stack

* **Frontend:** React, Axios, Context API
* **Backend:** Node.js, Express.js, Mongoose
* **Database:** MongoDB Atlas
* **Other:** dotenv, CORS, Helmet, Morgan

---

## 📂 Project Structure

```
MERN-TODO-APP/
├── backend/              # Express + MongoDB API
│   ├── config/           # Database config
│   ├── controllers/      # Task logic
│   ├── middleware/       # Error & async handlers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── server.js         # Entry point
│   └── .env              # Backend environment variables
│
├── frontend/             # React client
│   ├── public/           # Static files
│   ├── src/              # Components, pages, context, services
│   ├── App.js
│   ├── index.js
│   └── .env              # Frontend environment variables
│
├── .gitignore            # Ignored files
├── README.md             # Documentation
└── package.json          # Root metadata (optional)
```

---

## ⚙️ Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/mern-todo-app.git
cd mern-todo-app
```

### 2️⃣ Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 3️⃣ Environment variables

Create `.env` files inside `backend/` and `frontend/`.

**backend/.env:**

```env
PORT=5000
MONGO_URI=your-mongodb-connection-uri
CORS_ORIGINS=http://localhost:3000
```

**frontend/.env:**

```env
REACT_APP_API_URL=http://localhost:5000/api/tasks
```

### 4️⃣ Run the app

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm start
```

Open 👉 `http://localhost:3000`

---

## 📌 API Endpoints

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| GET    | `/api/tasks`              | Get all tasks        |
| POST   | `/api/tasks`              | Create a new task    |
| PUT    | `/api/tasks/:id`          | Update a task        |
| PATCH  | `/api/tasks/:id/complete` | Toggle task complete |
| DELETE | `/api/tasks/:id`          | Delete a task        |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.

---

## 📜 License

MIT License
