import React, { useState, useEffect } from "react";
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
import Loading from "@/components/Partials/loading";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await AdminApi.getAdmin();
      setUsers(response.data);
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
      setFilteredUsers(usersWithOrders);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    toast.promise(AdminApi.deleteAdmin(id), {
      loading: "Deleting user...",
      success: (data) => ` ${data.data.message} !`,
      error: (err) => `Could not delete user: ${err.message}`,
    })
    .then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  // Calculate pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 m-5 border-1 shadow-md dark:border-slate-700 border-slate-300 rounded-md dark:bg-slate-950 bg-white">
      <div className="flex flex-col items-start mb-4">
      <h1 className="text-black dark:text-white text-xl font-semibold">Users List</h1>
      <p className="dark:text-gray-400 text-gray-800 text-sm">Search for a user by name or email</p>
      </div>  
      
      {/* Search Control */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between border-b-2 border-slate-700 pb-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-transparent dark:text-white border-slate-700"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {loading ? (
          <Loading />
        ) : (
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
            {currentUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {searchQuery 
                    ? "No users match your search criteria." 
                    : "No users found."}
                </TableCell>
              </TableRow>
            ) : (
              currentUsers.map((user) => (
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
                        delete client and remove his data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(user.id)}
                      > 
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        )}
      
        {/* Pagination Controls */}
        <div className={loading ? "hidden" : "flex justify-center items-center space-x-2 mt-4"}>
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
