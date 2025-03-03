import { useState } from "react";

export default function Admin() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    matricule: "",
    password: "",
    confirmPassword: ""
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      

      {/* Main Content */}
      <main className="flex-1 p-10">
        

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
