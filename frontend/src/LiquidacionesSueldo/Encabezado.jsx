import { Box, Heading, Text, HStack, VStack } from '@chakra-ui/react';

export function Encabezado() {
  return (
    <Box>
      <HStack justify="space-between" align="flex-start" mb={6}>
        <VStack align="flex-start" spacing={1}>
          <Heading size="lg" color="blue.700">Mi Empresa SpA</Heading>
          <Text fontSize="sm" color="gray.500">RUT: 76.XXX.XXX-X</Text>
          <Text fontSize="sm" color="gray.500">Dirección: Av. Principal 123, Santiago</Text>
          <Text fontSize="sm" color="gray.500">contacto@miempresa.cl</Text>
        </VStack>
        <Box textAlign="right">
          <Text fontSize="sm" fontWeight="bold" color="gray.700">LIQUIDACIÓN DE SUELDO</Text>
          <Text fontSize="sm" color="gray.500">N° 2023-11-001</Text>
          <Text fontSize="sm" color="gray.500">Período: Noviembre 2023</Text>
        </Box>
      </HStack>
    </Box>
  );
}