import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente de ruta protegida
const RutaProtegida = ({ element: Element, ...rest }) => {
    //const isAuthenticated = document.cookie('token-cookie'); // Verificamos si hay un token guardado
    const isAuthenticated = true
    return isAuthenticated ? (<Element {...rest} />) : (<Navigate to="/ingreso" />)
}

export default RutaProtegida;
