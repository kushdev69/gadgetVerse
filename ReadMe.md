GADGETVERSE - DETAILED SITE OVERVIEW
====================================

1. WHAT THE SITE IS
-------------------

GadgetVerse is a modern e-commerce storefront for browsing and purchasing
consumer electronics. It is designed for customers in India and focuses on:

- Smartphones
- Laptops
- Audio devices and earbuds
- Smart wearables
- Product discovery
- Wishlist management
- Shopping cart management
- User registration and login
- Customer support and contact
- Light and dark themes

The site uses a bright, premium visual design with purple, coral, pink, and
cyan accents. It also includes a dark space-tech theme.

The frontend is a React/Vite application, and the backend is an
Express/MongoDB API.


2. TECHNOLOGY USED
-------------------

FRONTEND

The frontend is located in:

frontend/

Technologies include:

- React
- React Router
- Vite
- Axios
- CSS custom properties
- oxlint for linting
- Browser localStorage for cart, wishlist, theme, and logged-in user persistence

Important frontend files include:

- frontend/src/App.jsx
- frontend/src/index.css
- frontend/src/context/StoreContext.jsx

BACKEND

The backend is located in:

backend/

Technologies include:

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv
- Nodemon for development

Important backend files include:

- backend/app.js
- backend/server.js
- backend/database-seed.js
- backend/config/db.js

The database configuration is stored in the backend .env file. Its contents
should remain private because it contains database connection information.


3. MAIN NAVIGATION
------------------

The top navigation bar contains:

- GadgetVerse logo
- Home
- Phones
- Laptops
- Audio
- Wearables
- Contact
- Light/dark theme toggle
- Wishlist icon
- Cart icon with item count
- Profile icon
- Login and signup buttons when logged out
- User name and sign-out button when logged in

The navigation bar also:

- Changes appearance when the user scrolls
- Highlights the active page
- Displays the number of items in the cart
- Saves the selected theme in localStorage


4. HOME PAGE
------------

The home page is the main storefront and contains several sections.

HERO SECTION

The hero section contains the headline:

"Where Great Tech Meets Everyday Life."

It includes:

- A short GadgetVerse introduction
- Explore Gadgets button
- Shop Best Sellers button
- 10K+ curated gadgets statistic
- 100% authentic tech statistic
- 4.9-star customer rating
- A large smartphone image
- Smart Choice promotional card
- Top Brands promotional card
- Warranty Included message

SHOPPING PROMISE SECTION

The home page highlights four service promises:

1. Genuine Products
2. Fast Delivery
3. Expert Support
4. Easy Returns

CATEGORY SECTION

The category section loads category information from the backend and displays:

- Category image
- Category name
- Number of products
- Link to the category page

Current categories:

- Smartphones
- Laptops
- Audio and Earbuds
- Smart Wearables

TRENDING PRODUCTS SECTION

The home page requests featured products from the backend and displays them
as product cards.

Each product card includes:

- Product image
- Product name
- Product description
- Product price
- Product badge, if available
- Wishlist button
- Add-to-cart button
- Link to the product detail page

PROMOTIONAL BANNER

The page advertises:

- 20% off the first gadget order
- Promo code: TECH20

The promotional button sends the user to the signup page.

NEWSLETTER AREA

The homepage includes a newsletter-style section where users can enter an
email address and subscribe.

Currently, this is mainly a visual UI element. It does not submit the email
to a backend newsletter service.


5. PRODUCT CATEGORIES
---------------------

Category pages are available at:

- /category/smartphones
- /category/laptops
- /category/audio
- /category/wearables

Each category page provides:

- Category title
- Category description
- Product count
- Product listing
- Loading state
- Error state
- Empty state
- Sorting controls

SORTING OPTIONS

- Featured
- Price: Low to High
- Price: High to Low

The category page requests products using category and sorting query
parameters.

Example:

/api/catalog/products?category=smartphones&sort=featured


6. PRODUCT CARDS
----------------

Product cards are reusable throughout the application.

A product card displays:

- Product badge
- Product image
- Product name
- Product description
- Price
- Add-to-cart control
- Wishlist control
- Product detail link

The Quick View eye icon is present visually, but it does not currently open
a quick-view modal or perform another action.


7. PRODUCT DETAIL PAGE
----------------------

Product detail pages use this route:

/product/:id

The page displays:

- Product image
- Product thumbnails
- Product name
- Product rating
- Review count
- Current price
- Original price
- Discount percentage
- Product description
- Product features
- Stock quantity
- Quantity selector
- Add to Cart button
- Wishlist button
- Buy Now button

The product page supports:

- Increasing and decreasing quantity
- Adding a selected quantity to the cart
- Saving or removing the product from the wishlist
- Switching between product images

The Buy Now button currently adds the product to the cart. It does not yet
open a real checkout or payment flow.


8. SHOPPING CART
----------------

The cart page uses this route:

/cart

The cart supports:

- Viewing cart items
- Viewing product image and name
- Increasing quantity
- Decreasing quantity
- Removing products
- Displaying total gadget quantity
- Calculating subtotal
- Calculating shipping
- Calculating GST
- Displaying final total
- Entering a promo code
- Proceeding toward checkout

CART CALCULATIONS

- Free shipping for orders above 999 rupees
- 99 rupees shipping for orders at or below 999 rupees
- 18 percent GST
- Total equals subtotal plus shipping plus tax

The checkout button currently displays a notification stating that checkout
is ready to connect to a payment provider. There is no actual payment gateway
or order creation system yet.

Cart contents are stored locally in the browser using localStorage.


9. WISHLIST
-----------

The wishlist page uses this route:

/wishlist

Users can:

- Add products to their wishlist
- Remove products from their wishlist
- View saved products
- Add saved products to the cart
- Open product detail pages

Wishlist data is stored in localStorage, so it persists in the same browser.
It is not currently saved to the user's MongoDB account.


10. USER REGISTRATION
---------------------

The signup page uses this route:

/signup

The form accepts:

- Username
- Email address
- Password

After successful registration:

1. The frontend calls the backend signup API.
2. The user receives a success notification.
3. The user is redirected to the sign-in page.

Backend route:

POST /api/auth/signup

The current backend stores the password directly. For a production system,
passwords should be hashed using a secure password hashing library such as
bcrypt or Argon2.


11. USER SIGN-IN
----------------

The sign-in page uses this route:

/signin

The form accepts:

- Email
- Password

After successful sign-in:

1. The frontend calls the backend sign-in API.
2. The returned user data is stored in the frontend context.
3. The user is saved in localStorage.
4. The user is redirected to the profile page.

Backend route:

POST /api/auth/signin

The authentication system currently does not use:

- JWT tokens
- Sessions
- Refresh tokens
- Protected backend routes
- Role-based authorization

It currently functions as a basic login system for the storefront UI.


12. PROFILE PAGE
----------------

The profile page uses this route:

/profile

It displays:

- User initials avatar
- User name
- Account navigation
- Order history
- Purchase statistics
- Total spent
- Feedback rating
- Order statuses

The profile page currently includes two hard-coded sample orders:

- One delivered order
- One shipped order

The profile page is therefore currently a visual prototype. Order history is
not connected to MongoDB, and orders are not generated from the cart or
checkout system.

The profile sidebar contains visual links for:

- Order History
- My Profile
- Address Book
- Saved Gadgets
- Sign Out

Some of these links are placeholders and do not navigate to fully implemented
sections.


13. CONTACT AND SUPPORT PAGE
----------------------------

The contact page uses this route:

/contact

It contains:

- Support introduction
- Contact form
- First name field
- Last name field
- Email field
- Subject dropdown
- Message field
- Send Message button
- Email support information
- Phone support information
- Working hours
- Frequently Asked Questions section

FAQ topics include:

- Product authenticity
- Warranty
- Damaged deliveries
- Help choosing gadgets

The contact form currently only displays a success message in the frontend.
It does not send data to a backend or email provider.


14. FOOTER
----------

The footer contains:

- GadgetVerse logo
- Brand description
- Social media buttons
- Gadget category links
- About Us links
- Support links
- Copyright notice
- Brand slogan

Several footer links are placeholders using # and do not currently lead to
completed pages.


15. THEME SYSTEM
----------------

The site supports two themes.

LIGHT MODE

The default design uses:

- Warm cream background
- White cards
- Purple primary color
- Coral accent color
- Pink highlights
- Rounded cards
- Soft shadows

DARK MODE

Dark mode uses:

- Dark black and blue background
- Dark surface cards
- Light text
- Purple accent colors
- Subtle borders
- Stronger shadows

The selected theme is saved using this localStorage key:

theme


16. FRONTEND STATE MANAGEMENT
-----------------------------

The application uses a React Context called StoreContext.

It manages:

- Shopping cart
- Wishlist
- Logged-in user
- Toast notifications
- Cart item count
- Add-to-cart behavior
- Quantity updates
- Product removal
- Wishlist toggling
- Sign-in
- Sign-out

The following data is stored in the browser:

- gadgetverse-cart
- gadgetverse-wishlist
- gadgetverse-user
- theme

This means cart, wishlist, theme, and user information remain available after
refreshing the page in the same browser.


17. BACKEND API
---------------

HEALTH ENDPOINT

GET /api/health

Returns a simple health response for the GadgetVerse API.

AUTHENTICATION ENDPOINTS

POST /api/auth/signup
POST /api/auth/signin

CATALOG ENDPOINTS

GET /api/catalog/categories
GET /api/catalog/products
GET /api/catalog/products/:productCode

PRODUCT LIST QUERY PARAMETERS

The product endpoint supports:

- category
- featured
- sort

Examples:

/api/catalog/products?featured=true
/api/catalog/products?category=laptops
/api/catalog/products?sort=price_asc
/api/catalog/products?category=audio&sort=price_desc


18. DATABASE MODELS
-------------------

USER MODEL

User fields include:

- userName
- email
- password
- createdAt
- updatedAt

The email field is required, unique, lowercase, and trimmed.

CATEGORY MODEL

Category fields include:

- slug
- name
- description
- image
- displayOrder
- isActive
- createdAt
- updatedAt

PRODUCT MODEL

Product fields include:

- Product code
- Category
- Name
- Description
- Current price
- Original price
- Badge
- Product images
- Features
- Rating
- Review count
- Stock count
- Featured flag
- Active flag
- Created and updated timestamps


19. SEEDED CATALOG DATA
-----------------------

The current catalog contains four categories and sixteen products.

SMARTPHONES

- Nova X Pro Smartphone
- PixelEdge 9
- Core Mini 5G
- Volt Max Ultra

LAPTOPS

- AeroBook 14 Laptop
- ProForge Creator 16
- FlexiNote 2-in-1
- GameCore Ryzen 7

AUDIO

- Pulse ANC Headphones
- EchoBuds Pro
- StudioMic USB
- BassBox Go Speaker

WEARABLES

- Orbit Pro Smartwatch
- FitTrack Active Band
- Vision AR Glasses
- SyncRing Health Tracker

Each product includes:

- Price
- Original price
- Product badge
- Image
- Features
- Rating
- Review count
- Featured status
- Stock count

The seed command is:

npm run seed

Run it from the backend directory.


20. CURRENT USER EXPERIENCE FLOW
--------------------------------

A typical customer journey is:

1. The user opens the homepage.
2. The user views featured gadgets and categories.
3. The user opens a category page.
4. The user sorts products by price or featured status.
5. The user opens a product detail page.
6. The user adjusts quantity.
7. The user adds the product to the cart or wishlist.
8. The user reviews cart totals.
9. The user can create an account or sign in.
10. The user can view a profile page.
11. The user can contact customer support.


21. WHAT IS CURRENTLY FUNCTIONAL
--------------------------------

The following areas are implemented:

- React routing
- Homepage
- Category browsing
- Product listing
- Product detail pages
- Backend catalog API
- MongoDB product and category models
- Product seeding structure
- User registration API
- User login API
- Cart management
- Wishlist management
- Theme switching
- Toast notifications
- Product sorting
- Loading states
- Error states
- Empty states
- Responsive styling foundation
- Light and dark theme support

The frontend production build succeeds successfully.


22. WHAT IS CURRENTLY A PROTOTYPE OR INCOMPLETE
-----------------------------------------------

CHECKOUT

The checkout button does not process orders or payments.

Missing pieces include:

- Order model
- Checkout API
- Payment provider
- Payment confirmation
- Order creation
- Order confirmation page
- Inventory reduction

ORDER HISTORY

The profile page displays hard-coded sample orders instead of database orders.

CONTACT FORM

The contact form shows a success message but does not send data to a backend
or email provider.

NEWSLETTER

The newsletter subscription input does not save subscriber data.

QUICK VIEW

The eye icon on product cards currently has no implemented quick-view behavior.

FOOTER LINKS

Many footer links are placeholders and currently point to #.

USER AUTHENTICATION SECURITY

The current system does not yet include:

- Password hashing
- JWT authentication
- Secure sessions
- Protected profile routes
- Account verification
- Password reset
- Rate limiting

CART AND WISHLIST ACCOUNTS

Cart and wishlist information is stored only in browser storage. It is not
synchronized to the user's account or database.

PRODUCT REVIEWS

Products show ratings and review counts, but users cannot submit reviews.

INVENTORY

Stock values exist in the product model, but the application does not
currently reserve or decrement stock during checkout.


23. OVERALL ASSESSMENT
----------------------

GadgetVerse is currently a polished e-commerce storefront prototype with a
working product catalog backend and basic authentication.

Its strongest areas are:

- Attractive storefront design
- Clear product categories
- Reusable React components
- Product browsing and sorting
- Cart and wishlist behavior
- MongoDB catalog structure
- Responsive UI foundation
- Light and dark theme support

The next major development stage would be converting the prototype shopping
experience into a complete commerce platform by adding:

1. Secure authentication
2. Real checkout
3. Order management
4. Payment integration
5. Database-backed carts and wishlists
6. Contact form submission
7. Inventory management
8. Admin product management
9. Product reviews
10. Real customer account features
