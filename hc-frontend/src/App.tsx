import React from 'react';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import OrderSummary from './pages/OrderSummary';
import Payment from './pages/Payment';
import ProductDetails from './pages/ProductDetails';
import { Routes, Route } from 'react-router';
import RegistrationForm from './pages/RegistrationForm';


const App: React.FC = () => {
  return (
    <div className="App">
      <h2>Home Center</h2>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/order_summary" element={<OrderSummary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product_details" element={<ProductDetails />} />
      </Routes>
      {/* Your other components/pages go here */}
    </div>
  );
}

export default App;
