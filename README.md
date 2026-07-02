# 🚀 Full Stack User Management System

A modern **Full Stack User Management System** built using **React.js**, **Node.js**, **Express.js**, **MySQL**, and **Axios**. This project demonstrates complete CRUD operations with REST APIs, MySQL database integration, and a responsive dashboard interface.

---

## 📌 Features

- 👥 View All Users
- ➕ Add New User
- ✏️ Edit Existing User
- 🗑️ Delete User
- 🔍 Search Users
- 📊 Dashboard Statistics
- 📱 Responsive Design
- 🔄 REST API Integration
- 💾 MySQL Database Storage
- ⚡ Fast React Frontend

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS3
- Vite

### Backend
- Node.js
- Express.js

### Database
- MySQL

### API Testing
- Postman

---

# 📂 Project Structure

```text
fullstack-user-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── userController.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── user-management-system/
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── vite.config.js
│       └── App.jsx
│
├── screenshots/
├── README.md
└── .gitignore
```
---

# 🚀 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users` | Get All Users |
| GET | `/users/:id` | Get User By ID |
| POST | `/users` | Create User |
| PUT | `/users/:id` | Update User |
| DELETE | `/users/:id` | Delete User |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/fullstack-user-management-system.git
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

## Frontend Setup

```bash
cd frontend/user-management-system
npm install
npm run dev
```

---

# 🗄️ MySQL Configuration

Create a database:

```sql
CREATE DATABASE task5_db;
```

Create the users table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT NOT NULL
);
```

Update your database configuration inside:

```text
backend/config/db.js
```

---

# 📷 Project Workflow

```text
React Frontend
        │
        ▼
Axios API
        │
        ▼
Express.js Server
        │
        ▼
MySQL Database
```

---

# 🎯 Learning Outcomes

Through this project, I learned:

- React.js Fundamentals
- Axios API Integration
- REST API Development
- Express.js
- Node.js
- CRUD Operations
- MySQL Database
- Database Connectivity
- Full Stack Development
- Responsive UI Design
- API Testing with Postman

---

# 🚀 Future Improvements

- Authentication (JWT)
- Login & Signup
- User Roles (Admin/User)
- Pagination
- Sorting
- Dark Mode
- Toast Notifications
- Profile Images
- Docker Deployment

---

# 🏢 Internship Details

**Organization:** Saiket Systems

**Domain:** Full Stack Development

**Project:** Full Stack User Management System

---

# 👨‍💻 Author

**Ritesh Sharma**

Full Stack Developer

GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile

---

# ⭐ Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.
