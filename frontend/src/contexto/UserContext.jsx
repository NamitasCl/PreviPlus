/* eslint-disable react-refresh/only-export-components */
// UserContext.js

import axios from "axios";
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado del usuario
    const [loading, setLoading] = useState(true); // Estado de carga

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/usuarios/me', {
                withCredentials: true
            });
            setUser(response.data);
        } catch (error) {
            setUser(null);
            console.log(error);
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
            const response = await axios.post('http://localhost:3000/api/usuarios/login', userData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            setUser(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false); // Termina la carga después del login
        }
    };

    const logout = async () => {
        await axios.post('http://localhost:3000/api/usuarios/logout', {}, {
            withCredentials: true,
        });
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout, checkAuth, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useUserAuth = () => useContext(UserContext);
