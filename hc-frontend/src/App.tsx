// src/App.js

import React from 'react';
import './App.css';
import Header from './component/Header';

function App() {
  return (
    <div className="App">
      <Header />
      {/* Your other components/pages go here */}
    </div>
  );
}

export default App;




// import React from 'react';
// import './App.css';

// import Home from './pages/Home';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import OrderSummary from './pages/OrderSummary';
// import Payment from './pages/Payment';
// import ProductDetails from './pages/ProductDetails';
// import { Routes, Route } from 'react-router';

// const App: React.FC = () => {
//   return (
// <>
// <Header />
//     <Routes>
        
//       <Route path="/" element={<Home />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/order_summary" element={<OrderSummary />} />
//       <Route path="/payment" element={<Payment />} />
//       <Route path="/product_details" element={<ProductDetails />} />

//     </Routes>
//     </>
//   );
// }

// export default App;
