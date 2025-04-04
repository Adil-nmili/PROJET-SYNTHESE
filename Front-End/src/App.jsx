// import "./App.css";
// import DashboardLayout from "./layout/DashboardLayout";

// import Login from "./pages/Dashboard/Login";
// import DetailUtilisateur from "./pages/Dashboard/DetailUtilisateur";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AdminContext from "../api/context/AdminContext";
// import ListAdmins from "./pages/Dashboard/ListAdmins";
// import AddAdmin from "./pages/Dashboard/AddAdmin";
// import { router } from "./router/Router";
// function App() {
//   return (
//     <AdminContext>
//       <BrowserRouter router={router}>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<DashboardLayout />}>
//             <Route path="/dashboard/admins" element={<ListAdmins />} />
//             <Route path="/dashboard/admins/new" element={<AddAdmin />} />
//             {/* <Route path="/dashboard/products" element={<Admin />} /> */}
//             {/* <Route path="/dashboard/products/new" element={<Admin />} /> */}
//             <Route path="/dashboard/users" element={<DetailUtilisateur />} />
//             {/* <Route path="/dashboard/orders" element={<Admin />} /> */}
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </AdminContext>
//   );
// }

// export default App;
import "./App.css";
import { RouterProvider } from "react-router-dom"; // Importer RouterProvider
import { router } from "./router/Router"; // Importer le router
import AdminContext from "../api/context/AdminContext"; // Contexte d'admin
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AdminContext>
      <Toaster  position="bottom-right" />
      {/* Utiliser RouterProvider pour appliquer le router */}
      <RouterProvider router={router} />
    </AdminContext>
  );
}

export default App;
