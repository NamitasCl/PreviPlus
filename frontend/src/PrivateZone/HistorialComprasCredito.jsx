import {
    Box,
    Button,
    Heading,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HistorialComprasCredito = () => {
    const [compras, setCompras] = useState([]);
    const navigate = useNavigate();

    const bgColor = useColorModeValue('white', 'gray.700');
    const tableBgColor = useColorModeValue('white', 'gray.800');

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/historial-compras', { withCredentials: true });
                setCompras(response.data);
            } catch (error) {
                console.error("Error al obtener el historial de compras:", error);
            }
        };

        fetchHistorial();
    }, []);

    return (
        <Box maxWidth="800px" p={5} bg={bgColor}>
            <Button leftIcon={<FaArrowLeft />} onClick={() => navigate('/dashboard/creditos')} mb={4}>
                Volver a Comprar Créditos
            </Button>
            <Heading as="h1" size="xl" mb={6}>Historial de Compras</Heading>
            <Table variant="simple" bg={tableBgColor}>
                <Thead>
                    <Tr>
                        <Th>Fecha</Th>
                        <Th>Cantidad de Créditos</Th>
                        <Th>Método de Pago</Th>
                        <Th isNumeric>Total</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {compras.map((compra, index) => (
                        <Tr key={index}>
                            <Td>{new Date(compra.fecha).toLocaleDateString()}</Td>
                            <Td>{compra.cantidad}</Td>
                            <Td>{compra.metodoPago}</Td>
                            <Td isNumeric>${compra.total.toLocaleString()}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default HistorialComprasCredito;