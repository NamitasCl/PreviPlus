/* eslint-disable react-refresh/only-export-components */
// UserContext.js

import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

// Obtén la URL base desde las variables de entorno
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "/api"; // Valor predeterminado en caso de que no esté definido

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado del usuario
    const [loading, setLoading] = useState(true); // Estado de carga

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/usuarios/me`, {
                withCredentials: true, // Incluye cookies para autenticación
            });
            setUser(response.data);
        } catch (error) {
            setUser(null);
            console.error("Error verificando autenticación:", error);
        } finally {
            setLoading(false); // Indicamos que la carga ha terminado
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (userData) => {
        setLoading(true); // Iniciamos la carga
        try {
            const response = await axios.post(`${BASE_URL}/usuarios/login`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setUser(response.data);
            console.log("Usuario autenticado:", response.data);
        } catch (error) {
            console.error("Error durante el login:", error);
            throw error;
        } finally {
            setLoading(false); // Termina la carga después del login
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${BASE_URL}/usuarios/logout`, {}, {
                withCredentials: true,
            });
            setUser(null);
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout, checkAuth, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useUserAuth = () => useContext(UserContext);