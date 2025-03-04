import React from "react";
// import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaClipboardList, FaUsers, FaCog } from "react-icons/fa";
// import { NavLink } from "../../../frontend/node_modules/react-router-dom/dist";
import { NavLink } from "react-router-dom"; 

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-500 text-white p-5 h-screen">
      <h1 className="text-2xl font-bold">Any-Buy</h1>
      <p className="text-xs">ELECTRONIC ECOMMERCE</p>
      <nav className="mt-5">
        <ul className="space-y-4">
          <li><NavLink to="/" className="flex items-center gap-2"><FaTachometerAlt /> Dashboard</NavLink></li>
          <li><NavLink to="/AdminOrders" className="flex items-center gap-2"><FaClipboardList /> Orders</NavLink></li>
          <li className="font-bold flex items-center gap-2"><FaBox /> Products</li>
          <li><NavLink to="/" className="flex items-center gap-2"><FaClipboardList /> Categories</NavLink></li>
          <li><NavLink to="/" className="flex items-center gap-2"><FaUsers /> Users</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
