// RutaProtegida.js

import { Center, Flex, Spinner } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../contexto/UserContext';

const RutaProtegida = ({ element: Element, ...rest }) => {
    const { user, loading } = useUserAuth();

    if (loading) {
        // Mientras se verifica la autenticación, no mostramos nada o mostramos un indicador de carga
        return (
            <Flex w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Center>
                    <Spinner size={'2xl'} />
                </Center>
            </Flex>
        ) // O puedes retornar un componente de carga, como un spinner
    }

    const isAuthenticated = user ? true : false;

    return isAuthenticated ? (<Element {...rest} />) : (<Navigate to="/ingreso" />);
};

RutaProtegida.propTypes = {
    element: PropTypes.elementType.isRequired,
};

export default RutaProtegida;
