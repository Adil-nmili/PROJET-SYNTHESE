import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Pour animations
import AdminApi from "../../../service/Admins";
import { EditAdmin } from "../../components/Partials/EditAdmin";
import { Button } from "../../components/ui/button";
import { useSonner } from "sonner";
import AdminDetails from "../../components/Partials/AdminDetails";



export default function ListAdmins() {
  const [users, setUsers] = useState();
    const sonner = useSonner();
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    AdminApi.deleteAdmin(id).then((res) => 
        sonner('success',{
            description: res.data.message
        })
    );
  };

  useEffect(() => { 
       AdminApi.getAdmin().then((res) => setUsers(res.data));
  }, []);
console.log(users)
  return (
    <div className="p-6  min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center  animate-pulse">
        List of Admins
      </h2>
      <div className="overflow-x-auto">
        <motion.table 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-w-full bg-white dark:bg-slate-950 shadow-lg rounded-lg overflow-hidden"
        >
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="py-3 px-4  text-center">MATRICULE</th>
              <th className="py-3 px-4 border-x-2 text-center">FIRST-NAME</th>
              <th className="py-3 px-4 text-center">LAST-NAME</th>
              <th className="py-3 px-4 border-x-2 text-center">E-MAIL</th>
              <th className="py-3 px-4 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
           {users && users.map((user) => (

            <tr key={user.id} className="text-center">
              <td className="py-4 px-6 border-b">{user.matricule}</td>
              <td className="py-4 px-6 border-b">{user.first_name}</td>
              <td className="py-4 px-6 border-b">{user.last_name}</td>
              <td className="py-4 px-6 border-b">{user.email}</td>
              <td className="py-4 px-6 border-b flex justify-center gap-1">
                {/* <Button variant={'outline'}>Details</Button> */}
                <AdminDetails admin={user} />
                <EditAdmin id={user.id} />
                <Button variant={'destructive'} onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
              ))}
                      
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
