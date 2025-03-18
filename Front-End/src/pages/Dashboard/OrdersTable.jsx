import React, { useState } from "react";
import { motion } from "framer-motion";

const generateOrders = (count) => {
  const clients = ["Joumana", "Nouhaila", "Adil"];
  const produits = ["PRD001", "PRD002", "PRD003", "PRD004", "PRD005"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    codeCommande: `CMD${100 + i}`,
    status: ["Livré", "En attente", "Annulé"][i % 3],
    codeProduit: produits[i % produits.length],
    stock: Math.floor(Math.random() * 20) + 1,
    prix: Math.floor(Math.random() * 100) + 10,
    client: clients[i % clients.length],
  }));
};

const initialOrders = generateOrders(10);

export default function OrdersTable() {
  const [orders, setOrders] = useState(initialOrders);

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleConfirm = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Livré" } : order
      )
    );
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-black animate-pulse">
        Liste des Commandes
      </h2>
      <div className="overflow-x-auto">
        <motion.table 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <thead className="bg-[#552582] text-white">
            <tr>
              <th className="py-3 px-4 text-left text-black">Client</th>
              <th className="py-3 px-4 text-left text-black">Code Commande</th>
              <th className="py-3 px-4 text-left text-black">Statut</th>
              <th className="py-3 px-4 text-left text-black">Produit</th>
              <th className="py-3 px-4 text-left text-black">Stock</th>
              <th className="py-3 px-4 text-left text-black">Prix</th>
              <th className="py-3 px-4 text-left text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <motion.tr 
                key={order.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-3 px-4 text-black">{order.client}</td>
                <td className="py-3 px-4 text-black">{order.codeCommande}</td>
                <td className="py-3 px-4 text-black">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-bold min-w-[100px] text-center inline-block ${
                      order.status === "Livré"
                        ? "bg-green-500"
                        : order.status === "En attente"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-black">{order.codeProduit}</td>
                <td className="py-3 px-4 text-black">{order.stock}</td>
                <td className="py-3 px-4 text-black">{order.prix} €</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => handleConfirm(order.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm w-[100px]"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm w-[100px]"
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
