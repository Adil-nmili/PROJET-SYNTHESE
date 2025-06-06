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
  import { EditCategorie } from "./EditCategorie";
  import { useEffect, useState } from "react";
  import toast from "react-hot-toast";
  import Alert from "./Alert";
  import { Loading } from "../ui/loading";
  import { motion } from "framer-motion";
import SubCategories from "../../../service/SubCategorie";
  
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.3 },
    }),
  };
  
  const SousCategoriesTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = async () => {
      try {
        const res = await SubCategories.getAll();
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
            <TableHead>Description</TableHead>
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
                className="border border-gray-300"
              >
                <TableCell className="font-medium">{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
              
                <TableCell className="flex justify-end gap-2">
                  <EditCategorie id={category.id} onEdit={handleEdit} />
                  <Button
                    variant={"destructive"}
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                  <Alert id={category.id} />
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    );
  };
  
  export default SousCategoriesTable;
  