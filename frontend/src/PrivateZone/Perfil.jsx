import { Box, Heading, Text } from '@chakra-ui/react';
import { useUserAuth } from '../contexto/UserContext';

const Perfil = () => {
    const { user } = useUserAuth();

    return (
        <Box maxW="800px" p={6}>
            <Heading as="h1" size="xl" mb={6}>
                Perfil de Usuario
            </Heading>

            {/* Datos Personales */}
            <Box mb={8}>
                <Text fontSize="lg" mb={2}><strong>Nombre de Usuario:</strong> {user.name} {user.firstLastName} {user.secondLastName}</Text>
                <Text fontSize="lg" mb={2}><strong>Email:</strong> {user.email}</Text>
                <Text fontSize="lg" mb={2}><strong>Créditos disponibles:</strong> {user.credits}</Text>
            </Box>

            {/* Botones para abrir modales */}

        </Box>
    );
};

export default Perfil;
