# Data Collection & Analytics Platform

A comprehensive platform for data collection, crowdsourcing, marketplace, and automated analytics.

## Features

- **User Management**: Multi-role system (Creator, Contributor, Verifier)
- **Form Builder**: Drag-and-drop form creation with advanced logic
- **Crowdsourcing**: Distributed data collection with quality verification
- **Data Marketplace**: Buy and sell datasets
- **Analytics Engine**: Automated statistical analysis and visualizations
- **Wallet System**: In-app payments and withdrawals
- **Admin Panel**: Complete platform management

## Technology Stack

### Frontend
- React.js with TypeScript
- Material-UI
- Redux Toolkit
- React Hook Form
- Recharts

### Backend
- Node.js with Express.js
- TypeScript
- PostgreSQL (structured data)
- MongoDB (dynamic forms)
- Redis (caching)

### Analytics
- Python with FastAPI
- Pandas, NumPy, SciPy
- scikit-learn
- Matplotlib/Plotly

## Project Structure

```
data-collection-platform/
├── packages/
│   ├── backend/          # Express.js API
│   ├── frontend/         # React.js application
│   ├── analytics/        # Python analytics microservice
│   └── shared/           # Shared types and utilities
├── docker-compose.yml
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- MongoDB 6+
- Redis 7+

### Installation

```bash
# Install all dependencies
npm run install:all

# Copy environment files
cp packages/backend/.env.example packages/backend/.env
cp packages/frontend/.env.example packages/frontend/.env
cp packages/analytics/.env.example packages/analytics/.env

# Start all services
npm run dev
```

### Using Docker

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down
```

## Environment Variables

See individual package `.env.example` files for required configuration.

## API Documentation

Once running, visit:
- Backend API: http://localhost:5000/api-docs
- Analytics API: http://localhost:8001/docs

## License

MIT
