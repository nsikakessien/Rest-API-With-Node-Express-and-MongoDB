# REST API Node Mongo

This project is a RESTful API built with Node.js, Express, and MongoDB (using Mongoose). It provides endpoints for managing products and categories, supporting typical CRUD operations.

## Features

- **Products API**: Create, read, update, and delete products.
- **Categories API**: Create, read, update, and delete categories.
- **Validation**: Ensures required fields and valid MongoDB ObjectIds.
- **Relations**: Products are linked to categories.
- **Environment Configuration**: Uses `.env` for sensitive data like MongoDB URI.

## Project Structure

```
.
├── controllers/
│   ├── categoriesController.js
│   └── productsController.js
├── models/
│   ├── Category.js
│   └── Product.js
├── routes/
│   ├── categoryRoutes.js
│   └── productsRoute.js
├── index.js
├── .env
├── .gitIgnore
├── package.json
└── eslint.config.mjs
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with your MongoDB URI:
   ```
   MONGO_URI="your-mongodb-uri"
   ```
4. Start the server:
   ```
   npm start
   ```

The server will run on `http://localhost:3500`.

## API Endpoints

### Products

- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products (supports query by category, active, name)
- `GET /api/products/:id` - Get a product by ID
- `PUT /api/products/:id` - Update a product by ID
- `DELETE /api/products/:id` - Delete a product by ID

### Categories

- `POST /api/categories` - Create a new category
- `GET /api/categories` - Get all categories
- `PUT /api/categories/:id` - Update a category by ID
- `DELETE /api/categories/:id` - Delete a category by ID

## License

This project is licensed under the ISC License.
