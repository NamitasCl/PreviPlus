import { Box, Grid, Text, VStack, Divider } from '@chakra-ui/react';

export function DatosEmpleado() {
  return (
    <Box 
      bg="white" 
      p={6} 
      borderRadius="lg" 
      boxShadow="sm"
      border="1px"
      borderColor="gray.200"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        <VStack align="stretch" spacing={3}>
          <Box>
            <Text fontSize="sm" color="gray.500">Nombre del Trabajador</Text>
            <Text fontWeight="semibold">Juan Pérez González</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">RUT</Text>
            <Text fontWeight="semibold">12.345.678-9</Text>
          </Box>
        </VStack>
        <VStack align="stretch" spacing={3}>
          <Box>
            <Text fontSize="sm" color="gray.500">Cargo</Text>
            <Text fontWeight="semibold">Desarrollador Senior</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Fecha de Ingreso</Text>
            <Text fontWeight="semibold">01/01/2023</Text>
          </Box>
        </VStack>
      </Grid>
      <Divider my={4} />
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <Box>
          <Text fontSize="sm" color="gray.500">AFP</Text>
          <Text fontWeight="semibold">Modelo</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">Sistema de Salud</Text>
          <Text fontWeight="semibold">Fonasa</Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">Tipo de Contrato</Text>
          <Text fontWeight="semibold">Indefinido</Text>
        </Box>
      </Grid>
    </Box>
  );
}