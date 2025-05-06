import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { toast } from "react-hot-toast";
import AdminApi from "../../../service/Admins";
import { EditAdmin } from "./EditAdmin";
import AdminDetails from "./AdminDetails";
import Loading from "./loading";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";
const AdminsTable = ({ allAdmins, onAdminUpdate, onAdminDelete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleDelete = async (id) => {
    try {

      await AdminApi.deleteAdmin(id);
      onAdminDelete(id);
      toast.success("Admin deleted successfully");
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error("Failed to delete admin");
    }
  };

  return (
    <Table>
      <TableCaption>A list of all admin users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Matricule</TableHead>
          <TableHead>Role</TableHead>
          
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAdmins.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell className="font-medium">
              {admin.first_name} {admin.last_name}
            </TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>{admin.matricule}</TableCell>
            <TableCell>
              {admin.role.toUpperCase()}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
               
                <AdminDetails admin={admin} />
                <EditAdmin id={admin.id} onEdit={onAdminUpdate} />
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
                        onClick={() => handleDelete(admin.id)}
                      > 
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {allAdmins.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500">
              No admins found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AdminsTable;
