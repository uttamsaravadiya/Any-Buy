import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, Laptop, Headphones, Watch, Gamepad2 } from "lucide-react";

const categories = [
  { name: "Smartphones", icon: <Smartphone size={32} />, path: "/category/smartphones" },
  { name: "Laptops", icon: <Laptop size={32} />, path: "/category/laptops" },
  { name: "Headphones", icon: <Headphones size={32} />, path: "/category/headphones" },
  { name: "Watches", icon: <Watch size={32} />, path: "/category/watches" },
  { name: "Gaming", icon: <Gamepad2 size={32} />, path: "/category/gaming" },
];

const BrowseCategories = () => {
  return (
    <div className="w-full py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md hover:bg-gray-200 transition"
            >
              <div className="text-blue-600">{category.icon}</div>
              <span className="mt-3 text-lg font-semibold">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseCategories;