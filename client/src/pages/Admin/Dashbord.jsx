import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminOrders from "../../components/Admin/AdminOrders";
import CategoriesTable from "../../components/Admin/CategoriesTable";
import ProductTable from "../../components/Admin/ProductTable";
import Sidebar from "../../components/Admin/Sidebar";
import UsersTable from "../../components/Admin/UsersTable";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar always visible */}
      <Sidebar />
      {/* Main Content Area */}
      <main className="flex-1 p-10 bg-gray-100">
        <Routes>
          <Route path="/" element={<ProductTable />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<UsersTable />} />
          <Route path="categories" element={<CategoriesTable />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
