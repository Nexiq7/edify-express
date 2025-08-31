# Edify Express API

Edify is a video curation platform that allows users to create boards, collect videos, and share their curated content with others.

## Features

- **User Authentication**: Secure login with Google OAuth 2.0
- **Board Management**: Create, view, and delete boards to organize video content
- **Video Collection**: Add videos to boards via URLs
- **Social Interaction**: Like boards created by other users
- **User Profiles**: View user information and their created content
- **Content Discovery**: Browse all boards or filter by user

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with Google OAuth 2.0
- **Session Management**: Express Session
- **API Security**: CORS configuration for secure cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Google OAuth credentials

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/edify-express.git
   cd edify-express
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/edify"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   SESSION_SECRET="your-session-secret"
   PORT=4000
   HOST="localhost"
   ORIGIN="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `GET /api/v1/auth/google`: Initiate Google OAuth login
- `GET /api/v1/auth/google/callback`: Google OAuth callback
- `GET /api/v1/profile`: Get current user profile
- `GET /api/v1/logout`: Logout current user

### Users
- `POST /api/v1/users`: Create a new user
- `GET /api/v1/users`: Get all users
- `GET /api/v1/users/:userId`: Get user by ID
- `DELETE /api/v1/users/:userId`: Delete user by ID
- `GET /api/v1/users/:userId/boards`: Get boards created by a user
- `GET /api/v1/users/:userId/liked-boards`: Get boards liked by a user
- `GET /api/v1/users/:userId/likes`: Get all likes by a user

### Boards
- `GET /api/v1/boards`: Get all boards
- `POST /api/v1/boards`: Create a new board
- `GET /api/v1/boards/:boardId`: Get board by ID
- `DELETE /api/v1/boards/:boardId`: Delete board by ID
- `GET /api/v1/boards/:boardId/videos`: Get videos in a board

### Videos
- `POST /api/v1/videos`: Add a video to a board
- `DELETE /api/v1/videos/:videoId`: Remove a video from a board

### Likes
- `POST /api/v1/likes`: Like a board
- `GET /api/v1/likes/:likeId`: Get like by ID
- `DELETE /api/v1/likes/:likeId`: Unlike a board
- `GET /api/v1/likes/check/:userId/:boardId`: Check if a user liked a board

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.