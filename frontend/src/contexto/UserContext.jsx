import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


//Creo el contexto
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});



    // Verificar si el usuario está autenticado al cargar el componente
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/usuarios/me', {
                    withCredentials: true
                }).then(response => setUser(response.data));

            } catch (error) {
                setUser(null);
                // Si falla, se asegura de que el estado sea null
            }
        };

        checkAuth();
    }, []); // Se ejecuta solo al cargar el componente

    console.log(user)

    const login = async (userData) => {

        const response = await axios.post('http://localhost:3000/api/usuarios/login', userData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })

        if (response.status === 200) {
            setUser(response.data)
            return true;
        }

        return false;

    }

    const logout = () => setUser(null)

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserAuth = () => useContext(UserContext);

