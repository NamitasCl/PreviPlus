// components/Perfil.js
import { EditIcon } from "@chakra-ui/icons";
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
    Heading,
    HStack,
    Stack,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useUserAuth } from '../../contexto/UserContext';
import { MembershipStatus } from "./EstadoMembresia";
import { set } from "react-hook-form";


const Perfil = () => {
    const { user, checkAuth, setUser } = useUserAuth(); // Asegúrate de tener un método para actualizar el usuario
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef(null); // Referencia para el intervalo

    /**
     * Función para activar la membresía.
     * Abre Flow en una nueva pestaña y inicia el polling para verificar el estado de la membresía.
     */
    const handleActivarMembresia = async () => {
        try {
            setLoading(true);
            // Llama al backend para iniciar el proceso de membresía
            const response = await axios.post(
                "http://localhost:3000/api/membresia/create",
                { userId: user.id }, // Asegúrate de enviar el userId correcto
                { withCredentials: true } // Enviar cookies si es necesario
            ).catch(error => console.log("Se produjo aqui un error:", error));

            const { url, token } = response.data;
            
            console.log("Url:", url);
            console.log("Token:", token);

            if (url) {
                // Abre la URL de Flow en una nueva pestaña
                window.open(url + "?token=" +token, '_blank');

                // Inicia el intervalo para verificar el estado de la membresía cada 5 segundos
                intervalRef.current = setInterval(async () => {
                    try {
                        const statusResponse = await axios.get(
                            "http://localhost:3000/api/membresia/status",
                            { withCredentials: true }
                        );

                        const { membresiaActiva } = statusResponse.data;

                        if (membresiaActiva) {
                            // Si la membresía está activa, detén el intervalo y actualiza el estado del usuario
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                            setUser({ ...user, membresiaActiva: true });

                            toast({
                                title: "Membresía Activada",
                                description: "Tu membresía ha sido activada exitosamente.",
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                            });
                        }
                    } catch (error) {
                        console.error("Error al verificar el estado de la membresía:", error);
                        // Opcional: Puedes manejar errores específicos o detener el intervalo después de ciertos intentos
                    }
                }, 5000); // 5000 ms = 5 segundos
            } else {
                throw new Error("No se recibió una URL de Flow.");
            }
        } catch (error) {
            console.error("Error al activar membresía:", error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "No se pudo activar la membresía.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    /**
     * Función para desactivar la membresía.
     * Envía una solicitud al backend para desactivar la membresía del usuario.
     */
    const handleDesactivarMembresia = async () => {
        try {
            setLoading(true);
            // Llama al backend para desactivar la membresía
            const response = await axios.post(
                "/api/membresia/desactivar",
                { userId: user.id }, // Asegúrate de enviar el userId correcto
                { withCredentials: true } // Enviar cookies si es necesario
            );

            if (response.status === 200) {
                toast({
                    title: "Membresía Desactivada",
                    description: "Tu membresía ha sido desactivada exitosamente.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                // Actualiza el estado del usuario
                setUser({ ...user, membresiaActiva: false });
            } else {
                throw new Error("No se pudo desactivar la membresía.");
            }
        } catch (error) {
            console.error("Error al desactivar membresía:", error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "No se pudo desactivar la membresía.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    /**
     * Limpia el intervalo cuando el componente se desmonta para evitar memory leaks.
     */
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    /**
     * Función para manejar la eliminación de la cuenta.
     */
    const handleDeleteAccount = async () => {
        try {
            // Aquí deberías implementar la lógica para eliminar la cuenta
            // Por ejemplo, llamar a un endpoint de backend para eliminar la cuenta
            // await axios.delete("/api/usuarios/eliminar", { withCredentials: true });

            // Por ahora, solo muestra el toast
            toast({
                title: "Eliminación de cuenta",
                description: "Tu cuenta ha sido eliminada exitosamente.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error("Error al eliminar la cuenta:", error);
            toast({
                title: "Error",
                description: "No se pudo eliminar la cuenta. Inténtalo de nuevo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleMembresiaFake = async () => {
        axios.post('http://localhost:3000/api/usuarios/membresiafake', { userId: user.id }, { withCredentials: true })
        .then((r) => setUser(r.data.user))
        .catch(error => console.error("Error al activar membresía:", error));

        console.log(user)
    };

    return (
        <Box maxWidth="full" py={2}>
            <Card>
                <CardHeader>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="lg">Perfil de Usuario</Heading>
                        <Button leftIcon={<EditIcon />} variant="outline">
                            Editar Perfil
                        </Button>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <VStack spacing={6} align="stretch">
                        <Flex alignItems="center" gap={4}>
                            <Avatar size="xl" name={`${user.name} ${user.firstlastname}`} src={user.avatar} />
                            <Box>
                                <Heading size="md">{user.name} {user.firstlastname} {user.secondlastname}</Heading>
                                <Text color="gray.500">{user.email}</Text>
                            </Box>
                        </Flex>
                        <Divider />
                        <Box>
                            <Heading size="md" mb={2}>Información de Membresía</Heading>
                            <Stack spacing={2}>
                                <MembershipStatus isActive={user.isMembershipActive || false} />
                                {/* Botón para activar o desactivar membresía según el estado */}
                                {user.isMembershipActive ? (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleMembresiaFake}
                                        isLoading={loading}
                                    >
                                        Desactivar Membresía
                                    </Button>
                                ) : (
                                    <Button
                                        colorScheme="green"
                                        onClick={handleMembresiaFake}
                                        isLoading={loading}
                                    >
                                        Activar Membresía
                                    </Button>
                                )}
                            </Stack>
                        </Box>
                    </VStack>
                </CardBody>
                <CardFooter>
                    {/* Puedes mantener o ajustar el footer según tus necesidades */}
                </CardFooter>
            </Card>

            <Card mt={8}>
                <CardHeader>
                    <Heading size="md">Acciones de Cuenta</Heading>
                    <Text>Gestiona tu cuenta y seguridad</Text>
                </CardHeader>
                <CardBody>
                    <HStack spacing={4} align="stretch">
                        <Button variant="outline" colorScheme="red" onClick={handleDeleteAccount}>Eliminar Cuenta</Button>
                    </HStack>
                </CardBody>
            </Card>
        </Box>
    );
};

export default Perfil;
