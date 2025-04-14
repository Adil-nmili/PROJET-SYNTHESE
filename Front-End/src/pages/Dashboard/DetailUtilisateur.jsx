import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminApi from "../../../service/Admins";
import Order from "../../../service/Order";
import { toast } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await AdminApi.getAdmin();
        
        const usersWithOrders = await Promise.all(
        response.data.filter(user => user.role === 'client').map(async (user) => {
          try {
            const ordersResponse = await Order.getUserOrders(user.id);
            return {
              ...user,
              orders: ordersResponse.data
            };
          } catch (error) {
            console.error(`Error fetching orders for user ${user.id}:`, error);
            return {
              ...user,
              orders: []
            };
          }
        })
      );
      setUsers(usersWithOrders);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
console.log(users)
  const handleDelete = async (id) => {
    try {
      await AdminApi.deleteAdmin(id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  // Calculate pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-black animate-pulse">
        Liste des Utilisateurs
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of users and their orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Commandes</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                      user.role === "admin" ? "bg-purple-500" : "bg-blue-500"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Products</TableHead>
                       
                        <TableHead>Prix Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {user.orders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            <span
                              className={`px-3 py-1 rounded-full text-white text-xs ${
                                order.status === "delivered"
                                  ? "bg-green-500"
                                  : order.status === "waiting"
                                  ? "bg-yellow-500"
                                  
                                  : "bg-red-500"
                              }`}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>{order.products.length || 'N/A'}</TableCell>
                          <TableCell>{order.total_amount != "" ?  order.total_amount : "0.00"} € </TableCell>
                        </TableRow>
                      ))}
                      {user.orders.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-500">
                            Aucune commande
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="destructive"
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? "default" : "outline"}
              onClick={() => paginate(number)}
            >
              {number}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
