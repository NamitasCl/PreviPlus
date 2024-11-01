import { EditIcon, LockIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
    useToast,
    VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { useUserAuth } from '../contexto/UserContext';

const Perfil = () => {
    const { user } = useUserAuth();

    const [isEditing, setIsEditing] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        setIsEditing(false)
        toast({
            title: "Perfil actualizado",
            description: "Los cambios en tu perfil han sido guardados exitosamente.",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <Box maxWidth="full" py={2}>
            <Card>
                <CardHeader>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="lg">Perfil de Usuario</Heading>
                        <Button leftIcon={<EditIcon />} onClick={handleEdit} variant="outline">
                            Editar Perfil
                        </Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <VStack spacing={6} align="stretch">
                        <Flex alignItems="center" gap={4}>
                            <Avatar size="xl" name={`${user.name} ${user.firstLastName}`} src={user.avatar} />
                            <Box>
                                <Heading size="md">{user.name} {user.firstLastName} {user.secondLastName}</Heading>
                                <Text color="gray.500">{user.email}</Text>
                            </Box>
                        </Flex>
                        <Divider />
                        <Stack spacing={4}>
                            <FormControl w={{ base: "full", md: "40%" }}>
                                <FormLabel>Nombre Completo</FormLabel>
                                <Input
                                    value={`${user.name} ${user.firstLastName} ${user.secondLastName}`}
                                    isReadOnly={!isEditing}
                                />
                            </FormControl>
                            <FormControl w={{ base: "full", md: "40%" }}>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <Input value={user.email} isReadOnly={!isEditing} />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Box>
                            <Heading size="md" mb={2}>Información de la Cuenta</Heading>
                            <Stack spacing={2}>
                                <Flex alignItems="center">
                                    <FaCreditCard />
                                    <Text ml={2}>Créditos disponibles: {user.credits}</Text>
                                </Flex>
                                <Flex alignItems="center">
                                    <LockIcon mr={2} />
                                    <Text>Último inicio de sesión: Hace 2 días</Text>
                                </Flex>
                            </Stack>
                        </Box>
                    </VStack>
                </CardBody>
                <CardFooter>
                    {isEditing && (
                        <Flex justifyContent="flex-end" width="100%" gap={2}>
                            <Button onClick={() => setIsEditing(false)} variant="outline">
                                Cancelar
                            </Button>
                            <Button onClick={handleSave} colorScheme="blue">
                                Guardar Cambios
                            </Button>
                        </Flex>
                    )}
                </CardFooter>
            </Card>

            <Card mt={8}>
                <CardHeader>
                    <Heading size="md">Acciones de Cuenta</Heading>
                    <Text>Gestiona tu cuenta y seguridad</Text>
                </CardHeader>
                <CardBody>
                    <HStack spacing={4} align="stretch">
                        <Button onClick={onOpen} variant="outline">Cambiar Contraseña</Button>
                        <Button variant="outline">Actualizar Información de Facturación</Button>
                        <Button variant="outline" colorScheme="red">Eliminar Cuenta</Button>
                    </HStack>
                </CardBody>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cambiar Contraseña</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Contraseña Actual</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nueva Contraseña</FormLabel>
                                <Input type="password" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                                <Input type="password" />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Guardar Cambios
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>

    );
};

export default Perfil;
