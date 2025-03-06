import React from "react";

const CategoriesTable = () => {
  const categories = [
    "cameras",
    "computers",
    "headphones",
    "laptops",
    "smart phones",

  ];

  return (
    <div className="p-10 bg-gray-100 h-screen">
      <h2 className="text-2xl font-semibold text-center">All Categories</h2>
      {/* <div className="flex justify-end my-5">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          ADD NEW CATEGORY
        </button>
      </div> */}
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3">{category}</td>
              <td className="p-3 text-blue-500 cursor-pointer">details</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
