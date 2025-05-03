import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "../layout/SiteLayout";
import StoreLayout from "../layout/StoreLayout";
import HomeSite from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Store from "../pages/store/Store";
import DashboardLayout from "../layout/DashboardLayout"; // Ajout du DashboardLayout
import ListAdmins from "../pages/Dashboard/ListAdmins"; // Page admin
import AddAdmin from "../pages/Dashboard/AddAdmin"; // Page ajout admin
import DetailUtilisateur from "../pages/Dashboard/DetailUtilisateur"; // Détails utilisateurs
import LoginPage from "../pages/Dashboard/Login";
import TextFillLoadingExample from "../pages/TextFillLoadingExample";

import OrdersTable from "../pages/Dashboard/OrdersTable";
import AddProduct from "../pages/Dashboard/AddProduct";
import Categories from "../pages/Dashboard/Categories";
import SubCategories from "../pages/Dashboard/SubCategories";
import ListProducts from "../pages/Dashboard/Products";
import OrdersPage from "../pages/Dashboard/OrdersPage";
import Home from "../pages/Dashboard/Home";
import Product from "../../service/Product";
import ProductDetail from "../pages/store/ProductDetail";
import Players from "../pages/Dashboard/Players";
import Teams from "../pages/Dashboard/Teams";
import PlayerForm from "../components/Partials/PlayerForm";
import TeamForm from "../components/Partials/TeamForm";
import ListeProducts from "../components/Partials/ListeProducts";
// Définition des chemins
export const LOGIN = '/login';
export const HOME = '/';
export const ABOUT = '/about';
export const NEWS = '/news';
export const STORE = '/store';
export const DASHBOARD = '/dashboard';
export const ADMIN = '/dashboard/admins';
export const PRODUCT = '/dashboard/products';
export const CATEGORIES = '/dashboard/categories';
export const SUBCATEGORIES = '/dashboard/sub-categories';
export const ORDERS = '/dashboard/orders';
export const ALLPRODUCTS = "/store/products";
export const PRODUCT_DETAIL = '/store/product-detail';
export const PRODUCT_CREATE = '/dashboard/products/create';
export const TEXT_FILL_LOADING = '/text-fill-loading';
export const ADMIN_CREATE = '/dashboard/admins/new';
export const USER_DETAIL = '/dashboard/users';
export const PLAYERS = '/dashboard/players';
export const TEAMS = '/dashboard/teams';
export const PLAYERS_CREATE = '/dashboard/players/new';
export const PLAYERS_EDIT = (id) => `/dashboard/players/edit/${id}`;
export const TEAMS_CREATE = '/dashboard/teams/new';

// Création des routes et exportation
export const router = createBrowserRouter([

    {
        element: <SiteLayout />,
        children: [
            { path: HOME, element: <HomeSite /> },
            { path: ABOUT, element: <About /> },
            { path: NEWS, element: <News /> },
            { path: TEXT_FILL_LOADING, element: <TextFillLoadingExample /> },
        ],
    },
    {
        element: <StoreLayout />,
        children: [
            { path: STORE, element: <Store /> },
            { path: `/store/products/:categoryName`, element: <ListeProducts /> },
            { path: PRODUCT_DETAIL, element: <ProductDetail /> },
            { path: ALLPRODUCTS, element: <Products/> },
        ],
    },
    {
        element: <DashboardLayout />, // Layout pour le dashboard
        children: [
            { path: DASHBOARD, element: <Home /> }, // Page principale pour admin
            { path: ADMIN_CREATE, element: <AddAdmin /> }, // Ajouter un nouvel admin
            { path: ADMIN, element: <ListAdmins /> }, // Liste des admins
            { path: USER_DETAIL, element: <DetailUtilisateur /> }, // Détails des utilisateurs
            {path: PRODUCT, element: <ListProducts />},
            {path: PRODUCT_CREATE, element: <AddProduct />},
            {path: CATEGORIES, element: <Categories />},
            {path: SUBCATEGORIES, element: <SubCategories />},
            { path: ORDERS, element: <OrdersPage /> },
            { path: PLAYERS, element: <Players /> },
            { path: PLAYERS_CREATE, element: <PlayerForm /> },
            { path: PLAYERS_EDIT(':id'), element: <PlayerForm mode="edit" /> },
            { path: TEAMS, element: <Teams /> },
            { path: TEAMS_CREATE, element: <TeamForm /> },
        ],
    },
    {
        path: LOGIN, // Route pour la page de login
        element: <LoginPage />, // Le composant Login pour cette route
    },

]);

