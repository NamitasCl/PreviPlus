import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export function TotalLiquido({ monto }) {
  return (
    <Box 
      bg="blue.700" 
      p={6} 
      borderRadius="lg"
      color="white"
      boxShadow="lg"
    >
      <VStack spacing={1} align="stretch">
        <Grid templateColumns="1fr auto" gap={4}>
          <GridItem>
            <Text fontSize="sm" opacity={0.9}>Total Haberes</Text>
          </GridItem>
          <GridItem>
            <Text fontSize="sm" opacity={0.9}>$ 1.180.000</Text>
          </GridItem>
        </Grid>
        <Grid templateColumns="1fr auto" gap={4}>
          <GridItem>
            <Text fontSize="sm" opacity={0.9}>Total Descuentos</Text>
          </GridItem>
          <GridItem>
            <Text fontSize="sm" opacity={0.9}>$ 175.000</Text>
          </GridItem>
        </Grid>
        <Grid templateColumns="1fr auto" gap={4} pt={3}>
          <GridItem>
            <Text fontSize="xl" fontWeight="bold">Alcance Líquido</Text>
          </GridItem>
          <GridItem>
            <Text fontSize="xl" fontWeight="bold">$ {monto}</Text>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
}

TotalLiquido.propTypes = {
  monto: PropTypes.number.isRequired,
};