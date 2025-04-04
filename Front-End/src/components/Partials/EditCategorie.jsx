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
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  useEffect(() => {
    Categorie.getById(id).then((res) => setCategory(res.data));
  }, [id]);
  console.log(category)

  const handleEdit = (e) => {
    e.preventDefault();
    toast.promise(
      Categorie.update(id, category),
      {
        loading: "Updating admin...",
        success: (data) => {
          setIsDialogOpen(false); // Close the dialog on success
          return `Categorie ${data.data.name} updated successfully!`;
        },
        error: (err) => `Could not update categorie: ${err.message}`,
      }
    ).then(() => {
      onEdit(category);
    })
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Edit</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-right">
              First-name
            </Label>
            <Input
              id="firstname"
              value={category.name || ""}
              name="first_name"
              className="col-span-3"
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              First-name
            </Label>
            <Textarea 
              id="description"
              name="description"
              className="col-span-3"
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
            >
              {category.description || ""}  
            </Textarea>
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
