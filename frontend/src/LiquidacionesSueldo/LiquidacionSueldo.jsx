import { 
  Box, 
  Container,
  VStack,
} from '@chakra-ui/react';

import { Encabezado } from './Encabezado';
import { DatosEmpleado } from './DatosEmpleados';
import { SeccionMontos } from './SeccionMonotos';
import { TotalLiquido } from './TotalLiquido';
import { haberes, descuentos, totales } from './LiquidacionData';

function LiquidacionSueldo() {
  return (
    <Box bg="gray.100" minH="100vh" py={8}>
      <Container maxW="container.md" bg="white" p={8} borderRadius="xl" boxShadow="lg">
        <VStack spacing={8} align="stretch">
          <Encabezado />
          <DatosEmpleado /> 
          <SeccionMontos 
            titulo="Haberes" 
            items={haberes} 
            total={totales.haberes}
            colorTitulo="green.600"
          />
          <SeccionMontos 
            titulo="Descuentos" 
            items={descuentos} 
            total={totales.descuentos}
            colorTitulo="red.600"
          />
          <TotalLiquido monto={totales.liquido} />
        </VStack>
      </Container>
    </Box>
  );
}

export default LiquidacionSueldo;