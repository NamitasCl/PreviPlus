import {
    Avatar,
    Box,
    Flex,
    Heading,
    IconButton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr,
    useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import AddTrabajador from './AddTrabajador';

const TrabajadoresList = ({ negocioId }) => {

    const [trabajadores, setTrabajadores] = useState([]);
    // Usa useColorModeValue en el nivel superior del componente
    const bgColorThead = useColorModeValue('gray.200', 'gray.700');
    const bgColorHover = useColorModeValue('gray.50', 'gray.800');

    useEffect(() => {
        const fetchTrabajadores = async () => {
            await axios.get(`http://localhost:3000/api/trabajadores/business/${negocioId}`)
                .then(response => setTrabajadores(response.data))
                .catch(error => {
                    console.error(error);
                });

        }
        fetchTrabajadores();
    }, [negocioId])

    const onView = () => { }
    const onEdit = () => { }
    const onDelete = () => { }

    const handleTrabajadorAdded = (newTrabajador) => {
        setTrabajadores(prevTrabajadores => [...prevTrabajadores, newTrabajador]);
    };

    return (
        <Box
            p={5}
            borderRadius="md"
            maxW="100%"
            mx="auto"
            mt={5}
        >
            <Flex justifyContent={'space-between'} alignItems="center" mb={5}>
                <Heading as="h2" size="lg" fontWeight="bold">
                    Trabajadores del Negocio
                </Heading>
                <AddTrabajador negocioId={negocioId} onTrabajadorAdded={handleTrabajadorAdded} />
            </Flex>

            <TableContainer borderRadius="md" boxShadow="md">
                <Table size="md" variant="simple" colorScheme="blue">
                    <Thead bg={bgColorThead}>
                        <Tr>
                            <Th>Avatar</Th>
                            <Th>Nombre</Th>
                            <Th>RUT</Th>
                            <Th isNumeric>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {trabajadores && trabajadores.map((trabajador) => (
                            <Tr key={trabajador.id} _hover={{ bg: bgColorHover }}>
                                <Td>
                                    <Avatar name={`${trabajador.names} ${trabajador.patlastname} ${trabajador.matlastname}`} size="sm" src={trabajador.avatar} />
                                </Td>
                                <Td>
                                    <Text fontWeight="semibold">{`${trabajador.names} ${trabajador.patlastname} ${trabajador.matlastname}`}</Text>
                                    <Text fontSize="sm" color="gray.500">{trabajador.email}</Text>
                                </Td>
                                <Td>{`${trabajador.rut}-${trabajador.dv}`}</Td>
                                <Td isNumeric>
                                    <Tooltip label="Ver detalles" aria-label="Ver detalles">
                                        <IconButton
                                            icon={<FaEye />}
                                            size="sm"
                                            colorScheme="blue"
                                            mr={2}
                                            onClick={() => onView(trabajador.id)}
                                            aria-label="Ver"
                                        />
                                    </Tooltip>
                                    <Tooltip label="Editar trabajador" aria-label="Editar trabajador">
                                        <IconButton
                                            icon={<FaEdit />}
                                            size="sm"
                                            colorScheme="yellow"
                                            mr={2}
                                            onClick={() => onEdit(trabajador.id)}
                                            aria-label="Editar"
                                        />
                                    </Tooltip>
                                    <Tooltip label="Eliminar trabajador" aria-label="Eliminar trabajador">
                                        <IconButton
                                            icon={<FaTrashAlt />}
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() => onDelete(trabajador.id)}
                                            aria-label="Eliminar"
                                        />
                                    </Tooltip>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TrabajadoresList;

TrabajadoresList.propTypes = {
    negocioId: PropTypes.number.isRequired
}
