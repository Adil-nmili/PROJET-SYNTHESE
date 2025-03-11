import { useState } from "react";


const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, client: "Jomana", total: 120, status: "En cours" },
    { id: 2, client: "Adil", total: 250, status: "Livré" },
    { id: 3, client: "Nouhaila", total: 80, status: "Annulé" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette commande ?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const handleDetails = (order) => {
    alert(`Détails de la commande:\nClient: ${order.client}\nTotal: ${order.total}€\nStatut: ${order.status}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Commandes</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Client</th>
              <th className="p-2 border">Total (€)</th>
              <th className="p-2 border">Statut</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.client}</td>
                <td className="p-2 border">{order.total}€</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDetails(order)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2"
                  >
                    Détails
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Supprimé
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
