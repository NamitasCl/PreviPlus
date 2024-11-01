import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch,
    useDisclosure,
    useToast,
    VStack
} from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useUserAuth } from '../contexto/UserContext';

const AddNegocio = ({ onNegocioAdded }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useUserAuth();
    const toast = useToast();

    const [formData, setFormData] = useState({
        rut: '',
        name: '',
        address: '',
        isActive: true
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSwitchChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            isActive: e.target.checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/negocios',
                { ...formData, userId: user.id },
                { withCredentials: true }
            );

            if (response.status === 201) {
                toast({
                    title: "Negocio añadido",
                    description: "El negocio se ha añadido correctamente.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onNegocioAdded(response.data);
                onClose();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo añadir el negocio. Por favor, inténtalo de nuevo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error("Error al añadir negocio:", error);
        }
    };

    return (
        <>
            <Button leftIcon={<FaPlus />} colorScheme='blue' onClick={onOpen}>
                Añadir negocio
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Añadir Nuevo Negocio</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>RUT</FormLabel>
                                    <Input name="rut" value={formData.rut} onChange={handleInputChange} placeholder="Ingrese el RUT del negocio" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Nombre</FormLabel>
                                    <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Ingrese el nombre del negocio" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Dirección</FormLabel>
                                    <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="Ingrese la dirección del negocio" />
                                </FormControl>
                                <FormControl display="flex" alignItems="center">
                                    <FormLabel htmlFor="is-active" mb="0">
                                        ¿Está activo?
                                    </FormLabel>
                                    <Switch id="is-active" name="isActive" isChecked={formData.isActive} onChange={handleSwitchChange} />
                                </FormControl>
                            </VStack>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Guardar
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddNegocio;

AddNegocio.propTypes = {
    onNegocioAdded: PropTypes.func.isRequired
};