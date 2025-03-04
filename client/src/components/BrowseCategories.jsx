import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrowseCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        
        // Extract unique categories from products
        const categorySet = new Set(data.map((product) => product.category));
        const categoryList = Array.from(categorySet).map((category) => ({
          name: category,
          path: `/category/${category.toLowerCase()}`,
        }));
        
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
              <span className="mt-3 text-lg font-semibold">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseCategories;
