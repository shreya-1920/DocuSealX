


# DocuSealX

DocuSealX is a secure, full-stack digital signature platform that allows users to upload PDF documents, place signature fields, manage signature workflows, and generate signed PDF documents.

## Features

- User registration and login
- JWT-based authentication
- PDF document upload
- View and manage uploaded documents
- Place signature fields on PDF documents
- Drag and reposition signature fields
- Signature status management
  - Pending
  - Signed
  - Rejected
- Generate signed PDF documents
- Dashboard analytics
- Document management
- Audit logs
- Settings page
- Responsive user interface

## Tech Stack
### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- React PDF

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- PDF-lib

## Core Functionality

### Authentication
- User registration and login
- JWT-based authentication
- Authenticated user profile

### Document Management
- Upload PDF documents
- View uploaded documents
- Manage documents

### Digital Signatures
- Add signature fields to PDF documents
- Position signature fields
- Track signature status
- Generate signed PDF documents

### Audit & Management
- Dashboard analytics
- Audit logs
- Document management
- User settings## API Endpoints

### Base URL

```text
http://localhost:5000
```

### Health & Testing

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Check if the backend is running |
| GET | `/test-db` | Check MongoDB connection and return user count |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user and generate JWT |
| GET | `/api/auth/profile` | Get authenticated user profile |
| PUT | `/api/auth/:id` | Update signature position |

### Documents

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/docs/upload` | Upload a PDF document |
| GET | `/api/docs` | Retrieve all uploaded documents |
| DELETE | `/api/docs/:id` | Delete a document |

### Signatures

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signatures` | Create a signature field |
| GET | `/api/signatures/:fileId` | Get signatures for a document |
| PUT | `/api/signatures/:id` | Update signature field position |
| PATCH | `/api/signatures/:id/status` | Update signature status |
| DELETE | `/api/signatures/:id` | Delete a signature field |

### PDF Generation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pdf/generate/:id` | Generate a signed PDF |

### Static File Access

| Endpoint | Description |
|----------|-------------|
| `/uploads/*` | Access uploaded PDF files |
| `/signed/*` | Access generated signed PDF files |## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shreya-1920/DocuSealX.git
cd DocuSealX
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

The backend will run at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

### 4. MongoDB Setup

Make sure MongoDB is configured and running.

Add your MongoDB connection string to the backend `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

The application uses MongoDB to store user, document, and signature data.

---

## Environment Variables

Create a `.env` file inside the `backend` directory:

| Variable | Description |
|----------|-------------|
| `PORT` | Port on which the backend server runs |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used for JWT authentication |

Example:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/docusealx
JWT_SECRET=your_secret_key
```

---

## Usage

1. Start the backend server.
2. Start the frontend development server.
3. Open the application in your browser.
4. Register or log in to your account.
5. Upload a PDF document.
6. Add and position signature fields.
7. Manage the document and signature status.
8. Generate the signed PDF.

------

## Future Improvements

- Handwritten signature pad
- Multi-user document signing workflow
- Email notifications
- Cloud-based document storage
- Advanced role-based access control
- Document sharing
- Enhanced audit and activity tracking

------
## Author

**Shreya Jain**

B.Tech Computer Science Engineering  
Poornima University, Jaipur
