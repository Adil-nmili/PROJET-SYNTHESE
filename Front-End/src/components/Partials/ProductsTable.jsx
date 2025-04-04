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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Product from "../../../service/Product";
import { Editproduct } from "./EditProduct";
// import { Editproduct } from "./EditProduct";

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.3 },
  }),
};

const ProductsTable = () => {
  const [products, setProduct] = useState([]);

  // Fetch admins when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await Product.getAll();
      setProduct(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (id) => {
    toast
      .promise(Product.delete(id), {
        loading: "Deleting product...",
        success: (data) =>
          `Product ${data.data.name} deleted successfully!`,
        error: (err) => `Could not delete product: ${err.message}`,
      })
      .then(() => {
        setProduct((prevProduct) =>
          prevProduct.filter((product) => product.id !== id)
        );
      });
  };

  const handleEdit = (updateProduct) => {
    // Update the state with the modified admin
    setProduct((updateProduct) =>
      prevProduct.map((product) =>
        product.id === updateProduct.id ? updateProduct : product
      )
    );
  };

  return (
    <Table className="mt-4 w-full lg:w-[800px] mx-auto">
      <TableCaption>A list of Products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product code</TableHead>
          <TableHead>Product name</TableHead>
          <TableHead>Product description</TableHead>
          <TableHead>Categorie</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No product found.
            </TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <motion.tr
              key={product.id}
              custom={product.id}
              initial="hidden"
              animate="visible"
              variants={tableVariants}
            >
              <TableCell className="font-medium">{product.product_code}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.categorie?.name}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <productDetails product={product} />
                <Editproduct id={product.id} onEdit={handleEdit} />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
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

export default ProductsTable;
