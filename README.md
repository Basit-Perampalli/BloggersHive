Blog Application
This project is a simple blog application built using Django for the backend and React for the frontend. Users can register, log in, create blog posts, edit them, and delete them. The application also supports token-based authentication.

Features
User registration and login with token-based authentication
Create, edit, and delete blog posts
View all blog posts or user-specific blog posts
Load more blogs as the user scrolls
Tech Stack
Backend: Django, Django REST Framework, PostgreSQL
Frontend: React
Authentication: JWT (JSON Web Token)

Installation
1. Clone the Repository
git clone https://github.com/your-username/blog-app.git
cd blog-app

2. Backend Setup
a. Install Backend Dependencies
pip install -r requirements.txt

b. Update Database Configuration
In settings.py, update the DATABASES setting to use PostgreSQL:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

c. Apply Migrations
python manage.py makemigrations
python manage.py migrate

python manage.py runserver

3. Frontend Setup
a. Navigate to the Frontend Directory
cd frontend

b. Install Frontend Dependencies
npm install

c. Start the React Development Server
npm start

4. Running the Application
The Django backend should be running on http://localhost:8000
The React frontend should be running on http://localhost:3000
API Endpoints

Authentication
POST /auth/register/ - Register a new user
POST /auth/login/ - Log in and receive an authentication token
Blogs
GET /blog/getblogs - Get all blogs
GET /blog/getuserblogs/ - Get blogs created by the authenticated user
POST /blog/create/ - Create a new blog (requires authentication)
PUT /blog/update/<id>/ - Update an existing blog (requires authentication)
DELETE /blog/delete/<id>/ - Delete an existing blog (requires authentication)
Using the Application
Register

To register a new user, send a POST request to /register/ with the following JSON body:

json
{
  "username": "your_username",
  "password": "your_password",
  "email": "your_email@example.com"
}

Login
To log in, send a POST request to /login/ with the following JSON body:
json
{
  "username": "your_username",
  "password": "your_password"
}
The response will include an access token which should be stored in session storage for subsequent requests.

Create a Blog
To create a new blog post, send a POST request to /blog/create/ with the following JSON body:

json
Copy code
{
  "title": "Your Blog Title",
  "content": "Your blog content goes here"
}