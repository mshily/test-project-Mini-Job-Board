# Job Board App

A simple job board application with a Laravel backend and a React/Vite frontend.  
Allows admins to add, list, and delete jobs (with authentication), and lets all users browse, search, filter by tags, and view job details.

## Features

- **Admin**  
  - Login protection for admin pages (/react/admin/login) 
  - Add new jobs (title, description, contact email, location, remote toggle, tags) (/react/admin/add)
  - List & delete existing jobs (/react/admin/remove)
- **Public**  
  - Browse all jobs in a responsive grid (3 per row)  
  - Search by title or tag  
  - Filter by custom tags  
  - Job detail page with full description, location, contact email, remote/onsite badge, and tags  

---

## Tech Stack

- **Backend**: PHP 8+, [Laravel](https://laravel.com/)  
- **Database**: MySQL (or compatible)  
- **Frontend**: React 18, [Vite](https://vitejs.dev/), Tailwind CSS  
- **Routing**: React Router v6  
- **Icons**: Heroicons  

---

## Prerequisites

- PHP ≥ 8.0  
- Composer  
- MySQL (or MariaDB)  
- Node.js ≥ 16  
- npm or yarn  

---

## Getting Started

### 1. Clone the repo
git clone https://github.com/your-username/job-board-app.git
cd job-board-app


# 2. Backend Setup (Laravel)

# 2.1 Copy & configure your environment file
cp .env.example .env

# 2.2 Edit `.env` and set your database and app settings:
#   APP_URL=http://127.0.0.1:8000
#   DB_CONNECTION=mysql
#   DB_HOST=127.0.0.1
#   DB_PORT=3306
#   DB_DATABASE=your_database_name
#   DB_USERNAME=your_database_user
#   DB_PASSWORD=your_database_password

# 2.3 Generate your application key
php artisan key:generate

# 2.4 Run your migrations
php artisan migrate

# 2.5 (Optional) Seed the database with demo data
php artisan db:seed

# 2.6 Start the Laravel development server
php artisan serve
# By default this will run at http://127.0.0.1:8000

