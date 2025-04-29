import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Categorie from "../../../service/Categorie";



const SousCategorieForm = () => {
  const [categories, setCategories] = useState([])
    const [categorie, setCategorie] = useState({
      name: ''
    });


    
  const getCategories = async ()=> {
    await Categorie.getAll().then(response => setCategories(response.data))
  }
  useEffect(()=>{
    getCategories()
  },[])

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
      <div className="grid grid-cols-4 items-center ">
          <Label htmlFor="email">Product categorie:</Label>
          <Select
            onValueChange={(value) =>
              setProduct({ ...product, category_id: value })
            }
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

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SousCategorieForm;
