import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import ProductTable from "../../components/Admin/ProductTable";
import AdminOrders from "../../components/Admin/AdminOrders";
import UsersTable from "../../components/Admin/UsersTable";
import CategoriesTable from "../../components/Admin/CategoriesTable";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-10 bg-gray-100">
        <Routes>
          {/* Default admin dashboard view - Shows Product Table */}
          <Route path="/" element={
            <>
              <ProductTable />
            </>
          } />
          
          {/* Orders Page */}
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<UsersTable/>}/>
          <Route path="categories" element={<CategoriesTable/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
