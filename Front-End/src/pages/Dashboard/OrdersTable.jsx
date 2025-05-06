import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import toast from "react-hot-toast";
import Order from "../../../service/Order";



export default function OrdersTable() {
  const [orders, setOrders] = useState(initialOrders);

  const handleDelete = (id) => {
    toast.promise(Order.delete(id), {
      loading: "Deleting order...",
      success: (data) => ` ${data.data.message} !`,
      error: (err) => `Could not delete order: ${err.message}`,
    })
    .then(() => {
      setOrders(orders.filter((order) => order.id !== id));
    });
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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Table className="bg-white shadow-lg rounded-lg overflow-hidden">
          <TableHeader className="bg-[#552582]">
            <TableRow>
              <TableHead className="text-white">Client</TableHead>
              <TableHead className="text-white">Code Commande</TableHead>
              <TableHead className="text-white">Statut</TableHead>
              <TableHead className="text-white">Produit</TableHead>
              <TableHead className="text-white">Stock</TableHead>
              <TableHead className="text-white">Prix</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <motion.tr 
                key={order.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border-b hover:bg-gray-100 transition"
              >
                <TableCell>{order.client}</TableCell>
                <TableCell>{order.codeCommande}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>{order.codeProduit}</TableCell>
                <TableCell>{order.stock}</TableCell>
                <TableCell>{order.prix} €</TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    onClick={() => handleConfirm(order.id)}
                    className="bg-blue-500 text-white hover:bg-blue-700 transition text-sm w-[100px]"
                  >
                    Confirmer
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(order.id)}
                        > 
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}
