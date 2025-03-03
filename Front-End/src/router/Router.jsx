import { createBrowserRouter } from "react-router-dom";
import SiteLayout from "../layout/SiteLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import StoreLayout from "../layout/StoreLayout";
import Store from "../pages/store/Store";
import LoginPage from "../pages/Dashboard/Login";

// PATHS

export const HOME = '/';
export const ABOUT = '/about';
export const NEWS = '/news';
export const STORE = '/store';
export const LOGIN = '/login';





export const router = createBrowserRouter([
    {
        element : <SiteLayout />,
        children : [
            {
                path : HOME,
                element : <Home />
            },
            {
                path :ABOUT,
                element : <About />
            },
            {
                path : NEWS ,
                element : <News />
            },
            { path: LOGIN, 
                element: <LoginPage />
            } // Ajout de la route login
        ]
    },
    {
        element : <StoreLayout />,
        children : [
            {
                path : STORE,
                element: <Store />
            }
        ]
    }
])