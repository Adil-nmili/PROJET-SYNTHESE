import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import AdminDetails from "./AdminDetails";
import { EditAdmin } from "./EditAdmin";
import { useEffect, useState } from "react";
import AdminApi from "../../../service/Admins";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.3 },
  }),
};

const AdminsTable = () => {
  const [admins, setAdmins] = useState([]);

  // Fetch admins when the component mounts
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await AdminApi.getAdmin();
      setAdmins(res.data);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    }
  };

  const handleDelete = async (id) => {
    toast
      .promise(AdminApi.deleteAdmin(id), {
        loading: "Deleting admin...",
        success: (data) =>
          `Admin ${data.data.first_name} deleted successfully!`,
        error: (err) => `Could not delete admin: ${err.message}`,
      })
      .then(() => {
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin.id !== id)
        );
      });
  };

  const handleEdit = (updatedAdmin) => {
    // Update the state with the modified admin
    setAdmins((prevAdmins) =>
      prevAdmins.map((admin) =>
        admin.id === updatedAdmin.id ? updatedAdmin : admin
      )
    );
  };

  return (
    <Table className="mt-4 w-full lg:w-[800px] mx-auto">
      <TableCaption>A list of Admins.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#ID</TableHead>
          <TableHead>Firstname</TableHead>
          <TableHead>Lastname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No Admins found.
            </TableCell>
          </TableRow>
        ) : (
          admins.map((admin) => (
            <motion.tr
              key={admin.id}
              custom={admin.id}
              initial="hidden"
              animate="visible"
              variants={tableVariants}
            >
              <TableCell className="font-medium">{admin.matricule}</TableCell>
              <TableCell>{admin.first_name}</TableCell>
              <TableCell>{admin.last_name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <AdminDetails admin={admin} />
                <EditAdmin id={admin.id} onEdit={handleEdit} />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(admin.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </motion.tr>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AdminsTable;
