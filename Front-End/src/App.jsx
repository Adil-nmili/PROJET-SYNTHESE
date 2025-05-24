import "./App.css";
import { RouterProvider } from "react-router-dom"; // Importer RouterProvider
import { router } from "./router/Router"; // Importer le router
import AdminContext from "../api/context/AdminContext"; // Contexte d'admin
import { Toaster } from "react-hot-toast";
import ClientContext from "../api/context/ClientContext";
import CartProvider from "../api/context/CartContext";
import ArticleDetails from './components/Partials/ArticleDetails';

function App() {
  return (
    <AdminContext>
      <ClientContext>
        <CartProvider>
        <Toaster position="bottom-right" />
        <RouterProvider router={router} />
        </CartProvider>
      </ClientContext>
    </AdminContext>
  );
}

export default App;
