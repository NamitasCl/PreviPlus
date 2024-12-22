import { useState, useEffect } from 'react';
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Button, 
    FormControl, 
    FormLabel, 
    Input, 
    useToast 
} from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';

const EditarTrabajador = ({ isOpen, onClose, trabajador, onActualizar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        // otros campos...
    });

    const toast = useToast();

    useEffect(() => {
        if (trabajador) {
            setFormData({
                nombre: trabajador.nombre,
                apellido: trabajador.apellido,
                email: trabajador.email,
                // otros campos...
            });
        }
    }, [trabajador]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`/api/trabajadores/${trabajador.id}`, formData, { withCredentials: true });
            toast({
                title: "Trabajador actualizado",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onActualizar(response.data);
            onClose();
        } catch (error) {
            console.error("Error al actualizar el trabajador:", error);
            toast({
                title: "Error",
                description: "No se pudo actualizar el trabajador.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Trabajador</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl id="nombre" mb={4}>
                        <FormLabel>Nombre</FormLabel>
                        <Input 
                            name="nombre" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                        />
                    </FormControl>
                    <FormControl id="apellido" mb={4}>
                        <FormLabel>Apellido</FormLabel>
                        <Input 
                            name="apellido" 
                            value={formData.apellido} 
                            onChange={handleChange} 
                        />
                    </FormControl>
                    <FormControl id="email" mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </FormControl>
                    {/* Agregar más campos según sea necesario */}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Guardar
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditarTrabajador;

EditarTrabajador.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    trabajador: PropTypes.object,
    onActualizar: PropTypes.func.isRequired,
}