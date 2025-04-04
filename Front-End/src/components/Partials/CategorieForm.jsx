import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Categorie from "../../../service/Categorie";
import toast from "react-hot-toast";



const CategorieForm = () => {

    const [categorie, setCategorie] = useState({
      name: '',
      description: '',
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      toast.promise(
         Categorie.create(categorie),
        {
          loading: 'Creating categorie...',
          success: (data) => `Categorie ${data.data.name} created successfully!`,
          error: (err) => `Could not create categorie: ${err.message}`,
        }
       );
    };
     
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 items-center ">
        <Label htmlFor="name">Name:</Label>
        <Input
          type="text"
          name="name"
          placeholder="Categorie's Name..."
          className=" col-span-3"
          id="name"
          onChange={(e) => setCategorie({ ...categorie, name: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-4 my-4 items-center ">
        <Label htmlFor="description">Description:</Label>
        <Textarea name="description" placeholder="Categorie's Description..." className=" col-span-3"  id="description" onChange={(e) => setCategorie({ ...categorie, description: e.target.value })} ></Textarea>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CategorieForm;
