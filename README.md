# Blog-api
A simple RESTful Blog API built with Node.js, Express, MongoDB, and Mongoose.
Demonstrates backend fundamentals such as authentication, authorization, data modeling, filtering, pagination, validation, and clean API design.

This API allows users to:

Register and log in using JWT authentication

Create, update, delete, and retrieve blog posts

Generate unique slugs for posts from their titles

Filter and search posts by title, content, tags, author, and status

Enforce proper authorization (only authors can modify their posts)

Allow public access to published posts while protecting drafts

Setup Instructions (Run Locally)

1️⃣ Clone the repository
git clone https://github.com/your-username/blog-api.git
cd blog-api
2️⃣ Install dependencies
npm install
3️⃣ Create environment variables
Create a .env file in the root directory (use .env.example as reference):
4️⃣ Start the server
npm run dev

postman documentation: https://documenter.getpostman.com/view/22736436/2sBXc8q4io