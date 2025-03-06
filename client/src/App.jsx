import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import { AuthProvider } from './context/AuthContext';
import ProductListSection from'./pages/ProductListSection';
import Dashbord from'./pages/Admin/Dashbord';
import AllProducts from './pages/AllProducts';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product" element={<ProductListSection/>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path='/admin/*' element={<Dashbord/>}/>
          <Route path='/allproducts' element={<AllProducts/>}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
