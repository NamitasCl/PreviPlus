import {
    Box,
    Button,
    Flex,
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
    Select,
    Text,
    VStack,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AnadirTrabajador = ({ negocioId, onTrabajadorAdded }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [formData, setFormData] = useState({
        rut: '',
        dv: '',
        patlastname: '',
        matlastname: '',
        names: '',
        sexo: '',
        nationality: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/trabajadores`,
                { ...formData, negocioid: negocioId },
                { withCredentials: true }
            );

            if (response.status === 201) {
                toast({
                    title: "Trabajador añadido",
                    description: "El trabajador se ha añadido correctamente.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onTrabajadorAdded(response.data);
                onClose();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo añadir el trabajador. Por favor, inténtalo de nuevo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error("Error al añadir trabajador:", error);
        }
    };

    return (
        <>
            <Button leftIcon={<FaPlus />} colorScheme='blue' onClick={onOpen}>
                Añadir trabajador
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Añadir Nuevo Trabajador</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>Nombres</FormLabel>
                                    <Input name="names" value={formData.names} onChange={handleInputChange} placeholder="Ingrese los nombres" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Apellido Paterno</FormLabel>
                                    <Input name="patlastname" value={formData.patlastname} onChange={handleInputChange} placeholder="Ingrese el apellido paterno" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Apellido Materno</FormLabel>
                                    <Input name="matlastname" value={formData.matlastname} onChange={handleInputChange} placeholder="Ingrese el apellido materno" />
                                </FormControl>
                                <Box>
                                    <FormControl isRequired w={{ "base": "100%", "md": "100%" }}>
                                        <FormLabel>RUT</FormLabel>
                                        <Flex w={{ "base": "100%", "md": "80%" }} gap={2}>
                                            <Input w={{ "base": "100%", "md": "60%" }} name="rut" value={formData.rut} onChange={handleInputChange} placeholder="Ingrese el RUT" />
                                            <Flex alignItems={'center'}><Text fontSize={'xl'} w={{ "base": "100%", "md": "100%" }}>-</Text></Flex>
                                            <Input w={{ "base": "100%", "md": "20%" }} name="dv" value={formData.dv} onChange={handleInputChange} placeholder="DV" maxLength={1} />
                                        </Flex>
                                    </FormControl>
                                </Box>
                                <FormControl isRequired>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select name="sexo" value={formData.sexo} onChange={handleInputChange} placeholder="Seleccione el sexo">
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Nacionalidad</FormLabel>
                                    <Input name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="Ingrese la nacionalidad" />
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

export default AnadirTrabajador;

AnadirTrabajador.propTypes = {
    negocioId: PropTypes.number.isRequired,
    onTrabajadorAdded: PropTypes.func.isRequired
};