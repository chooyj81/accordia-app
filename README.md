# Accordia-app

A full-stack **CRUD web application** with **authentication** and **authorization** features. Built for Accordia Solution assessment.

This project includes:
- A backend API server
- An Angular frontend
- A SQL database schema for data storage

---

## Features

- User authentication and login  
- Authorization for protected routes  
- Create, Read, Update, Delete (CRUD) operations  
- Connected to a local SQL database  
- Simple UI

---

## Project Structure
Accordia-app
backend/ # Backend API server
frontend/ # Angular single-page application
database.sql # SQL script to initialize the database

## Running the app
### Backend
1. Open terminal and navigate into the backend folder:
```
cd backend
```
3. Install dependencies
```
npm install
```
5. Create a local database (using the provided database.sql) and update connection settings in the backend config
6. Update the database password in .env file:
```
File location: backend/.env

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD_HERE  #CHANGE THIS TO YOUR LOCAL DATABASE PASSWORD
DB_NAME=accordia_app
JWT_SECRET=thisisasecuritykeyforjwt
```
7. Start the backend server
```
npm start
```

### Frontend
1. Open another terminal and go to frontend folder:
```
cd frontend
```
2. Install project dependencies:
```
npm install
```
3. Serve the Angular app:
```
ng serve
```
4. Open a browser and visit:
```
http://localhost:4200
```

### Login credentials
**Admin Account**

Email: admin@example.com

Password: 123456

**User Account**

Email: user@example.com

Password: 123456
