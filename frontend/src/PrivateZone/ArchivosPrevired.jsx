import { Badge, Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUserAuth } from '../contexto/UserContext';
import CobroArchivoPrevired from './CobroArchivoPrevired';

// Componente que lista los negocios del usuario con la acción de generar archivos Previred
const DashboardNegocios = () => {
    const { user } = useUserAuth();
    const [negocios, setNegocios] = useState([]);
    const buttonBgColor = useColorModeValue('teal.500', 'teal.300');
    const buttonTextColor = useColorModeValue('white', 'gray.800');
    const badgeActiveColor = useColorModeValue('green', 'green');
    const badgeInactiveColor = useColorModeValue('red', 'red');
    const tableBgColor = useColorModeValue('gray.50', 'gray.800');
    const tableTextColor = useColorModeValue('gray.900', 'gray.50');

    console.log(user)
    useEffect(() => {
        const fetchNegocios = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/negocios/${user.id}`, { withCredentials: true });
                setNegocios(response.data);
            } catch (error) {
                console.error('Error al obtener los negocios:', error);
            }
        };

        if (user && user.id) fetchNegocios();
    }, [user]);

    const generarArchivoPrevired = async (idNegocio) => {
        // Lógica para generar archivos Previred por negocio
        console.log(`Generar archivo Previred para el negocio con ID: ${idNegocio}`);
        await axios.post('http://localhost:3000/api/archprev/generate', { idNegocio, userId: user.id }, { withCredentials: true })
        .then(response => console.log("Archivo Previred generado exitosamente:", response.data))
        .catch(error => console.error("Error al generar Archivo Previred:", error));
    };

    return (
        <Box p={5}>
            <Flex justifyContent={'space-between'} mb={6}>
                <Heading as="h2" size="lg" color={tableTextColor}>
                    Archivos Previred
                </Heading>
            </Flex>

            <CobroArchivoPrevired />

            <TableContainer>
                <Table size={'lg'} variant="simple" colorScheme='blue' bg={tableBgColor}>
                    <Thead>
                        <Tr>
                            <Th color={tableTextColor}>RUT</Th>
                            <Th color={tableTextColor}>Nombre</Th>
                            <Th color={tableTextColor}>Dirección</Th>
                            <Th color={tableTextColor}>Estado</Th>
                            <Th color={tableTextColor}>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {negocios && negocios.map(negocio => {
                            if (negocio.isActive) {
                                return (
                                    <Tr key={negocio.id}>
                                        <Td>{negocio.rut}</Td>
                                        <Td>{negocio.negocioName}</Td>
                                        <Td>{negocio.address}</Td>
                                        <Td>
                                            {negocio.isActive ? (
                                                <Badge px={2} borderRadius={5} variant={'solid'} colorScheme={badgeActiveColor}>
                                                    Activa
                                                </Badge>
                                            ) : (
                                                <Badge px={2} borderRadius={5} variant={'solid'} colorScheme={badgeInactiveColor}>
                                                    Inactiva
                                                </Badge>
                                            )}
                                        </Td>
                                        <Td>
                                            {
                                                parseInt(user.credits,10) === 0 ? (
                                                    <Button
                                                        colorScheme="teal"
                                                        size="sm"
                                                        bg={buttonBgColor}
                                                        color={buttonTextColor}
                                                        onClick={() => generarArchivoPrevired(negocio.id)}
                                                    >
                                                        Generar Archivos Previred
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        colorScheme="teal"
                                                        size="sm"
                                                        bg={buttonBgColor}
                                                        color={buttonTextColor}
                                                        onClick={() => generarArchivoPrevired(negocio.id)}
                                                        disabled={true}
                                                    >
                                                        Generar Archivos Previred
                                                    </Button>
                                                )
                                            }
                                        </Td>
                                    </Tr>
                                )
                            }
                        }

                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DashboardNegocios;
