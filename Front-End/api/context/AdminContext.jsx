import { createContext, useContext, useEffect, useState } from "react";
import LoginApi from "../../service/LoginApi";

export const StateContext = createContext({
    admin: null,
    authenticated: false,
    setAdmin: () => {},
    logout: () => {},
    login: (payload) => {},
    setAuthenticated: () => {},
});

export default function AdminContext({ children }) {
    const [admin, _setAdmin] = useState(() => {
        const storedAdmin = localStorage.getItem("ADMIN");
        return storedAdmin ? JSON.parse(storedAdmin) : {};
    });

    const [authenticated, _setAuthenticated] = useState(() => {
        return localStorage.getItem("AUTHENTICATED") === "true";
    });

    const login = async (payload) => {
        await LoginApi.getCSRFToken();
        return LoginApi.login(payload);
    };

    useEffect(() => {
        if (Object.keys(admin).length === 0) {
            setAuthenticated(false);
        } else {
            setAuthenticated(true);
        }
    }, [admin]);

    const setAdmin = (admin) => {
        _setAdmin(admin);
        localStorage.setItem("ADMIN", JSON.stringify(admin));
    };

    const logout = () => {
        setAdmin({});
        setAuthenticated(false);
    };

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        localStorage.setItem("AUTHENTICATED", isAuthenticated);
    };

    return (
        <StateContext.Provider
            value={{
                admin,
                setAdmin,
                login,
                logout,
                authenticated,
                setAuthenticated,
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export const useAdminContext = () => useContext(StateContext);
