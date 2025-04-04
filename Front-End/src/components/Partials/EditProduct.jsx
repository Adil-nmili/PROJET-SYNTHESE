import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Product from "../../../service/Product";
import Categorie from "../../../service/Categorie";

export function Editproduct({ id, onEdit }) {
  const [product, setProduct] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  const availableColors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
  ];
  const [existingImages, setExistingImages] = useState([]); // Stored images
  const [newImages, setNewImages] = useState([]); // New uploaded images
  const [newImagePreviews, setNewImagePreviews] = useState([]); // Preview new images

  ////////////////////////////////////////
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setNewImages([...newImages, ...files]);
    setNewImagePreviews([...newImagePreviews, ...previews]);
  };
  const handleRemoveExistingImage = (index) => {
    setExistingImages(existingImages.filter((img) => img !== imageUrl)); // Remove preview
  };
  const handleRemoveNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index));
  };
  const handleSizeChange = useCallback((size, event) => {
    event.preventDefault();
    setProduct((prevState) => {
      const newSizes = prevState.sizes.includes(size)
        ? prevState.sizes.filter((s) => s !== size)
        : [...prevState.sizes, size];

      return { ...prevState, sizes: newSizes };
    });
  }, []);
  const handleColorChange = useCallback((color, event) => {
    event.preventDefault();
    setProduct((prevState) => {
      const newColors = prevState.colors.includes(color)
        ? prevState.colors.filter((c) => c !== color)
        : [...prevState.colors, color];

      return { ...prevState, colors: newColors };
    });
  }, []);
  console.log(existingImages)
  ////////////////////////////////////////
  const fetchData = async () => {
    const res = await Product.getById(id);
    setProduct(res.data);
    setExistingImages(JSON.parse(res.data.images));
    Categorie.getAll().then((res) => setCategories(res.data));
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    toast
      .promise(Product.update(id, product), {
        loading: "Updating product...",
        success: (data) => {
          setIsDialogOpen(false); // Close the dialog on success
          return `Product ${data.data.name} updated successfully!`;
        },
        error: (err) => `Could not update product: ${err.message}`,
      })
      .then(() => {
        onEdit(product);
      });
  };

console.log(existingImages)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Edit</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product name:
            </Label>
            <Input
              id="name"
              value={product.name || ""}
              name="name"
              className="col-span-3"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product_code" className="text-right">
              Product code:
            </Label>
            <Input
              id="product_code"
              name="product_code"
              value={product.product_code || ""}
              className="col-span-3"
              onChange={(e) =>
                setProduct({ ...product, product_code: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              value={product.price || ""}
              className="col-span-3"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email">Product categorie:</Label>
            <Select
              onValueChange={(value) =>
                setProduct({ ...product, category_id: value })
              }
              defaultValue={product.category_id}
            >
              <SelectTrigger className=" w-[300px]">
                <SelectValue placeholder="Select a categorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories &&
                    categories.map((categorie) => (
                      <SelectItem key={categorie.id} value={categorie.id}>
                        {categorie.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 gap-1 items-center ">
            <Label htmlFor="sizes">Sizes:</Label>
            <div className="col-span-3 grid grid-cols-4 gap-1">
              {availableSizes.map((size) => (
                <Label key={size} className="flex items-center space-x-2">
                  <Checkbox
                    type="checkbox"
                    // checked={product.sizes.includes(size)}
                    onCheckedChange={(e) => handleSizeChange(size, e)}
                    className="w-4 h-4"
                  />
                  <span>{size}</span>
                </Label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1 items-center  ">
            <Label htmlFor="colors" className="col-span-1">
              colors:
            </Label>
            <div className="col-span-3 grid grid-cols-4 gap-1 ">
              {availableColors.map((color) => (
                <Label key={color} className="flex items-center space-x-2">
                  <Checkbox
                    type="checkbox"
                    // checked={product.colors.includes(color)}
                    onCheckedChange={(e) => handleColorChange(color, e)}
                    className="w-4 h-4"
                  />
                  <span>{color}</span>
                </Label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="quantity">Quantity:</Label>
            <Input
              type="number"
              name="quantity"
              placeholder="Product quantity..."
              className=" col-span-3"
              id="quantity"
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="images">Images:</Label>
            <Input
              type="file"
              name="images[]"
              className=" col-span-3"
              id="images"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center ">
            <Label htmlFor="images">Product description:</Label>
            <Textarea
              className=" col-span-3"
              placeholder="Product description..."
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              name="description"
              id="description"
            ></Textarea>
          </div>
          {/* Image Preview Section with Delete Buttons */}
          <div className="grid grid-cols-4  gap-2">
            {existingImages &&
              existingImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    // src={`http://127.0.0.1:8000/${image}`}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg shadow"
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute top-0 right-5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}


{/* http://localhost:8000/storage/product_images/7M07K52fSXHFKDA8ShDs9URITVkZRdwo7NNgg26m.jpg
http://localhost:8000/storage/product_images/7M07K52fSXHFKDA8ShDs9URITVkZRdwo7NNgg26m.jpg */}

            {/* {imagePreviews.map((src, index) => (
            <div key={index} className="relative group">
              <img src={src} alt="Preview" className="w-20 h-20 object-cover rounded-lg shadow" />
              
     
              <Button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                <X size={12} />
              </Button>
            </div>
          ))} */}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleEdit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
