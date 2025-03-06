import React from "react";

const UsersTable = () => {
  const users = [
    { email: "kris@gmail.com",name:"kris", role: "user", details: "details" },
    // Add more users here
  ];

  return (
    <div className="p-10 bg-white">
      <h2 className="text-2xl font-semibold mb-5 text-center">All Users</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
