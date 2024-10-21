import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../contexto/UserContext';

// Componente de ruta protegida
const RutaProtegida = ({ element: Element, ...rest }) => {

    const { user } = useUserAuth();
    const isAuthenticated = user ? true : false;

    return isAuthenticated ? (<Element {...rest} />) : (<Navigate to="/ingreso" />)
}

RutaProtegida.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default RutaProtegida;
