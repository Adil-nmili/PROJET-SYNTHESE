
import "./App.css";
import { RouterProvider } from "react-router-dom"; // Importer RouterProvider
import { router } from "./router/Router"; // Importer le router
import AdminContext from "../api/context/AdminContext"; // Contexte d'admin
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AdminContext>
      <Toaster  position="bottom-right" />
      <RouterProvider router={router} />
    </AdminContext>
  );
}

export default App;
