# Bookstore API
The Bookstore API is a RESTful API built using Node.js, Express, and Sequelize. It allows users to manage books in a bookstore, including adding, deleting, and updating books.

## API Endpoints
The following API endpoints are available:

### Books
- GET /books: Returns all books in the database.
- GET /books/available: Returns all available books in the database.

- POST /books: Adds a new book to the database.
- PATCH /books/:id: Updates a specific book by its ID.
- DELETE /books/:id: Deletes a specific book by its ID.

### Authentication
- POST /auth/login: Authenticates a user and generates a JWT token.
- POST /auth/register: Registers a new user in the database and generates a JWT token.

### Authorization
All endpoints require a JWT token in the Authorization header to access them. The token is generated during the login process and is valid for a certain amount of time.

### Error Handling
The API returns appropriate error messages and status codes for any invalid requests.

### Database
The API uses a PostgreSQL database to store data. Sequelize is used as the ORM for database interactions.

## Installation and Setup
To run the API locally, you will need to follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using npm install.
3. Create a PostgreSQL database for the API to use.
4. Update the database configuration in the config/config.json file.
5. Run the migrations to create the database schema using npx sequelize-cli db:migrate.
6. Build application using npm build.
7. Start the API server using npm start.

## License
This project is licensed under the MIT license.
