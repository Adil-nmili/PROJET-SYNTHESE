import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Categorie from "../../../service/Categorie";
import toast from "react-hot-toast";

const CategorieForm = () => {
  const [categorie, setCategorie] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setCategorie({ ...categorie, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!categorie.name.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    if (!categorie.image) {
      toast.error('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append("name", categorie.name);
    formData.append("description", categorie.description);
    formData.append("image", categorie.image);

    try {
      const response = await Categorie.create(formData);
      toast.success(`Category ${response.data.name} created successfully!`);
      
      // Reset form
      setCategorie({
        name: "",
        description: "",
        image: null,
      });
      setImagePreview(null);
      
      // Reload page after success
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(`Could not create category: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-4 items-center">
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          name="name"
          placeholder="Category's Name..."
          className="col-span-3"
          id="name"
          value={categorie.name}
          onChange={(e) => setCategorie({ ...categorie, name: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-4 my-4 items-center">
        <Label htmlFor="description">Description:</Label>
        <Textarea
          name="description"
          placeholder="Category's Description..."
          className="col-span-3"
          id="description"
          onChange={(e) =>
            setCategorie({ ...categorie, description: e.target.value })
          }
          value={categorie.description}
        />
      </div>
      <div className="grid grid-cols-4 my-4 items-center">
        <Label htmlFor="image">Category Picture:</Label>
        <div className="col-span-3">
          <Input
            type="file"
            name="image"
            className="mb-2"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CategorieForm;
