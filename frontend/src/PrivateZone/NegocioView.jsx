import { Badge, Box, Button, Divider, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa'; // Importamos el ícono
import TrabajadoresList from './TrabajadoresNegocioList';

export default function NegocioView(props) {
    const { id, rut, name, address, is_active } = props.negocio;
    const back = props.back;

    return (
        <Box
            p={6}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'lg'}
            borderRadius="md"
            maxW="100%"
            mx="auto"

        >
            {/* Encabezado de la sección */}
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Heading as="h2" size="lg" fontWeight="bold" color={useColorModeValue('blue.600', 'blue.300')}>
                    Detalles del Negocio
                </Heading>
                <Button
                    onClick={() => back(null)}
                    leftIcon={<FaArrowLeft />}
                    colorScheme="blue"
                    variant="outline"
                >
                    Volver
                </Button>
            </Flex>

            {/* Información del negocio */}
            <Stack spacing={4}>
                <Flex>
                    <Text fontWeight="bold" mr={2}>RUT:</Text>
                    <Text>{rut}</Text>
                </Flex>
                <Flex>
                    <Text fontWeight="bold" mr={2}>Nombre:</Text>
                    <Text>{name}</Text>
                </Flex>
                <Flex>
                    <Text fontWeight="bold" mr={2}>Dirección:</Text>
                    <Text>{address}</Text>
                </Flex>
                <Flex>
                    <Text fontWeight="bold" mr={2}>Estado:</Text>
                    <Badge colorScheme={is_active ? 'green' : 'red'}>
                        {is_active ? 'Activa' : 'Inactiva'}
                    </Badge>
                </Flex>
            </Stack>

            {/* Separador */}
            <Divider my={6} />

            {/* Lista de trabajadores */}
            <TrabajadoresList negocioId={id} />
        </Box>
    );
}

NegocioView.propTypes = {
    negocio: PropTypes.object.isRequired,
    back: PropTypes.func.isRequired
};