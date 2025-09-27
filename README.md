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
   npm run install-all
   ```

3. Set up environment variables:
   - Create `.env` file in the server directory
   - Add your MongoDB connection string

4. Start the development server:
   ```bash
   npm run dev
   ```

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