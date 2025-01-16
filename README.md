# HomeCenter

## Project Setup

### 1. Initialize the Project:
- Create a new React app using `create-react-app`.
- Set up a Node.js backend with Express.

## Frontend (React.js)

### 2. Folder Structure:
- Organize your components, pages, and services.

### 3. Components:
- **Header**: Navigation bar with links to categories, search bar, login/register buttons.
- **Footer**: Contact information, social media links, etc.
- **Home Page**: Display categories and featured deals.
- **Category Page**: List items in the category with filters.
- **Product Page**: Detailed view of a single product.
- **Cart**: Display items in the cart with checkout button.
- **Checkout**: Form for shipping details and payment options.
- **Login/Register**: Forms for user authentication.
- **Order Summary**: Display order details after purchase.

### 4. State Management:
- Use Context API or Redux for managing global state (e.g., user authentication, cart items).

### 5. Routing:
- Use `react-router-dom` for navigation between pages.

### 6. Responsiveness:
- Use CSS frameworks like Bootstrap or Tailwind CSS for responsive design.

## Backend (Node.js)

### 7. API Endpoints:
- **User Authentication**: Login, register, and user profile.
- **Product Management**: CRUD operations for products.
- **Cart Management**: Add, remove, and update items in the cart.
- **Order Management**: Create and retrieve orders.
- **Payment Processing**: Integrate with payment gateways (e.g., Stripe, PayPal).

### 8. Database: OPTIONAL
- TBD

## Testing (Jest)

### 9. Unit Tests:
- Write unit tests for both frontend components and backend endpoints using Jest.

## Additional Features

### 10. Search and Filter:
- Implement search functionality and filters on the category page.

### 11. Payment System:
- Integrate multiple payment options (COD, UPI, credit card, debit card, coupons).

### 12. Deals and Offers:
- Create a system to manage and display festive/anniversary/annual deals.

### 13. Feature Toggle:
- Implement feature toggles to enable/disable features dynamically.

### 14. JIRA Tasks :
#### 14.1. Carts and Checkout Functionality
   - Task 1.1: Implement "Add to Cart" functionality.
   - Task 1.2: Implement "View Cart" functionality.
   - Task 1.3: Implement "Remove from Cart" functionality.
   - Task 1.4: Implement "Proceed to Checkout" functionality.

#### 14.2. Responsiveness
   - Task 2.1: Ensure website responsiveness for mobile devices.
   - Task 2.2: Ensure website responsiveness for tablets.
   - Task 2.3: Ensure website responsiveness for desktop devices.

#### 14.3. Search and Filter
   - Task 3.1: Implement product search functionality.
   - Task 2.2: Implement product filter by category.
   - Task 3.3: Implement product filter by price.
   - Task 3.4: Implement product filter by rating.

#### 14.4. Login and Registration
   - Task 4.1: Implement user registration functionality.
   - Task 4.2: Implement user login functionality.
   - Task 4.3: Implement user logout functionality.

#### 14.5. Payment System
   - Task 5.1: Implement payment method selection (COD, UPI, credit card, debit card).
   - Task 5.2: Implement coupon application during checkout.

#### 14.6. Order Summary
   - Task 6.1: Implement order summary view after checkout.
   - Task 6.2: Implement email confirmation of order.

#### 14.7. Festive/Anniversary/Annual Deals
   - Task 7.1: Implement display of festive deals.
   - Task 7.2: Implement display of anniversary deals.
   - Task 7.3: Implement display of annual sales deals.

#### 14.8. Feature Toggle
   - Task 8.1: Implement feature toggle functionality for enabling/disabling features dynamically.
#### 14.9. Redux implementation
- Task 8.1: Implement Redux add related packages.: Anirudh

#### 14.10 Carts and Checkout Functionality
   - Task 1.1: Create Product list component: Laksya
   - Task 1.2: Create Product Widget with details: Nikhil/Nitin.

#### 14.11 Filter management
   - Task 1.1: Create filter utility: Neha/Smriti 
   - Task 1.2: Create filter left navigation: Harshad/Ramya 



### 15. Deploy the Application:
- TBD

## Basic User Stories

### 1. Carts and Checkout Functionality
- As a user, I want to add items to my cart so that I can purchase them later.
- As a user, I want to view the items in my cart so that I can see what I am about to purchase.
- As a user, I want to remove items from my cart so that I can update my purchase list.
- As a user, I want to proceed to checkout so that I can complete my purchase.

### 2. Responsiveness
- As a user, I want the website to be responsive so that I can use it on any device (mobile, tablet, desktop).

### 3. Search and Filter
- As a user, I want to search for products so that I can find specific items quickly.
- As a user, I want to filter products by category, price, and rating so that I can narrow down my choices.

### 4. Login and Registration
- As a user, I want to register an account so that I can save my information for future purchases.
- As a user, I want to log in to my account so that I can access my saved information and order history.
- As a user, I want to log out of my account so that I can ensure my information is secure.

### 5. Payment System
- As a user, I want to choose my preferred payment method (COD, UPI, credit card, debit card, coupons) so that I can complete my purchase.
- As a user, I want to apply coupons during checkout so that I can avail discounts.

### 6. Order Summary
- As a user, I want to view an order summary after checkout so that I can confirm my purchase details.
- As a user, I want to receive an email confirmation of my order so that I have a record of my purchase.

### 7. Festive/Anniversary/Annual Deals
- As a user, I want to see special deals during festive seasons, anniversaries, and annual sales so that I can take advantage of discounts.

### 8. Feature Toggle
- As an admin, I want to enable or disable features dynamically so that I can manage the website's functionality without deploying new code.

## Application Structure

### Project Structure
```
homecentre/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── redux/
│   │   │   └── slice/store.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   └── package.json
├── .gitignore
├── README.md
└── package.json

