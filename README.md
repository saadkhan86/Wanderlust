🏡 Wanderlust

Wanderlust is a dynamic house listing web application?

🚀 Features

🏠 Browse Listings: View all available houses with images, price, and location.

➕ Add New Property: Registered users can add new listings easily.

✏️ Edit / Delete Listings: Manage your own posts with update and delete options.

🔍 Search Functionality: Find properties by title, location, or price range.

📸 Image Upload: Add property photos using Cloudinary or local storage.

👤 Authentication: Secure login and signup with Passport.js (or custom auth).

📱 Responsive UI: Built using Bootstrap / CSS for mobile-friendly layout.



---

🛠️ Tech Stack

Technology	Purpose

Node.js	Backend runtime
Express.js	Web framework
EJS	Template engine for dynamic HTML
MongoDB	Database for storing listings and users
Mongoose	ODM for MongoDB
Bootstrap / CSS	Frontend styling
Cloudinary (optional)	Image hosting and management



---

⚙️ Installation & Setup

Follow these steps to run the project locally:

# 1. Clone this repository
git clone https://github.com/saadkhan86/Wanderlust.git

# 2. Navigate to the project folder
cd Wanderlust

# 3. Install dependencies
npm install

# 4. Set up environment variables
# Create a .env file and add the following:
# MONGO_URI=your_mongodb_connection_string
# CLOUDINARY_KEY=your_cloudinary_key (optional)
# CLOUDINARY_SECRET=your_cloudinary_secret (optional)
# SESSION_SECRET=your_secret_key

# 5. Start the server
npm start

The app will be running at http://localhost:3000 🌐


---

📂 Project Structure

Wanderlust/
│
├── public/              # Static files (CSS, JS, images)
├── views/               # EJS templates
│   ├── listings/        # Pages related to listings
│   ├── users/           # Login/Signup views
│   └── partials/        # Reusable EJS components
│
├── models/              # Mongoose schemas
├── routes/              # Express routes
├── app.js               # Main application file
└── package.json         # Project metadata


---

🧠 Future Improvements

🧭 Add map integration with Leaflet or Mapbox

💬 Implement reviews and ratings system

🌍 Add multi-language support

🛒 Wishlist or favorites feature



---

📸 Preview

(Add screenshots or demo link here once deployed)
Example:



---

🤝 Contributing

Contributions are always welcome!
Feel free to open issues and submit pull requests.


---

📝 License

This project is licensed under the MIT License.


---

💡 About Wanderlust

> “Wanderlust is where your journey begins — discover beautiful stays and make every trip feel like home."
