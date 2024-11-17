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
    Switch,
    Text,
    useDisclosure,
    useToast,
    VStack,
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
      repLegal: '',
      rutRepLegal: '',
      dvRepLegal: '',
      mutualPublica: false,
      mutualPrivada: false,
      mutualPrivadaNombre: '',
      haveCcaf: false,
      ccafNombre: '',
      isActive: false,
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSwitchChange = (e) => {
      const { name, checked } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validación de campos obligatorios
      if (!formData.rut || !formData.name || !formData.address || !formData.repLegal) {
        toast({
          title: 'Campos incompletos',
          description: 'Por favor, completa todos los campos obligatorios.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      try {
        const response = await axios.post(
          'http://localhost:3000/api/negocios',
          { ...formData, userId: user.id },
          { withCredentials: true }
        );
  
        if (response.status === 201) {
          toast({
            title: 'Negocio añadido',
            description: 'El negocio se ha añadido correctamente.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          onNegocioAdded(response.data);
          onClose();
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'No se pudo añadir el negocio. Por favor, inténtalo de nuevo.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        console.error('Error al añadir negocio:', error);
      }
    };
  
    return (
      <>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={onOpen}>
          Añadir negocio
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Añadir Nuevo Negocio</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <Flex direction={['column', 'row']} gap={4}>
                  <VStack spacing={4} maxW="50%">
                    <FormControl isRequired>
                      <FormLabel>RUT</FormLabel>
                      <Input
                        name="rut"
                        value={formData.rut}
                        onChange={handleInputChange}
                        placeholder="Ingrese el RUT del negocio"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ingrese el nombre del negocio"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Dirección</FormLabel>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Ingrese la dirección del negocio"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Representante Legal</FormLabel>
                      <Input
                        name="repLegal"
                        value={formData.repLegal}
                        onChange={handleInputChange}
                        placeholder="Ingrese nombre Representante Legal"
                      />
                    </FormControl>
                    <Flex gap={4} w="100%">
                      <FormControl isRequired w="60%">
                        <FormLabel>RUT Representante Legal</FormLabel>
                        <Input
                          name="rutRepLegal"
                          value={formData.rutRepLegal}
                          onChange={handleInputChange}
                          placeholder="12345678-9"
                        />
                      </FormControl>
                      <FormControl isRequired w="20%">
                        <FormLabel>DV</FormLabel>
                        <Input
                          name="dvRepLegal"
                          value={formData.dvRepLegal}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                    </Flex>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="isActive" mb="0">
                        ¿Está activo?
                      </FormLabel>
                      <Switch
                        id="isActive"
                        name="isActive"
                        isChecked={formData.isActive}
                        onChange={handleSwitchChange}
                      />
                    </FormControl>
                  </VStack>
                  <VStack spacing={4} maxW="50%">
                    <FormControl isRequired>
                      <FormLabel>Caja de Compensación</FormLabel>
                      <Switch
                        id="haveCcaf"
                        name="haveCcaf"
                        isChecked={formData.haveCcaf}
                        onChange={handleSwitchChange}
                      />
                      {formData.haveCcaf && (
                        <Box mt={4}>
                          <Select
                            name="ccafNombre"
                            value={formData.ccafNombre}
                            onChange={handleInputChange}
                            placeholder="Seleccione Caja de Compensación"
                          >
                            <option value="CCAF Los Andes">CCAF Los Andes</option>
                            <option value="CCAF La Araucana">CCAF La Araucana</option>
                            <option value="CCAF Gabriela Mistral">CCAF Gabriela Mistral</option>
                            <option value="CCAF Los Héroes">CCAF Los Héroes</option>
                          </Select>
                        </Box>
                      )}
                    </FormControl>
                    <FormControl isRequired>
                      <Text as="h4" fontWeight="semibold">
                        Mutual de seguridad
                      </Text>
                      <Flex my={4} gap={4}>
                        <Box>
                          <FormLabel htmlFor="mutualPublica">ISL</FormLabel>
                          <Switch
                            id="mutualPublica"
                            name="mutualPublica"
                            isChecked={formData.mutualPublica}
                            onChange={(e) => {
                              handleSwitchChange(e);
                              if (e.target.checked) {
                                setFormData((prevState) => ({
                                  ...prevState,
                                  mutualPrivada: false,
                                }));
                              }
                            }}
                          />
                        </Box>
                        <Box>
                          <FormLabel htmlFor="mutualPrivada">Privada</FormLabel>
                          <Switch
                            id="mutualPrivada"
                            name="mutualPrivada"
                            isChecked={formData.mutualPrivada}
                            onChange={(e) => {
                              handleSwitchChange(e);
                              if (e.target.checked) {
                                setFormData((prevState) => ({
                                  ...prevState,
                                  mutualPublica: false,
                                }));
                              }
                            }}
                          />
                        </Box>
                      </Flex>
                      {formData.mutualPrivada && (
                          <Box>
                            <Select
                              name="mutualPrivadaNombre"
                              value={formData.mutualPrivadaNombre}
                              onChange={handleInputChange}
                              placeholder="Seleccione mutual"
                            >
                              <option value="CChC">CChC</option>
                              <option value="IST">IST</option>
                              <option value="ACHS">ACHS</option>
                            </Select>
                          </Box>
                        )}
                    </FormControl>
                  </VStack>
                </Flex>
              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Guardar
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default AddNegocio;
  
  AddNegocio.propTypes = {
    onNegocioAdded: PropTypes.func.isRequired,
  };
  