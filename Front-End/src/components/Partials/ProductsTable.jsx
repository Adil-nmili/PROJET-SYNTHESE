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
import ProductDetails from "./ProductDetails";
import { Loading } from "../ui/loading";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculate pagination when products change
  useEffect(() => {
    setTotalPages(Math.ceil(products.length / itemsPerPage));
  }, [products, itemsPerPage]);

  const fetchProducts = async () => {
    try {
      const res = await Product.getAll();
      setProduct(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
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
    // Update the state with the modified product
    setProduct((prevProduct) =>
      prevProduct.map((product) =>
        product.id === updateProduct.id ? updateProduct : product
      )
    );
  };

  // Get current products for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center">
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
          {currentProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No Products found.
              </TableCell>
            </TableRow>
          ) : (
            currentProducts.map((product) => (
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
                  <ProductDetails product={product} />
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
              className="w-10 h-10"
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
    </div>
  );
};

export default ProductsTable;
