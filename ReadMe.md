# GadgetVerse: MERN Stack E-Commerce Store for Gadgets and Consumer Electronics

![MERN](https://img.shields.io/badge/stack-MERN-47A248?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Dark Mode](https://img.shields.io/badge/theme-light%20%2F%20dark-7c3aed)
![Status](https://img.shields.io/badge/status-prototype-orange)

**GadgetVerse** is a full-stack **e-commerce website** for smartphones, laptops, audio gear and smart wearables, built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It has a responsive **React + Vite** storefront with a persistent cart, wishlist, **light/dark theme** and a **REST API** backed by MongoDB. It is a good base for a **MERN e-commerce project**, a portfolio piece or a college minor project.

> **Keywords:** MERN e-commerce project, React shopping cart, Node.js Express REST API, MongoDB product catalog, React Context API, dark mode React app, gadget store website, online electronics store, full-stack project for students.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Routes](#frontend-routes)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Current Status and Roadmap](#current-status-and-roadmap)
- [Contributing](#contributing)
- [Author](#author)

## Features

- **Product catalog**: 4 categories and 16 seeded products (smartphones, laptops, audio and earbuds, smart wearables)
- **Category pages** with sorting (featured, price low to high, price high to low) and loading, error and empty states
- **Product detail pages**: image gallery, rating, discount, features, stock and quantity selector
- **Shopping cart**: live subtotal, shipping (free above ₹999, otherwise ₹99), 18% GST and total
- **Wishlist**: save and remove products, move them to the cart
- **User signup and sign-in** backed by MongoDB
- **Light and dark themes** that are saved between visits
- **Toast notifications**, a profile page and a contact/support page with an FAQ
- **State persistence** with React Context and `localStorage` (cart, wishlist, user and theme)
- **Responsive UI** with CSS custom properties

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Axios, CSS custom properties, oxlint |
| State | React Context API, `localStorage` |
| Backend | Node.js, Express, REST API, CORS, dotenv, Nodemon |
| Database | MongoDB, Mongoose |

## Getting Started

**Prerequisites:** Node.js 18+, npm and a MongoDB database (local or MongoDB Atlas).

```bash
# 1. Clone the repository
git clone https://github.com/kushdev69/gadgetverse.git
cd gadgetverse

# 2. Install backend dependencies
cd backend && npm install

# 3. Install frontend dependencies
cd ../frontend && npm install
```

**4. Configure the backend.** Create `backend/.env` with your MongoDB connection string. Check `backend/config/db.js` for the exact variable name. Never commit this file.

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

**5. Seed the catalog** (4 categories, 16 products):

```bash
cd backend
npm run seed
```

**6. Run the app** in two terminals:

```bash
# Terminal 1: API
cd backend && npm run dev

# Terminal 2: storefront
cd frontend && npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

**Production build:** `cd frontend && npm run build`

## Frontend Routes

| Route | Page |
|---|---|
| `/` | Home: hero, categories, trending products, promo banner |
| `/category/:slug` | `smartphones`, `laptops`, `audio`, `wearables` |
| `/product/:id` | Product details |
| `/cart` | Shopping cart |
| `/wishlist` | Saved products |
| `/signup` · `/signin` | Authentication |
| `/profile` | User profile |
| `/contact` | Support and FAQ |

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | API health check |
| POST | `/api/auth/signup` | Register a user |
| POST | `/api/auth/signin` | Sign in |
| GET | `/api/catalog/categories` | List categories |
| GET | `/api/catalog/products` | List products (`category`, `featured`, `sort`) |
| GET | `/api/catalog/products/:productCode` | Single product |

Examples:

```
/api/catalog/products?featured=true
/api/catalog/products?category=laptops
/api/catalog/products?category=audio&sort=price_desc
```

## Project Structure

```
gadgetverse/
├── backend/
│   ├── app.js              # Express app and middleware
│   ├── server.js           # Server entry point
│   ├── database-seed.js    # Seeds categories and products
│   ├── config/db.js        # MongoDB connection
│   ├── models/             # User, Category, Product schemas
│   └── routes/             # Auth and catalog routes
└── frontend/
    └── src/
        ├── App.jsx                   # Routes and layout
        ├── index.css                 # Light/dark theme variables
        ├── context/StoreContext.jsx  # Cart, wishlist, auth, toasts
        ├── pages/                    # Home, Category, Product, Cart...
        └── components/               # Navbar, ProductCard, Footer...
```

## Current Status and Roadmap

GadgetVerse is a **polished storefront prototype**. The catalog, cart, wishlist, theming and basic auth work. These parts are still in progress:

- [ ] Real checkout, order model and payment gateway (Razorpay or Stripe)
- [ ] Password hashing (bcrypt or Argon2) and JWT or session auth
- [ ] Database-backed cart, wishlist and order history
- [ ] Working contact form and newsletter
- [ ] Product reviews and quick-view modal
- [ ] Admin dashboard for products and stock
- [ ] Automated tests, CI and Docker

> **Security note:** passwords are currently stored without hashing. Do not use this in production until authentication is hardened.

## Contributing

Contributions are welcome. Fork the repo, create a feature branch, commit your changes and open a pull request.

## Author

**Kushal**, [GitHub @kushdev69](https://github.com/kushdev69)

If this project helps you, please give it a ⭐. It helps other developers find it.

<!-- Topics to add on GitHub: mern, mern-stack, ecommerce, react, vite, nodejs, express, mongodb, mongoose, shopping-cart, wishlist, dark-mode, rest-api, fullstack, college-project -->