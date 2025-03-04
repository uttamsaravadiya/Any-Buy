import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart, FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { products } from "../assets/assets"; // Adjust the path as needed

const ProductDetailSection = () => {
  const { id } = useParams(); // Get product id from the URL (e.g., /product/1)
  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);
  const navigate = useNavigate();

  // If product not found, display a message.
  if (!product) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        Product not found.
      </div>
    );
  }

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (val > 0) setQuantity(val);
  };

  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating - fullStars > 0;

  const handleAddToCart = () => {
    // Retrieve current cart from localStorage or initialize an empty array
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add the current product with the selected quantity
    currentCart.push({ ...product, quantity });
    localStorage.setItem("cart", JSON.stringify(currentCart));
    // Optionally, show a toast or alert that the product was added
    // For example, using react-toastify:
    // toast.success("Product added to cart!");
    // Do not call navigate() here so the user remains on the same page.
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Top Section: Product Info */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Column: Product Image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={product.image[0]}
            alt={product.name}
            className="max-w-full h-auto object-cover rounded shadow-md"
          />
        </div>

        {/* Right Column: Product Details */}
        <div className="md:w-1/2">
          <div className="mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-500">
                {Array.from({ length: fullStars }).map((_, i) => (
                  <FaStar key={i} />
                ))}
                {hasHalfStar && <FaStar className="half-star" />}
              </div>
              <span className="text-gray-600">(8 reviews)</span>
            </div>
          </div>
          <p className="text-2xl text-gray-800 font-semibold mt-4">
            ${product.price}
          </p>
          <p className="text-gray-600 mt-2">
            Availability:{" "}
            <span
              className={`font-medium ${
                product.countInStock && product.countInStock > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {product.countInStock && product.countInStock > 0
                ? "In stock"
                : "Out of stock"}
            </span>
          </p>
          <div className="mt-4">
            <label className="block mb-1 text-gray-700 font-medium">
              Quantity:
            </label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 p-2 border rounded"
              min="1"
            />
          </div>
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Buy Now
            </button>
            <button className="flex items-center gap-2 text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition">
              <FaHeart className="text-red-500" />
              Add to Wishlist
            </button>
          </div>
          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <p>
              SKU: <span className="font-medium">{product.id}</span>
            </p>
            <p>
              Brand: <span className="font-medium">Brand Name</span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-medium">Share:</span>
              <FaFacebookF className="cursor-pointer hover:text-blue-600" />
              <FaTwitter className="cursor-pointer hover:text-blue-400" />
              <FaInstagram className="cursor-pointer hover:text-pink-600" />
              <FaYoutube className="cursor-pointer hover:text-red-600" />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <img
              src="/images/flag-usa.png"
              alt="USA"
              className="w-6 h-4 object-cover"
            />
            <img
              src="/images/flag-germany.png"
              alt="Germany"
              className="w-6 h-4 object-cover"
            />
            <img
              src="/images/flag-uk.png"
              alt="UK"
              className="w-6 h-4 object-cover"
            />
            <img
              src="/images/flag-france.png"
              alt="France"
              className="w-6 h-4 object-cover"
            />
          </div>
        </div>
      </div>
      {/* Tabs: Description / Additional Info */}
      <div className="mt-10">
        <ul className="flex border-b text-gray-600">
          <li className="mr-8 pb-2 border-b-2 border-blue-600 text-blue-600 font-medium cursor-pointer">
            Description
          </li>
          <li className="pb-2 border-b-2 border-transparent hover:border-blue-600 cursor-pointer">
            Additional info
          </li>
        </ul>
        <div className="mt-4">
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSection;
