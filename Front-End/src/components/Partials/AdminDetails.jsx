import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

const AdminDetails = ({admin}) => {

    console.log(admin)
  return (
    <Drawer>
      <DrawerTrigger >
        <Button variant="outline">Details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Admin details...</DrawerTitle>
          <DrawerDescription>
            
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-1/2 mx-auto grid grid-cols-2 gap-4 p-4">
            <div className="col-span-1">
                <h3 className="text-xl font-semibold italic underline text-gray-800">Admin</h3>
                <ul>
                    <li>Name: <span className="font-semibold italic">{admin.first_name} {admin.last_name} </span></li>
                    <li>Matricule: <span className="font-semibold italic">{admin.matricule} </span></li>
                </ul>
            </div>
            <div className="col-span-1">
                <h3 className="text-xl font-semibold italic underline text-gray-800">Contact</h3>
                <ul>
                    <li>Email: <span className="font-semibold italic">{admin.email} </span></li>
                    <li>Phone: <span className="font-semibold italic">{admin.phone} </span></li>
                </ul>
            </div>
            <div className="col-span-2">
                <h3 className="text-xl font-semibold italic underline text-gray-800">Address</h3>
                <ul>
                    <li>Country: <span className="font-semibold italic">{admin.country} </span></li>
                    <li>City: <span className="font-semibold italic">{admin.city} </span></li>
                    <li>Address: <span className="font-semibold italic">{admin.address} </span></li>
                    <li>Postal Code: <span className="font-semibold italic">{admin.postal_code} </span></li>
                </ul>
            </div>

        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AdminDetails;
