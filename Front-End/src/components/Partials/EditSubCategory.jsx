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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubCategoriesApi from "../../../service/SubCategorie";
import Categorie from "../../../service/Categorie";

export function EditSubCategory({ id, onEdit }) {
  const [subCategory, setSubCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const res = await SubCategoriesApi.getById(id);
    setSubCategory(res.data);
    const categoriesRes = await Categorie.getAll();
    setCategories(categoriesRes.data);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", subCategory.name);
    formData.append("description", subCategory.description);
    formData.append("category_id", subCategory.category_id);
    if (file) {
      formData.append("image", file);
    }

    toast.promise(
      SubCategoriesApi.update(id, formData),
      {
        loading: "Updating sub-category...",
        success: (data) => {
          setIsDialogOpen(false);
          return `Sub-category ${data.data.name} updated successfully!`;
        },
        error: (err) => `Could not update sub-category: ${err.message}`,
      }
    ).then(() => {
      onEdit(subCategory);
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Edit</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit Sub-category</DialogTitle>
          <DialogDescription>
            Make changes to your sub-category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name:
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              className="col-span-3"
              value={subCategory.name || ""}
              onChange={(e) =>
                setSubCategory({ ...subCategory, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description:
            </Label>
            <Textarea
              id="description"
              name="description"
              className="col-span-3"
              value={subCategory.description || ""}
              onChange={(e) =>
                setSubCategory({ ...subCategory, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Parent Category:
            </Label>
            <Select
              onValueChange={(value) =>
                setSubCategory({ ...subCategory, category_id: value })
              }
              value={subCategory.category_id}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories &&
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Sub-category Picture:
            </Label>
            <Input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              className="col-span-3"
              onChange={handleFileChange}
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right">Current Image:</Label>
            <div className="col-span-3">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="New preview"
                  className="h-32 rounded-md object-cover"
                />
              ) : (
                subCategory.image && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/storage/${subCategory.image}`}
                    alt="Old sub-category"
                    className="h-32 rounded-md object-cover"
                  />
                )
              )}
            </div>
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