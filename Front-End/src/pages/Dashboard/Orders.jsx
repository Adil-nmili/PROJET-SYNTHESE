import { useState, useEffect } from "react";

const Orders = () => {
  console.log("Orders component rendu !");  

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    const fetchedOrders = [
      { id: 1, client: "Jomana", total: 120, status: "En cours" },
      { id: 2, client: "Adil", total: 250, status: "Livré" },
      { id: 3, client: "Nouhaila", total: 80, status: "Annulé" },
    ];
    setOrders(fetchedOrders);
  }, []);

  return (
    <div>
      <h1>Commandes</h1>
      {orders.length === 0 ? (
        <p>Aucune commande disponible.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.client} - {order.total}€ - {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
