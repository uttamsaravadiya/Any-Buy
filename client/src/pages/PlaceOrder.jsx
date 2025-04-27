import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    giftOption: false,
    billingSame: true,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 1) grab cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // 2) build Stripe line items (price in cents, INR)
    const items = cart.map((item) => {
      const priceInCents = !isNaN(item.price)
        ? Math.round(item.price * 100)
        : 0;

      return {
        name: item.name,
        amount: priceInCents, // price in paisa
        quantity: item.quantity,
        currency: "inr", // Currency set to INR
      };
    });

    // Check if any item has an invalid price
    if (items.some((item) => item.amount === 0)) {
      setError("One or more items have invalid prices.");
      return;
    }

    try {
      // 3) call backend to create Checkout Session
      const { data } = await axios.post(
        "http://localhost:5000/api/payments/create-checkout-session", // API URL
        { items }
      );

      // 4) redirect browser to Stripe Checkout
      window.location.assign(data.url);
    } catch (err) {
      const msg =
        err.response?.data?.error || err.response?.data?.details || err.message;
      console.error("Checkout session error:", msg);
      setError(msg);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Gift Option */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="giftOption"
            checked={formData.giftOption}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <label className="ml-2 text-gray-700">This order is a gift</label>
        </div>

        {/* Delivery Address */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <input
            type="text"
            name="company"
            placeholder="Company (Optional)"
            value={formData.company}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-2"
            required
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, Suite, etc. (Optional)"
            value={formData.apartment}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-2"
          />
          <div className="grid grid-cols-3 gap-4 mt-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-2"
            required
          />
        </div>

        {/* Billing Address */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="billingSame"
            checked={formData.billingSame}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <label className="ml-2 text-gray-700">Use as billing address</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
