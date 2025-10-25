# Task Manager - Full-Stack Application

A clean and simple task management application built with .NET 8 and React with TypeScript.

**🚀 [Deployment Guide](DEPLOYMENT.md)** - Deploy to Render (Backend) & Vercel (Frontend)

## Features

- ✅ Display list of tasks
- ✅ Add new tasks with descriptions
- ✅ Mark tasks as completed/uncompleted
- ✅ Delete tasks
- ✅ In-memory storage (no database required)
- ✅ RESTful API with Swagger documentation
- ✅ Modern, responsive UI

## Tech Stack

**Backend:**
- C# .NET 8
- ASP.NET Core Minimal API
- In-memory storage with ConcurrentDictionary
- Swagger/OpenAPI

**Frontend:**
- React 18
- TypeScript
- Axios for API calls
- React Hooks for state management

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Run the backend:
```bash
dotnet run
```

The API will start at `http://localhost:5000` with Swagger UI available at `http://localhost:5000/swagger`

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start at `http://localhost:3000` and automatically open in your browser.

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

## Project Structure

```
├── Backend/
│   ├── Program.cs          # Main API logic
│   └── Backend.csproj      # Project configuration
├── Frontend/
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── api.ts          # API service
│   │   ├── types.ts        # TypeScript interfaces
│   │   ├── App.tsx         # Main component
│   │   ├── App.css         # Styles
│   │   └── index.tsx       # Entry point
│   ├── package.json        # Dependencies
│   └── tsconfig.json       # TypeScript config
└── README.md
```

## Running Both Services

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd Backend
dotnet run
```

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm start
```

## Notes

- The backend uses in-memory storage, so all data will be lost when the server restarts
- CORS is enabled for all origins in development mode
- The frontend is configured to connect to the backend at `http://localhost:5000`
