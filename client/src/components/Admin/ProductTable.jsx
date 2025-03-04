import React from "react";
import { products } from "../../assets/assets";

const ProductTable = () => {
  const products = [
    { id: 1, name: "Smart phone", brand: "Samsung", stock: 0, price: "$22", image: "/phone.jpg" },
    { id: 2, name: "Smart watch", brand: "Samsung", stock: 4, price: "$64", image: "/watch.jpg" },
    { id: 3, name: "Notebook Horizon", brand: "HP", stock: 5, price: "$52", image: "/laptop.jpg" },
    { id: 4, name: "Men's Trimmer", brand: "Gillette", stock: 0, price: "$54", image: "/trimmer.jpg" },
    { id: 5, name: "Sony Bluetooth Speaker", brand: "Sony", stock: 0, price: "$100", image: "/speaker.jpg" },
  ];

  return (
    <div className="bg-white p-5 shadow-md rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left"></th>
            <th className="p-3 text-left">Product</th>
            <th className="p-3 text-left">Stock Availability</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-100">
              <td className="p-3"><input type="checkbox" /></td>
              <td className="p-3 flex items-center gap-2">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded" />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.brand}</p>
                </div>
              </td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded ${product.stock > 0 ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                  {product.stock > 0 ? "In stock" : "Out of stock"}
                </span>
              </td>
              <td className="p-3">{product.price}</td>
              <td className="p-3 text-blue-500 cursor-pointer">details</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
