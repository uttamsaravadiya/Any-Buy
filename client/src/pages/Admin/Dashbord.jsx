import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Navbar";
import ProductTable from "../../components/Admin/ProductTable";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        {/* <Navbar /> */}
        <div className="flex justify-end my-5">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">ADD NEW PRODUCT</button>
        </div>
        <ProductTable />
      </main>
    </div>
  );
};

export default Dashboard;
