import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Category from './pages/Category'
import Login from './pages/Login'
import Cart from './pages/Cart'
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
