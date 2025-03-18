// import { createBrowserRouter } from "react-router-dom";
// import SiteLayout from "../layout/SiteLayout";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import News from "../pages/News";
// import StoreLayout from "../layout/StoreLayout";
// import Store from "../pages/store/Store";
// import Orders from "../pages/Dashboard/Orders";



// // PATHS

// export const HOME = '/';
// export const ABOUT = '/about';
// export const NEWS = '/news';
// export const STORE = '/store';




// export const router = createBrowserRouter([
//     {
//         element : <SiteLayout />,
//         children : [
//             {
//                 path : HOME,
//                 element : <Home />
//             },
//             {
//                 path :ABOUT,
//                 element : <About />
//             },
//             {
//                 path : NEWS ,
//                 element : <News />
//             }
//         ]
//     },
//     {
//         element : <StoreLayout />,
//         children : [
//             {
//                 path : STORE,
//                 element: <Store />
//             }
//         ]
//     }
// ])

import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "../layout/SiteLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import StoreLayout from "../layout/StoreLayout";
import Store from "../pages/store/Store";
import DashboardLayout from "../layout/DashboardLayout"; // Ajout du DashboardLayout
import ListAdmins from "../pages/Dashboard/ListAdmins"; // Page admin
import AddAdmin from "../pages/Dashboard/AddAdmin"; // Page ajout admin
import DetailUtilisateur from "../pages/Dashboard/DetailUtilisateur"; // Détails utilisateurs
import LoginPage from "../pages/Dashboard/Login";

// Définition des chemins
export const LOGIN='/login';
export const HOME = '/';
export const ABOUT = '/about';
export const NEWS = '/news';
export const STORE = '/store';
export const DASHBOARD = '/dashboard';
export const ADMIN = '/dashboard/admins';

// Création des routes et exportation
export const router = createBrowserRouter([
    {
        path: LOGIN, // Route pour la page de login
        element: <LoginPage />, // Le composant Login pour cette route
    },
    {
        element: <SiteLayout />,
        children: [
            { path: HOME, element: <Home /> },
            { path: ABOUT, element: <About /> },
            { path: NEWS, element: <News /> },
        ],
    },
    {
        element: <StoreLayout />,
        children: [
            { path: STORE, element: <Store /> },
        ],
    },
    {
        element: <DashboardLayout />, // Layout pour le dashboard
        children: [
            { path: DASHBOARD, element: <ListAdmins /> }, // Page principale pour admin
            { path: `${ADMIN}/new`, element: <AddAdmin /> }, // Ajouter un nouvel admin
            { path: `${ADMIN}`, element: <ListAdmins /> }, // Liste des admins
            { path: "/dashboard/users", element: <DetailUtilisateur /> }, // Détails des utilisateurs
        ],
    },
 
]);

