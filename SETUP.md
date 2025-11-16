# Data Collection Platform - Setup Guide

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** (v5+)
- **npm** or **yarn**

## Quick Start

### 1. Install MongoDB

**macOS** (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian**:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Windows**:
Download and install from https://www.mongodb.com/try/download/community

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd packages/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Environment Variables

**Backend** (`packages/backend/.env`):
```bash
# Copy the example file
cd packages/backend
cp .env.example .env

# Edit .env and update the values
# Required:
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/data_platform
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`packages/frontend/.env`):
```bash
# Create .env file
cd packages/frontend
cat > .env << 'ENVFILE'
VITE_API_URL=http://localhost:5000/api
ENVFILE
```

### 4. Start the Application

**Option A: Run both concurrently (from root)**
```bash
npm run dev
```

**Option B: Run separately**

Terminal 1 - Backend:
```bash
cd packages/backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd packages/frontend
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## Default User Roles

When you register, users get the CONTRIBUTOR role by default. To create surveys, you need the CREATOR role.

You can manually add the CREATOR role to a user through MongoDB:

```bash
mongosh
use data_platform
db.users.updateOne(
  { email: "your-email@example.com" },
  { $addToSet: { roles: "creator" } }
)
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
Data-collation-app/
├── packages/
│   ├── backend/          # Node.js/Express API
│   │   ├── src/
│   │   │   ├── config/      # Database & app config
│   │   │   ├── controllers/ # Route controllers
│   │   │   ├── models/      # Mongoose models
│   │   │   ├── routes/      # API routes
│   │   │   ├── middleware/  # Custom middleware
│   │   │   └── utils/       # Helper functions
│   │   └── .env            # Environment variables
│   │
│   └── frontend/         # React/Vite app
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── pages/       # Page components
│       │   ├── services/    # API services
│       │   ├── store/       # Redux store
│       │   └── hooks/       # Custom hooks
│       └── .env            # Environment variables
│
├── SETUP.md             # This file
└── README.md            # Project overview
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/refresh` - Refresh token

### Forms/Surveys
- `GET /api/forms` - Get all published forms
- `GET /api/forms/:id` - Get single form
- `POST /api/forms` - Create new form (requires CREATOR role)
- `PUT /api/forms/:id` - Update form (requires CREATOR role)
- `DELETE /api/forms/:id` - Delete form (requires CREATOR role)
- `POST /api/forms/:id/publish` - Publish form (requires CREATOR role)

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Check status
mongosh
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process using the port
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

### JWT Token Errors
**Solution**: Make sure JWT_SECRET and JWT_REFRESH_SECRET are set in `.env` file

## Next Steps

1. ✅ Register a new account
2. ✅ Add CREATOR role to your user (see "Default User Roles" above)
3. ✅ Create your first survey
4. ✅ Publish the survey
5. ✅ Test by filling out the survey as a contributor

## Need Help?

Check the documentation:
- Backend API: `packages/backend/README.md`
- Frontend: `packages/frontend/README.md`
