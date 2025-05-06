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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Categorie from "../../../service/Categorie";

export function EditCategorie({ id, onEdit }) {
  const [category, setCategory] = useState({});
  const [file, setFile] = useState(null); // For the newly uploaded file
  const [previewImage, setPreviewImage] = useState(""); // To preview new image
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    Categorie.getById(id).then((res) => setCategory(res.data));
  }, [id]);

  console.log(file);
  console.log(previewImage)

  const handleEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (file) {
      formData.append("image", file);
    }

    toast.promise(
      Categorie.update(id, formData),
      {
        loading: "Updating category...",
        success: (data) => {
          setIsDialogOpen(false);
          return `Category ${data.data.name} updated successfully!`;
        },
        error: (err) => `Could not update category: ${err.message}`,
      }
    ).then(() => {
      onEdit(category);
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewImage(URL.createObjectURL(selectedFile)); // create preview URL
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Edit</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to your category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name:
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              className="col-span-3"
              value={category.name || ""}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description:
            </Label>
            <Textarea
              id="description"
              name="description"
              className="col-span-3"
              value={category.description || ""}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            />
          </div>

          {/* Image Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Category Picture:
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

          {/* Image Preview Section */}
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
                category.image && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/storage/${category.image}`}
                    alt="Old category"
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
