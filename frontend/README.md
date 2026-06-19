# DocuSealX

A Digital Signature Platform built using the MERN Stack that allows users to upload PDF documents, place signature fields, manage signature status, and generate signed PDF documents.

---

## Features

* User Registration & Login
* JWT Authentication
* Upload PDF Documents
* View Uploaded Documents
* Place Signature Fields on PDF
* Drag & Reposition Signature Fields
* Signature Status Management (Pending, Signed, Rejected)
* Generate Signed PDF
* Dashboard Analytics
* Documents Management Page
* Audit Logs Page
* Settings Page
* Responsive UI

---

## Tech Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* Axios
* React Router DOM
* React PDF

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* PDF-lib

---

## Project Structure

frontend/

* React + TypeScript
* Dashboard UI
* Authentication Pages
* PDF Viewer
* Documents Page
* Audit Logs
* Settings

backend/

* Express Server
* MongoDB Database
* Authentication APIs
* Document APIs
* Signature APIs
* PDF Generation APIs

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

### Documents

POST /api/docs/upload

GET /api/docs

### Signatures

POST /api/signatures

GET /api/signatures/:fileId

PATCH /api/signatures/:id/status

DELETE /api/signatures/:id

### PDF

GET /api/pdf/generate/:id

---

## Installation

### Backend

```bash
cd backend

npm install

npm start
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a .env file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Future Improvements

* Handwritten Signature Pad
* Multi-user Signing Workflow
* Email Notifications
* Cloud Storage Integration
* Role Based Access Control
* Document Sharing

---

## Author

Shreya Jain

B.Tech CSE

Full Stack Developer

---

## GitHub Repository

Add your GitHub Repository Link Here

---

## Live Demo

Add your Deployment Link Here
