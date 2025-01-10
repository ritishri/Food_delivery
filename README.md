# Food Delivery App
 The Food Delivery App simplifies food ordering with a responsive design. Users can log in, browse the menu, add items to their cart, and place orders seamlessly. The cart retains data during navigation. Features 
 include a mobile-friendly burger menu, role-based navigation, and intuitive functionality for a smooth and enjoyable experience.

# Key Features
# User Authentication
  Users can sign up and log in using Firebase Authentication to access the app's features, ensuring a personalized experience.

# Admin Management
  Admins have the ability to manage the menu by adding, deleting, or editing food items.

# Menu Browsing
  Users can explore an extensive food menu with detailed descriptions. Each item includes an "Add to Cart" button for quick selection.

# Cart Management
 Selected items are added to a shopping cart where users can:
 View their choices.
 Adjust quantities.
 Check the subtotal.
 Cart data is preserved even when users navigate through different pages.
 Order Placement
 Users can review their cart and place an order using a QR code for payment.

# Responsive Design
 The app is fully responsive, ensuring a smooth experience across all screen sizes. On mobile devices, the navigation menu is condensed into a burger menu for easy access.

# Role-based Navigation
Depending on the user’s role, the app displays relevant navigation options:
Users: Menu, Cart, Orders
Admins: Menu Management
Secure access ensures users only see content relevant to their role.
Logout
Users can log out at any time, returning to the login page.

# Technology Stack
 Frontend: HTML, CSS, JavaScript, React
 Styling: Bootstrap
 State Management: React Hooks (useState, useEffect)
 Authentication: Firebase Authentication (for user login and sign-up)

# Installation
Clone the repository:
git clone [https://github.com/YOUR_USERNAME/food-delivery-app.git](https://github.com/ritishri/Food_delivery.git)

Navigate into the project directory:

Use terminal
Copy code
cd client

# Install dependencies:
Use terminal
Copy code
npm install

# Start the development server:
Use terminal
Copy code
npm start
Open the app in your browser at http://localhost:3000.

# Assumptions and Limitations
 This project is a frontend-only implementation; no backend or database integration is included.
 Cart and user data are stored in localStorage for demonstration purposes.
 The QR code functionality assumes external integration for payment processing.
 Firebase is used for user authentication. Users can sign up and log in to access the app's features.
