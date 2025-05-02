import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

const ProductDetails = ({product}) => {
  // Safely parse JSON strings if they exist
  const parseJsonSafely = (jsonString) => {
    if (!jsonString) return [];
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };

  const sizes = parseJsonSafely(product.sizes);
  const colors = parseJsonSafely(product.colors);
  const images = parseJsonSafely(product.images);
  
  // Add base URL to image paths
  const imagesWithBaseUrl = images.map(img => `${img}`);

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline">Details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Product Details</DrawerTitle>
          <DrawerDescription>
            View detailed information about this product
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-full mx-auto grid grid-cols-1 gap-4 p-4">
          {/* Product Images */}
          {imagesWithBaseUrl.length > 0 && (
            <div className="col-span-1">
              <h3 className="text-xl font-semibold italic underline text-gray-800 mb-2">Images</h3>
              <div className="flex flex-wrap gap-2">
                {imagesWithBaseUrl.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`Product image ${index + 1}`} 
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Basic Information */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold italic underline text-gray-800 mb-2">Basic Information</h3>
            <ul className="space-y-2">
              <li>Product Code: <span className="font-semibold italic">{product.product_code || 'N/A'}</span></li>
              <li>Name: <span className="font-semibold italic">{product.name || 'N/A'}</span></li>
              <li>Description: <span className="font-semibold italic">{product.description || 'N/A'}</span></li>
              <li>Price: <span className="font-semibold italic">${product.price || '0'}</span></li>
              <li>Quantity: <span className="font-semibold italic">{product.quantity || '0'}</span></li>
              <li>Category: <span className="font-semibold italic">{product.categorie?.name || 'N/A'}</span></li>
            </ul>
          </div>
          
          {/* Sizes and Colors */}
          {(sizes.length > 0 || colors.length > 0) && (
            <div className="col-span-1 grid grid-cols-2 gap-4">
              {sizes.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold italic underline text-gray-800 mb-2">Available Sizes</h3>
                  <ul className="flex flex-wrap gap-2">
                    {sizes.map((size, index) => (
                      <li key={index} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {colors.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold italic underline text-gray-800 mb-2">Available Colors</h3>
                  <ul className="flex flex-wrap gap-2">
                    {colors.map((color, index) => (
                      <li key={index} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {color}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDetails; 