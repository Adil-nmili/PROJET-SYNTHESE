import { createContext, useContext, useEffect, useState } from "react";
import ClientApi from "../../service/Client";

export const StateContext = createContext({
    client: null,
    authenticated: false,
    setClient: () => {},
    logout: () => {},
    login: (payload) => {},
    setAuthenticated: () => {},
    
});

export default function ClientContext({ children }) {
    const [client, _setClient] = useState(() => {
        const storedClient = localStorage.getItem("CLIENT");
        return storedClient ? JSON.parse(storedClient) : {};
    });

    const [authenticated, _setAuthenticated] = useState(() => {
        return localStorage.getItem("AUTHENTICATEDCLIENT") === "true";
    });

    const login = async (payload) => {
        await ClientApi.getCSRFToken();
        return ClientApi.login(payload);
    };

    useEffect(() => {
        if (Object.keys(client).length === 0) {
            setAuthenticated(false);
        } else {
            setAuthenticated(true); 
        }
    }, [client]);

    const setClient = (client) => {
        _setClient(client);
        localStorage.setItem("CLIENT", JSON.stringify(client));
    };

   const logout = () => {
        setClient({});
        setAuthenticated(false);
        localStorage.removeItem("CLIENT");
        localStorage.removeItem("AUTHENTICATEDCLIENT");
        localStorage.removeItem("token");
        localStorage.removeItem("CSRF_TOKEN");

    };

    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        localStorage.setItem("AUTHENTICATEDCLIENT", isAuthenticated);
    };

    return (
        <StateContext.Provider
            value={{
                client,
                setClient,
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

export const useClientContext = () => useContext(StateContext);
