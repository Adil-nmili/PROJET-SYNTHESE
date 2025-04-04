import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import AdminApi from "../../../service/Admins";
import { toast } from "react-hot-toast";
import AdminsTable from "../../components/Partials/AdminsTable";

export default function ListAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await AdminApi.getAdmin();
      setAdmins(response.data.filter(admin => admin.role === "admin"));
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  // Filter admins based on search query
  const filteredAdmins = admins.filter(admin =>
    (admin.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     admin.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     admin.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     admin.matricule?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate pagination
  const indexOfLastAdmin = currentPage * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle admin updates from the AdminsTable component
  const handleAdminUpdate = (updatedAdmin) => {
    setAdmins(admins.map(admin => 
      admin.id === updatedAdmin.id ? updatedAdmin : admin
    ));
  };

  // Handle admin deletion from the AdminsTable component
  const handleAdminDelete = (id) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admins Management</CardTitle>
          <CardDescription>
            Manage your admin users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Search admins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button asChild>
              <Link to="/dashboard/admins/new">Add New Admin</Link>
            </Button>
          </div>

          {/* Pass the current admins to the AdminsTable component */}
          <AdminsTable 
            allAdmins={currentAdmins} 
            onAdminUpdate={handleAdminUpdate}
            onAdminDelete={handleAdminDelete}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
