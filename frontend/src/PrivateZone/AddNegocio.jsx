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
      negocioName: '',
      address: '',
      repLegal: '',
      rutRepLegal: '',
      dvRepLegal: '',
      tieneMutual: false,
      mutualNombre: '',
      tieneCcaf: false,
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
      if (!formData.rut || !formData.negocioName || !formData.address || !formData.repLegal) {
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
          '/api/negocios',
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
                        name="negocioName"
                        value={formData.negocioName}
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
                        id="tieneCcaf"
                        name="tieneCcaf"
                        isChecked={formData.tieneCcaf}
                        onChange={handleSwitchChange}
                      />
                      {formData.tieneCcaf && (
                        <Box mt={4}>
                          <Select
                            name="ccafNombre"
                            value={formData.ccafNombre}
                            onChange={handleInputChange}
                            placeholder="Seleccione Caja de Compensación"
                          >
                            <option value="01-CCAF Los Andes">CCAF Los Andes</option>
                            <option value="02-CCAF La Araucana">CCAF La Araucana</option>
                            <option value="03-CCAF Los Héroes">CCAF Los Héroes</option>
                            <option value="04-CCAF 18 de Septiembre">CCAF 18 de Septiembre</option>
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
                          <Switch
                            id="tieneMutual"
                            name="tieneMutual"
                            isChecked={formData.tieneMutual}
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
                      {formData.tieneMutual && (
                          <Box>
                            <Select
                              name="mutualNombre"
                              value={formData.mutualNombre}
                              onChange={handleInputChange}
                              placeholder="Seleccione mutual"
                            >
                              <option value="00-Instituto de Seguridad Laboral">ISL (Pública)</option>
                              <option value="01-Asociación Chilena de Seguridad">ACHS</option>
                              <option value="02- Mutual de Seguridad CChC">CChC</option>
                              <option value="03-Instituto de Seguridad del Trabajo">IST</option>
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
  