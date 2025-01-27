import React from 'react';
import './App.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import OrderSummary from './pages/OrderSummary';
import Payment from './pages/Payment';
import ProductDetails from './pages/ProductDetails';
import { Routes, Route } from 'react-router';

import Header from './component/custom/Header/Header';
import FilterSideBar from './component/custom/SideBarNavigation/FilterSideBar';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { RootState } from './redux/store';

const App: React.FC = () => {
  const isSideBarVisible = useSelector((state: RootState) => state.app.showSideBar)
  return (
    <div className='App'>
      <Header />
      <div className='flex flex-1'>
        {isSideBarVisible && <FilterSideBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order_summary" element={<OrderSummary />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
