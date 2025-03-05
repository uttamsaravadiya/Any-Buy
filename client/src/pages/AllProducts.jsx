import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    minRating: "",
    condition: "",
    sort: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    fetchProducts();
  }, [category, searchQuery, appliedFilters]);

  const fetchProducts = async () => {
    try {
      let url = "http://localhost:5000/api/products/filter?";

      if (searchQuery) {
        url += `query=${searchQuery}&`;
      }
      if (category) {
        url += `category=${category}&`;
      }
      if (appliedFilters.minPrice) {
        url += `minPrice=${appliedFilters.minPrice}&`;
      }
      if (appliedFilters.maxPrice) {
        url += `maxPrice=${appliedFilters.maxPrice}&`;
      }
      if (appliedFilters.minRating) {
        url += `minRating=${appliedFilters.minRating}&`;
      }
      if (appliedFilters.condition) {
        url += `condition=${appliedFilters.condition}&`;
      }
      if (appliedFilters.sort) {
        url += `sort=${appliedFilters.sort}&`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again.");
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  return (
    <div className="flex p-6 bg-gray-100 min-h-screen">
      {/* Filters */}
      <div className="w-1/4 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold">Filters</h2>

        <div className="mt-4">
          <label className="font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={(e) => {
              setFilters({ ...filters, category: e.target.value });
              navigate(
                e.target.value ? `?category=${e.target.value}` : "/allproducts"
              );
            }}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All</option>
            <option value="laptop">Laptop</option>
            <option value="smartwatch">Smartwatch</option>
            <option value="phone">Phone</option>
            <option value="headphones">Headphones</option>
            <option value="home-appliances">Home Appliances</option>
            <option value="gaming-accessories">Gaming Accessories</option>
            <option value="television">Television</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="font-medium text-gray-700">Price Range</label>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg mt-2"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg mt-2"
          />
        </div>

        <div className="mt-4">
          <label className="font-medium text-gray-700">Minimum Ratings</label>
          <input
            type="number"
            name="minRating"
            min="0"
            max="5"
            placeholder="Min Rating"
            value={filters.minRating}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label className="font-medium text-gray-700">Condition</label>
          <select
            name="condition"
            value={filters.condition}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All</option>
            <option value="advance">Advance</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="font-medium text-gray-700">Sort By</label>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* **Apply Filters Button** */}
        <button
          onClick={applyFilters}
          className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </div>

      <div className="w-3/4 ml-6">
        <h2 className="text-2xl font-bold text-center">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : category
            ? category.toUpperCase()
            : "All Products"}
        </h2>

        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-yellow-500">⭐ {product.rating}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
