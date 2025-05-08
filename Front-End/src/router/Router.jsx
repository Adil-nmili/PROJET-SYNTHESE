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
import LoginPage from "../pages/Dashboard/Login";
import TextFillLoadingExample from "../pages/TextFillLoadingExample";
import ListeProducts from "../components/Partials/ListeProducts";
import Products from "../pages/store/Products";
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
import SplashScreen from "../components/Partials/SplashScreen";
import ProductDetails2 from "../components/Partials/ProductDetails2";

// 👇 Les formulaires login/register
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

// Paths
export const LOGIN = "/login";
export const REGISTER = "/register";
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
            { path: PRODUCT_DETAIL(":id"), element: <ProductDetails2 /> },
            { path: ALLPRODUCTS, element: <Products /> },
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
        path: LOGIN, element: <LoginForm />
    },
    { path: REGISTER, element: <RegisterForm /> },
]);
