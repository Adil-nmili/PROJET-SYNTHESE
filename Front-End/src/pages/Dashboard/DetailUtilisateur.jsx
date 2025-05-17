import React, { useState, useEffect } from "react";
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
import ClientApi from "../../../service/Client";

export default function ClientsTable() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Component mounted, fetching clients...");
    fetchClients();
  }, []);

  useEffect(() => {
    console.log("Search query changed:", searchQuery);
    console.log("Current clients:", clients);
    // Filter clients based on search query
    if (searchQuery.trim() === "") {
      setFilteredClients(clients);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = clients.filter(
        (client) =>
          client.first_name?.toLowerCase().includes(query) ||
          client.last_name?.toLowerCase().includes(query) ||
          client.email?.toLowerCase().includes(query)
      );
      setFilteredClients(filtered);
    }
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery, clients]);

  const fetchClients = async () => {
    try {
    
      const response = await ClientApi.getClient(); 
       setClients(response.data);
       console.log(response.data)
      setFilteredClients(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setError(error.message || "Failed to fetch clients");
      toast.error(error.message || "Failed to fetch clients");
      // Initialize with empty arrays in case of error
      setClients([]);
      setFilteredClients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting client:", id);
      await ClientApi.deleteClient(id);
      toast.success("Client deleted successfully");
      const updatedClients = clients.filter((client) => client.id !== id);
      setClients(updatedClients);
      setFilteredClients(updatedClients);
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Failed to delete client");
    }
  };

  // Calculate pagination
  const indexOfLastClient = currentPage * itemsPerPage;
  const indexOfFirstClient = indexOfLastClient - itemsPerPage;
  const currentClients = Array.isArray(filteredClients) 
    ? filteredClients.slice(indexOfFirstClient, indexOfLastClient)
    : [];
  const totalPages = Math.ceil((Array.isArray(filteredClients) ? filteredClients.length : 0) / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-6 m-5 border-1 shadow-md dark:border-slate-700 border-slate-300 rounded-md dark:bg-slate-950 bg-white">
        <div className="text-center">
          <h2 className="text-red-500 text-xl mb-4">Error Loading Clients</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Button 
            onClick={fetchClients} 
            className="mt-4"
            variant="outline"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 m-5 border-1 shadow-md dark:border-slate-700 border-slate-300 rounded-md dark:bg-slate-950 bg-white">
      <div className="flex flex-col items-start mb-4">
        <h1 className="text-black dark:text-white text-xl font-semibold">Clients List</h1>
        <p className="dark:text-gray-400 text-gray-800 text-sm">Search for a client by name or email</p>
      </div>

      {/* Search Control */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between border-b-2 border-slate-700 pb-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-transparent dark:text-white border-slate-700"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of clients and their orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {searchQuery 
                    ? "No clients match your search criteria." 
                    : "No clients found."}
                </TableCell>
              </TableRow>
            ) : (
              currentClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{`${client.first_name || ''} ${client.last_name || ''}`}</TableCell>
                  <TableCell>{client.email || 'N/A'}</TableCell>
                  <TableCell>{client.phone || 'N/A'}</TableCell>
                  <TableCell>{`${client.city || 'N/A'}, ${client.country || 'N/A'}`}</TableCell>
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
                            delete client and remove their data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(client.id)}
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
