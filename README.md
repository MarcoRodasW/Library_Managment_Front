# Library Management System - Frontend

A modern React application for managing a library system, including books, clients, and loans management.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS 4** - Styling
- **TanStack Query** - Server state management
- **React Hook Form + Zod** - Form handling and validation
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icons

## Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd library_managment_front
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and configure the API URL:
```
VITE_API_URL=http://localhost:5124/api
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── books/          # Book-related components
│   ├── clients/        # Client-related components
│   ├── loans/          # Loan-related components
│   └── ui/             # Reusable UI components
├── lib/
│   └── api/            # API functions and types
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Features

- **Books Management**: View, create, and delete books
- **Clients Management**: View and create clients, view client loan history
- **Loans Management**: View all loans with expandable details, create new loans
- **Responsive Design**: Works on desktop and mobile devices

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5124/api` |
