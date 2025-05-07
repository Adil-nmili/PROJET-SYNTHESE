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
import { EditSubCategory } from "./EditSubCategory";
import SubCategoriesApi from "../../../service/SubCategorie";
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

const SubCategoriesTable = ({ selectedCategory }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const res = await SubCategoriesApi.getAll();
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch sub-categories:", error);
      toast.error("Failed to fetch sub-categories");
    } finally {
      setLoading(false);
    }
  };

  // Filter sub-categories by selectedCategory
  const filteredData = selectedCategory
    ? data.filter(
        sub =>
          String(sub.category_id) === String(selectedCategory) ||
          String(sub.category?.id) === String(selectedCategory)
      )
    : data;

  const handleEdit = (updateSubCategory) => {
    setData((prevSubCategories) =>
      prevSubCategories.map((subCategory) =>
        subCategory.id === updateSubCategory.id ? updateSubCategory : subCategory
      )
    );
  };

  const handleDelete = async (id) => {
    toast
      .promise(SubCategory.delete(id), {
        loading: "Deleting sub-category...",
        success: (data) => `Sub-category ${data.data.name} deleted successfully!`,
        error: (err) => `Could not delete sub-category: ${err.message}`,
      })
      .then(() => {
        setData((prevSubCategories) =>
          prevSubCategories.filter((subCategory) => subCategory.id !== id)
        );
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Table>
      <TableCaption>A list of Sub-categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Parent Category</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No sub-categories found.
            </TableCell>
          </TableRow>
        ) : (
          filteredData.map((subCategory) => (
            <motion.tr
              key={subCategory.id}
              custom={subCategory.id}
              initial="hidden"
              animate="visible"
              variants={tableVariants}
              
            >
              <TableCell className="font-medium">{subCategory.id}</TableCell>
              <TableCell>{subCategory.name}</TableCell>
              <TableCell className="dark:text-white truncate w-[200px]">{subCategory.description}</TableCell>
              <TableCell>{subCategory.category?.name}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <EditSubCategory id={subCategory.id} onEdit={handleEdit} />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this sub-category?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        this sub-category.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(subCategory.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </motion.tr>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default SubCategoriesTable; 