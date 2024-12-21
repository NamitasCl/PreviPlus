import { CheckCircleIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Flex, FormControl, FormLabel, Heading, IconButton, Input, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import { useUserAuth } from '../contexto/UserContext';
import AddNegocio from './AddNegocio';
import NegocioView from './NegocioView';

const DescripcionNegocios = () => {
    return (
        <Box p={5} bg="gray.50" borderRadius="lg" boxShadow="md" mb={6}>
            <Heading as="h2" size="lg" mb={4} color="teal.600">
                Bienvenido al espacio de gestión de negocios
            </Heading>
            <Text fontSize="lg" mb={4}>
                Aquí podrás <strong>administrar todos los negocios</strong> que has creado de manera simple y eficiente.
                En esta sección, tendrás la posibilidad de <strong>añadir y gestionar trabajadores</strong>,
                <strong>modificar los datos</strong> clave de cada negocio, y mantener al día toda la información relacionada con tus actividades.
            </Text>

            <Stack spacing={3} mb={4}>
                <Text fontSize="md">
                    Con solo unos clics, puedes:
                </Text>
                <List spacing={3}>
                    <ListItem>
                        <ListIcon as={CheckCircleIcon} color="teal.500" />
                        <strong>Añadir trabajadores</strong> a tus negocios para mantener el registro de tu equipo actualizado.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckCircleIcon} color="teal.500" />
                        <strong>Editar detalles</strong> del negocio como la dirección, RUT o nombre comercial.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={CheckCircleIcon} color="teal.500" />
                        <strong>Gestionar la actividad</strong> de cada negocio para asegurarte de que todo está funcionando como debe.
                    </ListItem>
                </List>
            </Stack>

            <Text fontSize="lg">
                Este es el centro neurálgico para organizar tus negocios y hacer crecer tu operación de manera ordenada y eficiente.
                ¡Comienza a gestionar tus negocios ahora y mantén todo bajo control!
            </Text>
        </Box>
    );
};



const DashboardNegocio = () => {
    const { user } = useUserAuth();
    const [negocios, setNegocios] = useState(null);
    const [negocioSeleccionado, setNegocioSeleccionado] = useState(null);
    const [negocioEditado, setNegocioEditado] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const tableBgColor = useColorModeValue('gray.200', 'gray.700');
    const tableHoverColor = useColorModeValue('gray.50', 'gray.800');
    const headingColor = useColorModeValue('blue.600', 'blue.300');

    const toast = useToast();

    useEffect(() => {
        const fetchNegocios = async () => {
            await axios.get(`http://localhost:3000/api/negocios/${user.id}`, { withCredentials: true })
                .then(response => {
                    setNegocios(response.data);
                })
                .catch(error => {
                    console.log("Error en negocio:", error);
                });
        };

        if (user.id) fetchNegocios();
    }, [user.id]);

    const onView = (negocioSeleccionado) => {
        setNegocioSeleccionado(negocioSeleccionado);
    };

    //Actualiza la vista cuando se ha añadido un negocio
    const handleNegocioAdded = (newNegocio) => {
        setNegocios(prevNegocios => [...prevNegocios, newNegocio]);
    };

    //Funciones que se ejecutan para editar un negocio
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNegocioEditado(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = (negocio) => {
        setNegocioEditado(negocio);
        onOpen();
    }

    const handleUpdate = async () => {
        const { negocioName, rut, address } = negocioEditado;
        await axios.put(`http://localhost:3000/api/negocios/${negocioEditado.id}`, { negocioName, rut, address }, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    toast({
                        title: "Negocio actualizado",
                        description: "El negocio ha sido actualizado correctamente.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    onClose();
                }
            })
            .catch(error => {
                toast({
                    title: "Error",
                    description: "No se pudo actualizar el negocio. Por favor, inténtalo de nuevo.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                console.error("Error al actualizar negocio:", error);
            });

        setNegocios(prevNegocios => prevNegocios.map(negocio => negocio.id === negocioEditado.id ? negocioEditado : negocio));
    };

    //Función que se ejecuta al hacer clic en el boton de borrar
    const onDelete = async (id) => {
        await axios.delete(`http://localhost:3000/api/negocios/${id}`, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    toast({
                        title: "Negocio eliminado",
                        description: "El negocio ha sido eliminado correctamente.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    setNegocios(prevNegocios => prevNegocios.filter(negocio => negocio.id !== id));
                }
            })
            .catch(error => {
                toast({
                    title: "Error",
                    description: "No se pudo eliminar el negocio. Por favor, inténtalo de nuevo.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                console.error("Error al eliminar negocio:", error);
            });
    };


    return (
        <Box p={5}>
            {negocioSeleccionado ? (
                <NegocioView negocio={negocioSeleccionado} back={setNegocioSeleccionado} />
            ) : (
                <>
                    <Flex justifyContent={'space-between'} mb={5}>
                        <Heading as="h2" size="lg" fontWeight="bold" color={headingColor}>
                            Mis Negocios
                        </Heading>

                        <AddNegocio onNegocioAdded={handleNegocioAdded} />
                    </Flex>
                    <DescripcionNegocios />

                    <TableContainer boxShadow="md" borderRadius="lg">
                        <Table size={'lg'} colorScheme="blue" maxWidth="100%">
                            <Thead bg={tableBgColor}>
                                <Tr>
                                    <Th>RUT</Th>
                                    <Th>Nombre</Th>
                                    <Th>Dirección</Th>
                                    <Th>Estado</Th>
                                    <Th textAlign="center">Acciones</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {negocios && negocios.map(negocio => (
                                    <Tr key={negocio.id} _hover={{ bg: tableHoverColor }}>
                                        <Td>{negocio.rut}</Td>
                                        <Td>{negocio.negocioName}</Td>
                                        <Td>{negocio.address}</Td>
                                        <Td>
                                            {negocio.isActive ? (
                                                <Badge px={2} borderRadius={5} colorScheme="green">Activa</Badge>
                                            ) : (
                                                <Badge px={2} borderRadius={5} colorScheme="red">Inactiva</Badge>
                                            )}
                                        </Td>
                                        <Td textAlign="center">
                                            <IconButton
                                                icon={<FaEye />}
                                                colorScheme="blue"
                                                variant="outline"
                                                size="sm"
                                                mr={2}
                                                onClick={() => onView(negocio)}
                                                aria-label="Ver detalles"
                                            />
                                            <IconButton
                                                icon={<FaEdit />}
                                                colorScheme="yellow"
                                                variant="outline"
                                                size="sm"
                                                mr={2}
                                                onClick={() => handleEdit(negocio)}
                                                aria-label="Editar"
                                            />
                                            <IconButton
                                                icon={<FaTrashAlt />}
                                                colorScheme="red"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onDelete(negocio.id)}
                                                aria-label="Eliminar negocio"
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Negocio</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    name="negocioName"
                                    value={negocioEditado?.negocioName || ''}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>RUT</FormLabel>
                                <Input
                                    name="rut"
                                    value={negocioEditado?.rut || ''}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Dirección</FormLabel>
                                <Input
                                    name="address"
                                    value={negocioEditado?.address || ''}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                            Guardar
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default DashboardNegocio;
