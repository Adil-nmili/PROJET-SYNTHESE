import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import Hearder from "../../components/Partials/Hearder";
import Categorie from "../../../service/Categorie";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Product from "../../../service/Product";
import { toast } from "react-hot-toast";
import SubCategoriesApi from "../../../service/SubCategorie";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    product_code: generateProductCode(),
    sizes: [],
    colors: [],
    images: [],
    category_id: "",
    sousCategorie: "",
  });

  function generateProductCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const [categories, setCategories] = useState([]);
  const [sousCategorie, setSousCategories] = useState([]);
  useEffect(() => {
    Categorie.getAll().then((res) => {
      setCategories(res.data);
    });
    SubCategoriesApi.getAll().then((res) => {
      setSousCategories(res.data);
    });
  }, []);

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
  const [imagePreviews, setImagePreviews] = useState([]);
  console.log(product.images);

  const handleSizeChange = useCallback((size) => {
    event.preventDefault();
    setProduct((prevState) => {
      const newSizes = prevState.sizes.includes(size)
        ? prevState.sizes.filter((s) => s !== size)
        : [...prevState.sizes, size];

      return { ...prevState, sizes: newSizes };
    });
  }, []);
  const handleColorChange = useCallback((color) => {
    event.preventDefault();
    setProduct((prevState) => {
      const newColors = prevState.colors.includes(color)
        ? prevState.colors.filter((c) => c !== color)
        : [...prevState.colors, color];

      return { ...prevState, colors: newColors };
    });
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));

    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previewURLs]);
  };

  const handleRemoveImage = (index) => {
    setProduct((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));

    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(Product.create(product), {
      loading: "Creating product... ",
      success: (data) => {
        setProduct({
          name: "",
          description: "",
          price: 0,
          quantity: 0,
          product_code: generateProductCode(),
          sizes: [],
          colors: [],
          images: [],
          category_id: "",
          sousCategorie: "",
        });
        setImagePreviews([]);
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = '';
        }
        const categorySelect = document.querySelector('select[name="category_id"]');
        const subcategorySelect = document.querySelector('select[name="sousCategorie"]');
        if (categorySelect) categorySelect.value = '';
        if (subcategorySelect) subcategorySelect.value = '';
        
        return `Product ${data.data.name} created successfully!`;
      },
      error: (err) => `Could not create product: ${err.message}`,
    });
  };

  return (
    <div className="px-4 flex flex-col gap-4 justify-center py-4 items-center">
      <Hearder title={"Add Product"} />
      <form
        className="w-5/6 bg-white dark:bg-slate-950 border rounded-2xl p-4 grid grid-cols-2 gap-4 shadow-xl"
        enctype="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="name">Product name:</Label>
          <Input
            type="text"
            name="name"
            placeholder="Product name..."
            className=" col-span-3"
            id="name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="productCode">Product code:</Label>
          <Input
            type="text"
            name="product_code"
            value={product.product_code}
            disabled
            className="col-span-3 bg-gray-100 dark:bg-slate-900 cursor-not-allowed"
            id="productCode"
          />
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="price">Price:</Label>
          <Input
            type="number"
            name="price"
            placeholder="Product price..."
            className=" col-span-3"
            id="matricule"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="email">Product categorie:</Label>
          <Select
            onValueChange={(value) =>
              setProduct({ ...product, category_id: Number(value) })
            }
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a categorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories &&
                  categories.map((categorie) => (
                    <SelectItem
                      key={categorie.id}
                      value={categorie.id.toString()}
                    >
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
                  checked={product.sizes.includes(size)}
                  onCheckedChange={(e) => handleSizeChange(size)}
                  className="w-4 h-4"
                />
                <span>{size}</span>
              </Label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1 items-center">
          <Label htmlFor="email">Product Sub-categorie:</Label>
          <Select
            onValueChange={(value) =>
              setProduct({ ...product, sousCategorie: Number(value) })
            }
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a sub-categorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {sousCategorie &&
                  sousCategorie.map((categorie) => (
                    <SelectItem
                      key={categorie.id}
                      value={categorie.id.toString()}
                    >
                      {categorie.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
                  checked={product.colors.includes(color)}
                  onCheckedChange={(e) => handleColorChange(color)}
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
        <div className="grid grid-cols-4  gap-2">
          {imagePreviews.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg shadow"
              />

              <Button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              >
                <X size={12} />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-end col-span-2">
          <Button
            className="bg-primary dark:bg-slate-900 text-white px-4 py-2 rounded-md"
            type="submit"
          >
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
