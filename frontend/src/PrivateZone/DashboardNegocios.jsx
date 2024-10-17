import { Badge, Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

const negociosData = [
    { id: 1, rut_empresa: '76123456-7', nombre: 'Negocio A', direccion: 'Calle Falsa 123', isActive: true },
    { id: 2, rut_empresa: '77123456-7', nombre: 'Negocio B', direccion: 'Avenida Siempreviva 742', isActive: false },
    { id: 3, rut_empresa: '78123456-7', nombre: 'Negocio C', direccion: 'Calle los Olivos 10', isActive: true }
];

// Componente que lista los negocios del usuario
const DashboardNegocio = () => {
    return (
        <Box p={5}>
            <Flex justifyContent={'space-between'}>
                <Heading as="h2" size="lg" mb={5}>
                    Mis Negocios
                </Heading>
                <Button variant={'solid'} colorScheme='blue'>
                    Añadir negocio
                </Button>
            </Flex>
            <TableContainer>
                <Table size={'lg'} variant="simple" colorScheme='blue' maxWidth="100%">
                    <Thead>
                        <Tr>
                            <Th>RUT</Th>
                            <Th>Nombre</Th>
                            <Th>Dirección</Th>
                            <Th>Activa</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {negociosData.map(negocio => (
                            <Tr key={negocio.id}>
                                <Td>{negocio.rut_empresa}</Td>
                                <Td>{negocio.nombre}</Td>
                                <Td>{negocio.direccion}</Td>
                                <Td>{negocio.isActive ? <Badge px={2} borderRadius={5} variant={'solid'} colorScheme='green'>Activa</Badge> : <Badge px={2} borderRadius={5} variant={'solid'} colorScheme='red'>Inactiva</Badge>}</Td>
                                <Td>
                                    <Button colorScheme="blue" size="sm" mr={2} onClick={() => onView(negocio.id)}>
                                        Ver
                                    </Button>
                                    <Button colorScheme="yellow" size="sm" mr={2} onClick={() => onEdit(negocio.id)}>
                                        Editar
                                    </Button>
                                    <Button colorScheme="red" size="sm" onClick={() => onDelete(negocio.id)}>
                                        Borrar
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DashboardNegocio;
