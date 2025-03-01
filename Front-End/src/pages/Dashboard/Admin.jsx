import { useState } from "react";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    matricule: "",
    password: "",
    confirmPassword: ""
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="mt-5">
          <ul>
            <li className="py-2 hover:text-blue-500 cursor-pointer">Dashboard</li>
            <li className="py-2 hover:text-blue-500 cursor-pointer">Admins</li>
            <li className="py-2 hover:text-blue-500 cursor-pointer">Settings</li>
          </ul>
        </nav>
      </aside>
      

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Add New Admin</h1>
          <div className="flex items-center space-x-4">
            <span className="cursor-pointer">🔔</span>
            <span className="cursor-pointer">🔍</span>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Admin Form */}
        <div className="bg-white shadow-md p-6 rounded-lg grid grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h2 className="text-xl font-bold">Admin Information</h2>
            <p className="text-gray-600 mt-2">
              Fill in the details below to add a new admin to the system.
            </p>
          </div>
          
          {/* Right Section (Form) */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Admin Name</label>
              <input type="text" className="w-full border p-2 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full border p-2 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Matricule</label>
              <input type="text" className="w-full border p-2 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" className="w-full border p-2 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input type="password" className="w-full border p-2 rounded-md" />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
}
