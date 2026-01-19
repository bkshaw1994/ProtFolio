# MERN Stack Portfolio

A full-stack portfolio application built with the MERN stack, showcasing 9 years of development experience.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Tools**: Concurrently for development

## Features

- Responsive portfolio design
- Dynamic content management
- Project showcase
- Skills and experience display
- Contact form
- Admin panel for content management
- REST API endpoints

## Project Structure

```
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS files
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── index.js
└── package.json           # Root package.json
```

## Installation

1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   npm run install-deps
   ```

3. Set up environment variables:
   - Create `.env` file in the server directory
   - Add your MongoDB connection string

4. Start the development server:
   ```bash
   npm run dev
   ```

## Build Process

This project implements comprehensive quality gates to ensure code quality before deployment.

### Quick Start
```bash
# Development with quality checks
npm run build:prod

# Development without quality checks
npm run build:dev

# CI/CD optimized build
npm run build:ci
```

### Quality Gates
- **ESLint**: Zero warnings policy enforced
- **Test Coverage**: Minimum 70% coverage required
- **Unit Tests**: All tests must pass

For detailed build documentation, see [BUILD.md](./BUILD.md).

## Scripts

### Development
- `npm run dev` - Start both client and server in development mode
- `npm run client` - Start only React frontend
- `npm run server:dev` - Start only Express backend

### Building
- `npm run build:prod` - Production build with quality gates
- `npm run build:dev` - Development build without validation
- `npm run build:ci` - CI/CD optimized build

### Testing
- `npm run test` - Run all tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:client` - Run client tests only
- `npm run test:server` - Run server tests only

### Code Quality
- `npm run lint:all` - Lint entire project
- `npm run lint:all:check` - Lint with zero warnings enforcement
- `npm run lint:fix` - Auto-fix linting issues

## Environment Variables

Create a `.env` file in the server directory:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## API Endpoints

- `GET /api/profile` - Get profile information
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get skills data
- `GET /api/experience` - Get work experience
- `POST /api/contact` - Submit contact form

## License

MIT License
