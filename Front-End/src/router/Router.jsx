import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "../layout/SiteLayout";
import StoreLayout from "../layout/StoreLayout";
import HomeSite from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Store from "../pages/store/Store";
import DashboardLayout from "../layout/DashboardLayout";
import ListAdmins from "../pages/Dashboard/ListAdmins";
import AddAdmin from "../pages/Dashboard/AddAdmin";
import DetailUtilisateur from "../pages/Dashboard/DetailUtilisateur";
import TextFillLoadingExample from "../pages/TextFillLoadingExample";
import Products from "../pages/store/Products";
import Cart from '../pages/store/Cart';
import Checkout from '../pages/store/Checkout';

import LoginForm from "../pages/store/LoginForm";
import RegisterForm from "../pages/store/RegisterForm";
import LoginPage from "../pages/Dashboard/Login";

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
import PlayerForm from "@/components/Partials/PlayerForm";
import TeamForm from "@/components/Partials/TeamForm";
import SplashScreen from "@/components/Partials/SplashScreen";
    
// Définition des chemins
// export const LOGIN = '/login';
// export const HOME = '/';
// export const ABOUT = '/about';
// export const NEWS = '/news';
// export const STORE = '/store';
// export const DASHBOARD = '/dashboard';
// export const ADMIN = '/dashboard/admins';
// export const PRODUCT = '/dashboard/products';
// export const CATEGORIES = '/dashboard/categories';
// export const SUBCATEGORIES = '/dashboard/sub-categories';
// export const ORDERS = '/dashboard/orders';




// Paths
export const LOGINSTORE = "/store/login";
export const REGISTERSTORE = "/store/register";
export const HOME = "/";
export const ABOUT = "/about";
export const NEWS = "/news";
export const STORE = "/store";
export const DASHBOARD = "/dashboard";
export const ADMIN = "/dashboard/admins";
export const PRODUCT = "/dashboard/products";
export const CATEGORIES = "/dashboard/categories";
export const SUBCATEGORIES = "/dashboard/sub-categories";
export const ORDERS = "/dashboard/orders";
export const CART = '/store/cart';
export const CHECKOUT = '/store/checkout';
export const ALLPRODUCTS = "/store/products";
export const PRODUCT_DETAIL = (id) => `/store/product-detail/${id}`;
export const PRODUCT_CREATE = "/dashboard/products/create";
export const TEXT_FILL_LOADING = "/text-fill-loading";
export const ADMIN_CREATE = "/dashboard/admins/new";
export const USER_DETAIL = "/dashboard/users";
export const PLAYERS = "/dashboard/players";
export const TEAMS = "/dashboard/teams";
export const PLAYERS_CREATE = "/dashboard/players/new";
export const PLAYERS_EDIT = (id) => `/dashboard/players/edit/${id}`;
export const TEAMS_CREATE = "/dashboard/teams/new";
export const LOGIN = "/login";

// Router config
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

            // { path: ProductsList, element: <ListeProducts /> },
             { path: PRODUCT_DETAIL(':id'), element:     <ProductDetail /> },
         
            { path: ALLPRODUCTS, element: <Products/> },
            { path: CART, element: <Cart /> },
            { path: CHECKOUT, element: <Checkout /> },
            { path: REGISTERSTORE, element: <RegisterForm /> },
            { path: LOGINSTORE, element: <LoginForm /> },
        ],
    },
    {
        element: <DashboardLayout />,
        children: [
            { path: DASHBOARD, element: <Home /> },
            { path: ADMIN_CREATE, element: <AddAdmin /> },  
            { path: ADMIN, element: <ListAdmins /> },
            { path: USER_DETAIL, element: <DetailUtilisateur /> },
            { path: PRODUCT, element: <ListProducts /> },
            { path: PRODUCT_CREATE, element: <AddProduct /> },
            { path: CATEGORIES, element: <Categories /> },
            { path: SUBCATEGORIES, element: <SubCategories /> },
            { path: ORDERS, element: <OrdersPage /> },
            { path: PLAYERS, element: <Players /> },
            { path: PLAYERS_CREATE, element: <PlayerForm /> },
            { path: PLAYERS_EDIT(":id"), element: <PlayerForm mode="edit" /> },
            { path: TEAMS, element: <Teams /> },
            { path: TEAMS_CREATE, element: <TeamForm /> },
        ],
    },
    {
        path: LOGIN, element: <LoginPage />
    }

    
    
]);
