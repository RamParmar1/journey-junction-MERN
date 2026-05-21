# 🌍 TravelVista
TravelVista is a premium, full-stack travel booking application designed with modern aesthetics, offering scalable performance and robust security. It provides a seamless user experience for discovering, exploring, and booking dream vacations.
---
## 🛠️ Tech Stack
### Frontend
- **React.js**: For building interactive and dynamic user interfaces.
- **React Router**: Seamless client-side routing.
- **Vanilla CSS3**: Custom-crafted, mobile-responsive, modern styling with glassmorphism and smooth animations.
- **Axios**: For making secure API requests to the backend.
### Backend
- **Node.js & Express.js**: Fast and scalable server architecture.
- **MongoDB & Mongoose**: Flexible NoSQL database for managing users, trips, and bookings.
- **JWT (JSON Web Tokens)**: Secure user authentication and authorization.
- **BcryptJS**: Strong password hashing.
- **Security Middlewares**: `helmet`, `express-rate-limit`, `express-mongo-sanitize`, and `hpp` to protect against common web vulnerabilities.
---
## 🚀 Website Flow
Here is how users and administrators interact with TravelVista:
### 👤 User Journey
1. **🏠 Landing & Exploration**: Users land on a beautiful hero page. They can browse through featured travel packages.
2. **🔑 Authentication**: To book a trip, the user signs up (📝) or logs in (🔐). Secure JWT tokens keep them authenticated.
3. **🔍 Discover**: Users click on a travel package to view rich details, high-quality images, pricing, and itineraries.
4. **✈️ Booking**: Clicking "Book Now" confirms the trip. The application seamlessly records the transaction in the database.
5. **🧳 My Bookings & Profile**: Users can visit their dashboard to view upcoming trips (📅), check statuses, or update their personal profile (⚙️).
### 🛡️ Admin Experience
1. **🚪 Admin Access**: Users with the `admin` role get access to an exclusive Admin Dashboard.
2. **👥 Manage Users**: Admins can view, edit, or remove registered users.
3. **🗺️ Manage Trips**: Admins have full CRUD (Create, Read, Update, Delete) capabilities to launch new packages or update existing ones.
4. **📊 Booking Oversight**: Admins can oversee all user bookings, confirming payments and managing statuses.
---
## 💻 Running the Project Locally
### 1. Clone & Setup
Clone the repository, then install dependencies for both the frontend and backend:
```bash
# In the backend directory
npm install
# In the frontend directory
npm install
```
### 2. Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### 3. Start the Servers
You can run the backend and frontend concurrently or in separate terminals.
```bash
# Start Backend
cd backend
npm run dev
# Start Frontend
cd frontend
npm start
```
---
*Built with ❤️ for travelers everywhere.*
#