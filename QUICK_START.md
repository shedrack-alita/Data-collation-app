# Quick Start Guide

## Prerequisites

Ensure you have the following installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.11+ ([Download](https://www.python.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/))
- **MongoDB** 6+ ([Download](https://www.mongodb.com/))
- **Redis** 7+ ([Download](https://redis.io/))
- **Docker** (Optional but recommended) ([Download](https://www.docker.com/))

## Option 1: Quick Start with Docker (Recommended)

This is the fastest way to get started:

```bash
# 1. Clone the repository
git clone <repository-url>
cd Data-collation-app

# 2. Start all services with Docker
docker-compose up --build

# 3. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Analytics API: http://localhost:8001
```

That's it! All services are now running.

## Option 2: Manual Setup

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd packages/backend
npm install
cd ../..

# Install frontend dependencies
cd packages/frontend
npm install
cd ../..

# Install Python dependencies
cd packages/analytics
pip install -r requirements.txt
cd ../..
```

### Step 2: Configure Environment Variables

```bash
# Backend
cp packages/backend/.env.example packages/backend/.env
# Edit packages/backend/.env with your database credentials

# Frontend
cp packages/frontend/.env.example packages/frontend/.env
# Edit if needed (defaults should work)

# Analytics
cp packages/analytics/.env.example packages/analytics/.env
# Edit if needed (defaults should work)
```

### Step 3: Setup Databases

**PostgreSQL:**
```bash
# Create database
createdb data_platform

# Or using psql
psql -U postgres
CREATE DATABASE data_platform;
\q
```

**MongoDB:**
```bash
# MongoDB will auto-create the database on first connection
# Just ensure MongoDB is running:
mongod
```

**Redis:**
```bash
# Ensure Redis is running
redis-server
```

### Step 4: Run Migrations

```bash
cd packages/backend
npm run migrate
cd ../..
```

### Step 5: Start Services

Open 3 terminal windows:

**Terminal 1 - Backend:**
```bash
cd packages/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd packages/frontend
npm run dev
```

**Terminal 3 - Analytics:**
```bash
cd packages/analytics
python -m uvicorn main:app --reload --port 8001
```

### Step 6: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Analytics API:** http://localhost:8001/docs

## First Steps

### 1. Create an Account

Navigate to http://localhost:3000 and click "Register"

Fill in:
- First Name
- Last Name
- Email
- Password

### 2. Login

Use your credentials to login

### 3. Explore Features

Currently implemented:
- ✅ User authentication
- ✅ Dashboard
- ⚠️ Form builder (structure ready, UI to be completed)
- ⚠️ Analytics API (backend ready, UI to be completed)

## Testing the APIs

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Profile:**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using the Analytics API

Navigate to: http://localhost:8001/docs

You'll see interactive API documentation where you can test all analytics endpoints.

**Example - Descriptive Statistics:**
```bash
curl -X POST http://localhost:8001/api/stats/descriptive \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      {"age": 25, "salary": 50000},
      {"age": 30, "salary": 60000},
      {"age": 35, "salary": 70000}
    ]
  }'
```

## Default Ports

| Service    | Port |
|------------|------|
| Frontend   | 3000 |
| Backend    | 5000 |
| Analytics  | 8001 |
| PostgreSQL | 5432 |
| MongoDB    | 27017|
| Redis      | 6379 |

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000 (example)
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Database Connection Error

- Ensure PostgreSQL is running: `pg_isready`
- Ensure MongoDB is running: `mongosh --eval "db.adminCommand('ping')"`
- Check credentials in `.env` files

### Cannot Connect to Redis

```bash
# Check if Redis is running
redis-cli ping
# Should return: PONG
```

### Docker Issues

```bash
# Stop all containers
docker-compose down

# Remove volumes and rebuild
docker-compose down -v
docker-compose up --build
```

## Development Tips

### Backend Development

```bash
cd packages/backend

# Run in development mode with hot reload
npm run dev

# Run linter
npm run lint

# Run tests
npm test
```

### Frontend Development

```bash
cd packages/frontend

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Analytics Development

```bash
cd packages/analytics

# Run with auto-reload
uvicorn main:app --reload --port 8001

# Run tests
pytest
```

## Next Steps

1. Read the [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for detailed feature implementation
2. Check [FEATURES_CHECKLIST.md](./FEATURES_CHECKLIST.md) for current progress
3. Review the main [README.md](./README.md) for architecture overview

## Getting Help

- Check the documentation files
- Review example API calls
- Look at the existing code structure
- Check console logs for errors

## Production Deployment

See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#deployment) for production deployment instructions.

## License

MIT
