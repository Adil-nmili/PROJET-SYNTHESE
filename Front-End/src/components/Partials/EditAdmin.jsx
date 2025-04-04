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
import { useEffect, useState } from "react";
import AdminApi from "../../../service/Admins";
import toast from "react-hot-toast";

export function EditAdmin({ id, onEdit }) {
  const [admin, setAdmin] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  useEffect(() => {
    AdminApi.getAdminById(id).then((res) => setAdmin(res.data));
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    toast.promise(
      AdminApi.updateAdmin(id, admin),
      {
        loading: "Updating admin...",
        success: (data) => {
          setIsDialogOpen(false); // Close the dialog on success
          return `Admin ${data.data.first_name} updated successfully!`;
        },
        error: (err) => `Could not update admin: ${err.message}`,
      }
    ).then(() => {
      onEdit(admin);
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
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-right">
              First-name
            </Label>
            <Input
              id="firstname"
              value={admin.first_name || ""}
              name="first_name"
              className="col-span-3"
              onChange={(e) =>
                setAdmin({ ...admin, first_name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastname" className="text-right">
              Last-name
            </Label>
            <Input
              id="lastname"
              name="last_name"
              value={admin.last_name || ""}
              className="col-span-3"
              onChange={(e) =>
                setAdmin({ ...admin, last_name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              value={admin.email || ""}
              className="col-span-3"
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="matricule" className="text-right">
              Matricule
            </Label>
            <Input
              id="matricule"
              name="matricule"
              value={admin.matricule || ""}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={admin.phone || ""}
              className="col-span-3"
              onChange={(e) => setAdmin({ ...admin, phone: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={admin.address || ""}
              className="col-span-3"
              onChange={(e) => setAdmin({ ...admin, address: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={admin.city || ""}
              className="col-span-3"
              onChange={(e) => setAdmin({ ...admin, city: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="postal_code" className="text-right">
              ZIP code
            </Label>
            <Input
              id="postal_code"
              name="postal_code"
              value={admin.postal_code || ""}
              className="col-span-3"
              onChange={(e) =>
                setAdmin({ ...admin, postal_code: e.target.value })
              }
            />
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
