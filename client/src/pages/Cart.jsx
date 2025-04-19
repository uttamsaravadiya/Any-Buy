import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart data from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Function to update cart in local storage
  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle quantity change
  const handleQuantityChange = (id, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity =
          action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateLocalStorage(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  // Calculate total price
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <img src={`http://localhost:5000/${item.image}`} alt={item.name} className="w-20 h-20 object-contain mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                  className="px-2 py-1 bg-gray-300 text-gray-800 rounded-l"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, "increase")}
                  className="px-2 py-1 bg-gray-300 text-gray-800 rounded-r"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h3>
            <button
              onClick={() => navigate("/placeorder")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
