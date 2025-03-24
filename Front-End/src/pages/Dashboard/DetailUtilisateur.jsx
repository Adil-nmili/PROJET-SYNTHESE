import React, { useState } from "react";
import { motion } from "framer-motion"; // Pour animations

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "••••••••",
    role: "Admin",
    orders: [
      { codeCommande: "CMD123", status: "Livré", codeProduit: "PRD001", stock: 10, prix: 50 },
      { codeCommande: "CMD124", status: "En attente", codeProduit: "PRD002", stock: 5, prix: 30 },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "••••••••",
    role: "Client",
    orders: [
      { codeCommande: "CMD125", status: "Annulé", codeProduit: "PRD003", stock: 2, prix: 70 },
    ],
  },
];

export default function UsersTable() {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6  min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-black animate-pulse">
        Liste des Utilisateurs
      </h2>
      <div className="overflow-x-auto">
        <motion.table 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nom</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Mot de passe</th>
              <th className="py-3 px-4 text-left">Rôle</th>
              <th className="py-3 px-4 text-left">Commandes</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr 
                key={user.id} 
                initial={{ opacity: 20, y: 0 }}
                animate={{ opacity: 19, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.password}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      user.role === "Admin" ? "bg-purple-700" : " bg-[#8861B7]"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="py-2 px-3">Code</th>
                        <th className="py-2 px-3">Statut</th>
                        <th className="py-2 px-3">Produit</th>
                        <th className="py-2 px-3">Stock</th>
                        <th className="py-2 px-3">Prix</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.orders.map((order, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-3">{order.codeCommande}</td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-xs ${
                                order.status === "Livré"
                                  ? "bg-green-500"
                                  : order.status === "En attente"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-2 px-3">{order.codeProduit}</td>
                          <td className="py-2 px-3">{order.stock}</td>
                          <td className="py-2 px-3">{order.prix} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Supprimer
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
