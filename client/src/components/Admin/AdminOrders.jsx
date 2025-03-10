import React from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const AdminOrders = () => {
  const orders = [
    {
      id: "#243b99f6-aa35-472d-8487-0a4f29909430",
      status: "Processing",
      subtotal: "$1564",
      date: "Sat Jun 08 2024",
    },
  ];

  return (
    <div className="flex h-screen">
      
      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All Orders</h2>
          <div className="flex items-center gap-4">
            <FaBell className="text-xl" />
            <img
              src="/randomuser.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <button className="text-blue-500">Log Out</button>
          </div>
        </div>

        {/* Orders Table */}
        <table className="w-full bg-white mt-5 shadow-md rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Subtotal</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{order.id}</td>
                <td className="p-3">
                  <span className="bg-green-200 text-green-700 px-2 py-1 rounded">{order.status}</span>
                </td>
                <td className="p-3">{order.subtotal}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3 text-blue-500 cursor-pointer">Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminOrders;
