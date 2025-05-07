import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import SubCategoriesApi from "../../../service/SubCategorie";
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
import toast from "react-hot-toast";

const SubCategoryForm = () => {
  const [subCategory, setSubCategory] = useState({
    name: "",
    description: "",
    image: null,
    category_id: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Categorie.getAll().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", subCategory.name);
    formData.append("description", subCategory.description);
    formData.append("category_id", Number(subCategory.category_id)); // Convert to number here
    if (subCategory.image) {
      formData.append("image", subCategory.image);
    }

    const state = toast.promise(SubCategoriesApi.create(formData), {
      loading: "Creating sub-category...",
      success: (data) => `Sub-category ${data.data.name} created successfully!`,
      error: (err) => `Could not create sub-category: ${err.message}`,
    });

    await state.then((res) => {
      if (res.statusText === "OK") {
        setSubCategory({
          name: "",
          description: "",
          image: null,
          category_id: "",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-4 items-center">
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          name="name"
          placeholder="Sub-category's Name..."
          className="col-span-3"
          id="name"
          value={subCategory.name}
          onChange={(e) =>
            setSubCategory({ ...subCategory, name: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-4 my-4 items-center">
        <Label htmlFor="description">Description:</Label>
        <Textarea
          name="description"
          placeholder="Sub-category's Description..."
          className="col-span-3"
          id="description"
          value={subCategory.description}
          onChange={(e) =>
            setSubCategory({ ...subCategory, description: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-4 my-4 items-center">
        <Label htmlFor="category">Parent Category:</Label>
        <Select
          value={subCategory.category_id}
          onValueChange={(value) =>
            setSubCategory({ ...subCategory, category_id: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue className="capitalize" placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id.toString()}
                  className="capitalize"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 my-4 items-center">
        <Label htmlFor="image">Sub-category Picture:</Label>
        <Input
          type="file"
          name="image"
          className="col-span-3"
          id="image"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setSubCategory({ ...subCategory, image: e.target.files[0] });
            }
          }}
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SubCategoryForm;
