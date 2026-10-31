# GadgetVerse

GadgetVerse is a full-stack e-commerce application for discovering and managing consumer electronics. The frontend provides a responsive shopping experience built with React and Vite, while the backend exposes an Express API backed by MongoDB.

## Features

- Browse products by category and view product details
- Create an account and sign in
- Add products to a cart and manage quantities
- Save products to a wishlist
- Persist cart, wishlist, and signed-in user state in browser storage
- Admin sign-in and protected product creation
- Responsive storefront pages with contact and profile views
- Catalog, authentication, and administrative API endpoints

## Technology Stack

### Frontend

- React 19
- React Router 7
- Axios
- Vite
- Oxlint

### Backend

- Node.js with Express 5
- MongoDB with Mongoose
- CORS
- dotenv
- Nodemon for development

## Project Structure

```text
gadgetVerse/
├── backend/    # Express API, MongoDB connection, routes, and seed script
└── frontend/   # React/Vite web application
```

## Prerequisites

- Node.js 20.19 or newer
- npm
- A MongoDB database (local or MongoDB Atlas)

## Getting Started

Clone the repository and open two terminals: one for the API and one for the frontend.

### 1. Configure and run the backend

```bash
cd gadgetVerse/backend
npm install
```

Create a `.env` file in `Project/backend`:

```env
MONGO_URL=mongodb://127.0.0.1:27017/gadgetverse
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Start the API in development mode:

```bash
npm run dev
```

The API is available at `http://localhost:3000`. Verify that it is running with:

```text
http://localhost:3000/api/health
```

To load the sample catalog data, run this from `gadgetVerse/backend`:

```bash
npm run seed
```

### 2. Configure and run the frontend

```bash
cd gadgetVerse/frontend
npm install
```

The frontend uses `http://localhost:3000/api` by default. To point it to another API, create `gadgetVerse/frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the Vite development server:

```bash
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Environment Variables

### Backend (`gadgetVerse/backend/.env`)

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `MONGO_URL` | Yes | — | MongoDB connection string used by Mongoose |
| `PORT` | No | `3000` | Port on which the Express API listens |
| `FRONTEND_URL` | No | `http://localhost:5173` | Frontend origin allowed by the CORS configuration |

### Frontend (`gadgetVerse/frontend/.env`)

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `VITE_API_URL` | No | `http://localhost:3000/api` | Base URL used by Axios for authentication, catalog, and admin requests |

Vite exposes only variables prefixed with `VITE_` to browser code. Do not place passwords, database credentials, or other secrets in frontend environment files. Environment changes require restarting the Vite server.

## Available Commands

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

### Backend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with Nodemon |
| `npm start` | Start the API with Node.js |
| `npm run seed` | Seed the MongoDB catalog |

## API Overview

The backend is mounted under `/api`:

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/catalog/categories`
- `GET /api/catalog/products`
- `GET /api/catalog/products/:productCode`
- `POST /api/admin/signin`
- `POST /api/admin/products`
- `GET /api/health`

## Production Build

Build and preview the frontend with:

```bash
cd gadgetVerse/frontend
npm run build
npm run preview
```

For deployment, set `VITE_API_URL` to the publicly reachable API base URL, configure the backend environment variables in the hosting provider, and ensure the deployed frontend origin is included in `FRONTEND_URL`.

## Troubleshooting

- **Database connection failed:** confirm that `MONGO_URL` is set and that MongoDB is running or reachable.
- **Network errors in the browser:** confirm that the backend is running and that `VITE_API_URL` includes the `/api` path.
- **CORS errors:** set `FRONTEND_URL` to the exact frontend origin, including its protocol and port.
- **Catalog is empty:** run `npm run seed` from `Project/backend`.
