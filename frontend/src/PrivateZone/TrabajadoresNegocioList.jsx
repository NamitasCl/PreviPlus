import {
    Avatar,
    Box,
    Button,
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
    useColorModeValue,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import FormularioEmpleado from '../components/Formularios/AgregarTrabajador/FormularioAddTrabajador';
import EditarTrabajador from './EditarTrabajador';

const TrabajadoresList = ({ negocioId }) => {

    const [trabajadores, setTrabajadores] = useState([]);
    // Usa useColorModeValue en el nivel superior del componente
    const bgColorThead = useColorModeValue('gray.200', 'gray.700');
    const bgColorHover = useColorModeValue('gray.50', 'gray.800');
    const [trabajadorSeleccionado, setTrabajadorSeleccionado] = useState(null);

    const { isOpen: isOpenAgregar, onOpen: onOpenAgregar, onClose: onCloseAgregar } = useDisclosure();
    const { isOpen: isOpenEditar, onOpen: onOpenEditar, onClose: onCloseEditar } = useDisclosure();

    const toast = useToast();

    useEffect(() => {
        const fetchTrabajadores = async () => {
            try {
                const response = await axios.get(`/api/trabajadores/business/${negocioId}`, { withCredentials: true });
                const trabajadoresNuevos = response.data.map(data => data.trabajador);
                setTrabajadores(trabajadoresNuevos); // Reemplaza el estado en lugar de agregar
                
            } catch (error) {
                console.error("Error al obtener los trabajadores:", error);
                toast({
                    title: "No hay trabajadores asociados",
                    description: "No hay trabajadores asociados a este negocio.",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        fetchTrabajadores();
    }, [negocioId, toast]);
    
    

    const onView = (trabajador) => {
        // Lógica para ver detalles del trabajador
        console.log('Detalles del trabajador:', trabajador);
    };

    const onEdit = (trabajador) => {
        // Lógica para editar los datos del trabajador
        setTrabajadorSeleccionado(trabajador);
        onOpenEditar();
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`/api/trabajadores/${id}`, { withCredentials: true });
            setTrabajadores(prev => prev.filter(t => t.id !== id));
            toast({
                title: "Trabajador eliminado",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error al eliminar el trabajador:", error);
            toast({
                title: "Error",
                description: "No se pudo eliminar el trabajador.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleTrabajadorAdded = (newTrabajador) => {
        setTrabajadores(prevTrabajadores => [...prevTrabajadores, newTrabajador]);
    };

    const handleActualizarTrabajador = (trabajadorActualizado) => {
        setTrabajadores(prev => prev.map(t => t.id === trabajadorActualizado.id ? trabajadorActualizado : t));
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
                <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpenAgregar}>
                    Añadir trabajador
                </Button>
                
            </Flex>

            <TableContainer borderRadius="md" boxShadow="md">
                <Table size="md" variant="simple" colorScheme="blue">
                    <Thead bg={bgColorThead}>
                        <Tr>
                            <Th>Avatar</Th>
                            <Th>Nombre</Th>
                            <Th>Género</Th>
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
                                </Td>
                                <Td>{trabajador.genero}</Td>
                                <Td>{`${trabajador.rut}-${trabajador.dv}`}</Td>
                                <Td isNumeric>
                                    <Tooltip label="Ver detalles" aria-label="Ver detalles">
                                        <IconButton
                                            icon={<FaEye />}
                                            size="sm"
                                            colorScheme="blue"
                                            mr={2}
                                            onClick={() => onView(trabajador)}
                                            aria-label="Ver"
                                        />
                                    </Tooltip>
                                    <Tooltip label="Editar trabajador" aria-label="Editar trabajador">
                                        <IconButton
                                            icon={<FaEdit />}
                                            size="sm"
                                            colorScheme="yellow"
                                            mr={2}
                                            onClick={() => onEdit(trabajador)}
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
            <Modal isOpen={isOpenAgregar} onClose={onCloseAgregar} size={'6xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormularioEmpleado negocioId={negocioId} onTrabajadorAdded={handleTrabajadorAdded} />
                    </ModalBody>

                    <ModalFooter>
                    <Button variant="ghost" onClick={onCloseAgregar}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <EditarTrabajador
                isOpen={isOpenEditar}
                onClose={onCloseEditar}
                trabajador={trabajadorSeleccionado}
                onActualizar={handleActualizarTrabajador}
            />
        </Box>
    );
};

export default TrabajadoresList;

TrabajadoresList.propTypes = {
    negocioId: PropTypes.number.isRequired
}
