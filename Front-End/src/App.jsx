
import "./App.css";
import { RouterProvider } from "react-router-dom"; 
import { router } from "./router/Router"; 
import AdminContext from "../api/context/AdminContext"; 
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
