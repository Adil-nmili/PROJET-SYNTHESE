
import Headers from "../../components/Partials/Hearder";
import AdminsTable from "../../components/Partials/AdminsTable";



export default function ListAdmins() {
 
  return (
    <div className="p-6  min-h-screen">
      <Headers title={"Admins"} />
      <AdminsTable  />
    </div>
  );
}
