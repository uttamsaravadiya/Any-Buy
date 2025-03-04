import React from "react";
import { Star } from "lucide-react";
import { products } from "../assets/assets";
// const products = [
//   { id: 1, name: "Smartphone Pro", price: "$999", rating: 4.5, image: "" },
//   { id: 2, name: "Ultra Laptop", price: "$1499", rating: 5, image: "product2" },
//   { id: 3, name: "Gaming Headphones", price: "$299", rating: 4.2, image: "product3" },
//   { id: 4, name: "4K Gaming Monitor", price: "$799", rating: 4.8, image: "product4" },
// ];

const FeaturedProducts = () => {
  return (
    <div className="w-full py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <div key={products.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Product Image */}
              <img src={product.image} alt={product.name}  height="50"  className="w-full  object-cover" />
              
              {/* Product Details */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-xl font-bold">{product.price}</p>

                {/* Rating */}
                <div className="flex justify-center items-center gap-1 text-yellow-500 my-2">
                  {[...Array(Math.floor(product.rating))].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  {product.rating % 1 !== 0 && <Star size={16} className="text-yellow-500 opacity-50" />}
                  <span className="text-gray-500 text-sm">({product.rating})</span>
                </div>

                {/* Full Width Button */}
                <button className="mt-3 w-full pb-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;