import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useColorModeValue,
    useToast,
    VStack
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ComprarCreditos = () => {
    const [cantidad, setCantidad] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const bgColor = useColorModeValue('white', 'gray.700');
    const cardBgColor = useColorModeValue('white', 'gray.800');

    const handleCompra = async (e) => {
        e.preventDefault();
        if (!cantidad || !metodoPago) {
            toast({
                title: "Error",
                description: "Por favor, completa todos los campos.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/comprar-creditos', {
                cantidad: parseInt(cantidad),
                metodoPago
            }, { withCredentials: true });

            if (response.status === 200) {
                toast({
                    title: "Compra exitosa",
                    description: `Has comprado ${cantidad} créditos exitosamente.`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setCantidad('');
                setMetodoPago('');
            }
        } catch (error) {
            toast({
                title: "Error en la compra",
                description: "No se pudo procesar la compra. Por favor, inténtalo de nuevo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error("Error al comprar créditos:", error);
        }
    };

    return (
        <Box maxWidth="800px" p={5} bg={bgColor}>
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Heading as="h1" size="xl">Comprar Créditos</Heading>
                <Button leftIcon={<FaHistory />} colorScheme="teal" variant="outline" onClick={() => navigate('/dashboard/creditos/historial-compras')}>
                    Historial de Compras
                </Button>
            </Flex>

            <Card bg={cardBgColor} shadow="md" mb={6}>
                <CardHeader>
                    <Heading size="md">Comprar Nuevos Previpuntos</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleCompra}>
                        <VStack spacing={4} align="stretch">
                            <FormControl isRequired>
                                <FormLabel>Cantidad de Previpuntos</FormLabel>
                                <Input
                                    type="number"
                                    value={cantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                    placeholder="Ingrese la cantidad de créditos"
                                    min="1"
                                    w={{ "base": "100%", "md": "40%" }}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Método de Pago</FormLabel>
                                <RadioGroup onChange={setMetodoPago} value={metodoPago}>
                                    <Stack direction="row">
                                        <Radio value="tarjeta">Tarjeta de Crédito</Radio>
                                        <Radio value="paypal">PayPal</Radio>
                                        <Radio value="transferencia">Transferencia Bancaria</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <Button type="submit" colorScheme="blue" mt={4}>
                                Comprar Créditos
                            </Button>
                        </VStack>
                    </form>
                </CardBody>
            </Card>

            <Card bg={cardBgColor} shadow="md">
                <CardHeader>
                    <Heading size="md">Información de Precios</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Precio por Previpunto: $1.000 CLP</Text>
                    <Text>Los Previpuntos no tienen fecha de expiración.</Text>
                    <Text>Compra mínima: 1 crédito</Text>
                </CardBody>
            </Card>
        </Box>
    );
};

export default ComprarCreditos;