# Property Management Application

This project is a Property Management Application that allows users to search for properties, scrape property data from a website, and view property details. It includes both a backend API built with Node.js and Express, and a frontend application built with Next.js and React.

## Features

### Backend
- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Property Search**: Search properties by name, city, or state.
- **Scrape Property Data**: Scrape property data from an external website.
- **CRUD Operations**: Create, read, update, and delete properties.

### Frontend
- **User Authentication**: Login and authentication handling.
- **Property Search**: Search for properties and display results.
- **Scrape Property Data**: Input search terms to scrape property data.
- **Responsive Design**: A responsive UI using Tailwind CSS.

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MySQL database

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/property-management.git
   cd property-management/backend
Install dependencies:

```bash
npm install
```
3. Set up environment variables:
Create a .env file in the backend directory with the following content:

```bash
env
PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=mysql://user:password@localhost:3306/property_management
```
4. Run database migrations:

```bash
npm run typeorm migration:run
```
5. Start the backend server:

```bash
npm run dev
```
The backend server will be running on http://localhost:5000.

## Frontend Setup
1. Navigate to the frontend directory:

```bash
cd ../frontend
```
2. Install dependencies:

```bash
npm install
```
3. Set up environment variables:
Create a .env.local file in the frontend directory with the following content:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
Start the frontend server:
```
```bash
npm run dev
```
The frontend server will be running on http://localhost:3000.

## Usage
## Backend Endpoints
### Authentication

- POST /api/auth/login: User login.
- POST /api/auth/register: User registration.
Properties

- GET /api/properties: Search properties.
- GET /api/properties/:id: Get property by ID.
- POST /api/properties: Create a new property.
- POST /api/properties/scrape: Scrape property data.

## Frontend Features
- Login Page: User login form.
- Home Page: Search properties and display results.
- Scrape Properties: Input search terms to scrape property data.
-Property Details: View detailed information about a property.

## Acknowledgements
- puppeteer for web scraping.
- Next.js for the frontend framework.
- TypeORM for the ORM.
- Tailwind CSS for styling.