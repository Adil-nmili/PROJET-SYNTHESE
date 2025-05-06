import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { EditCategorie } from "./EditCategorie";
import Categorie from "../../../service/Categorie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./loading";
import { motion } from "framer-motion";

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.3 },
  }),
};

const CategoriesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await Categorie.getAll();
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (updateCategorie) => {
    setData((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updateCategorie.id ? updateCategorie : category
      )
    );
  };

  const handleDelete = async (id) => {
    toast
      .promise(Categorie.delete(id), {
        loading: "Deleting categorie...",
        success: (data) => `Categorie ${data.data.name} deleted successfully!`,
        error: (err) => `Could not delete categorie: ${err.message}`,
      })
      .then(() => {
        setData((prevCategories) =>
          prevCategories.filter((categorie) => categorie.id !== id)
        );
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Table>
      <TableCaption>A list of Categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="truncate">Description</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length == 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center ">
              No categories founded.
            </TableCell>
          </TableRow>
        ) : (
          data.map((category) => (
            <motion.tr
              key={category.id}
              custom={category.id}
              initial="hidden"
              animate="visible"
              variants={tableVariants}
             
            >
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <EditCategorie id={category.id} onEdit={handleEdit} />
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
                        onClick={() => handleDelete(category.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {/* <Alert id={category.id} /> */}
              </TableCell>
            </motion.tr>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CategoriesTable;
