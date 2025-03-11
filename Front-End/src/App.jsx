import "./App.css";
import DashboardLayout from "./layout/DashboardLayout";

import Login from "./pages/Dashboard/Login";
import DetailUtilisateur from "./pages/Dashboard/DetailUtilisateur";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminContext from "../api/context/AdminContext";
import ListAdmins from "./pages/Dashboard/ListAdmins";
import AddAdmin from "./pages/Dashboard/AddAdmin";
function App() {
  return (
    <AdminContext>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard/admins" element={<ListAdmins />} />
            <Route path="/dashboard/admins/new" element={<AddAdmin />} />
            {/* <Route path="/dashboard/products" element={<Admin />} /> */}
            {/* <Route path="/dashboard/products/new" element={<Admin />} /> */}
            <Route path="/dashboard/users" element={<DetailUtilisateur />} />
            {/* <Route path="/dashboard/orders" element={<Admin />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminContext>
  );
}

export default App;
