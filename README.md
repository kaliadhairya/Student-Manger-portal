# Student Management Portal

A full-stack Student Management System built with Node.js, Express, MongoDB, and Vanilla JS Frontend.

## Features
- **Authentication**: JWT-based User Signup and Login (Admin Role).
- **Student Management**: Add, View, Edit, and Delete students.
- **Email Notifications**: Automatic emails on creation/updates.
- **Search & Filter**: integrated into the dashboard (client-side for now).

## Prerequisities
- Node.js
- MongoDB

## Installation

1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/studentDB
   AUTH_EMAIL=your_email@gmail.com
   AUTH_PASS=your_app_password
   PORT=5000
   ```
4. Start Server:
   ```bash
   npm start
   ```

## Docker

Run with Docker Compose:
```bash
docker-compose up --build
```

## API Endpoints
- POST `/auth/register` - Create Admin Account
- POST `/auth/login` - Login
- GET `/students` - Get All Students (Protected)
- POST `/students` - Add Student (Protected)
- PUT `/students/:username` - Update Student (Protected)
- DELETE `/students/:username` - Delete Student (Protected)
