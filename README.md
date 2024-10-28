# REST API

This is a REST API project built with Node.js, Express, and MongoDB. It provides endpoints for user authentication, post creation, and user data retrieval.

## Project Structure

```
rest-api
├── src
│   ├── controllers
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── models
│   │   ├── postModel.js
│   │   └── userModel.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── services
│   │   ├── authService.js
│   │   └── emailService.js
│   ├── app.js
│   └── config
│       └── db.js
├── package.json
└── README.md
```

## Controllers

### `authController.js`

This controller handles authentication-related routes.

### `postController.js`

This controller handles post-related routes.

### `userController.js`

This controller handles user-related routes.

## Models

### `postModel.js`

This model defines the schema for posts in the MongoDB database. It includes fields such as title, description, imageUrl, and clothes.

### `userModel.js`

This model defines the schema for users in the MongoDB database. It includes fields such as username, email, password, age, birthDate, and profilePicture.

## Routes

### `authRoutes.js`

This file exports the routes for authentication. It includes routes for login and registration.

### `postRoutes.js`

This file exports the routes for posts. It includes a route for creating posts.

### `userRoutes.js`

This file exports the routes for users. It includes a route for retrieving user data.

## Middleware

### `authMiddleware.js`

This file exports middleware functions for authentication. It includes a function for verifying JWT tokens.

## Services

### `authService.js`

This file exports a service for authentication. It includes functions for generating JWT tokens and hashing passwords.

### `emailService.js`

This file exports a service for sending emails. It includes functions for sending email confirmations.

## Configuration

### `db.js`

This file exports the configuration for connecting to MongoDB Atlas.

## Usage

To run the project, make sure you have Node.js and MongoDB installed. Then, follow these steps:

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Start the server by running `npm start`.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more details.