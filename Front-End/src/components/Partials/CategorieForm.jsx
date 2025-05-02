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

  const handleSubmit = async (e) => {
    const formData = new FormData();

    formData.append("name", categorie.name);
    formData.append("description", categorie.description);
    formData.append("image", categorie.image);

    e.preventDefault();
    const state = toast.promise(Categorie.create(formData), {
      loading: "Creating categorie...",
      success: (data) => `Categorie ${data.data.name} created successfully!`,
      error: (err) => `Could not create categorie: ${err.message}`,
    });

    await state.then((res) => {
      if (res.statusText === "OK") {
        setCategorie({
          name: "",
          description: "",
          image: null,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-4 items-center ">
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          name="name"
          placeholder="Categorie's Name..."
          className=" col-span-3"
          id="name"
          value={categorie.name}
          onChange={(e) => setCategorie({ ...categorie, name: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-4 my-4 items-center ">
        <Label htmlFor="description">Description:</Label>
        <Textarea
          name="description"
          placeholder="Categorie's Description..."
          className=" col-span-3"
          id="description"
          onChange={(e) =>
            setCategorie({ ...categorie, description: e.target.value })
          }
          value={categorie.description}
        ></Textarea>
      </div>
      <div className="grid grid-cols-4 my-4 items-center ">
        <Label htmlFor="image">Categorie Picture:</Label>
        <Input
          type="file"
          name="image"
          className=" col-span-3"
          id="image"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setCategorie({ ...categorie, image: e.target.files[0] });
            }
          }}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CategorieForm;
