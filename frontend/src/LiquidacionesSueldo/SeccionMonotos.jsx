import React from 'react';
import { Box, Heading, Grid, GridItem, Text, Divider } from '@chakra-ui/react';
import { LineaLiquidacion } from './LinealLiquidacion';
import PropTypes from 'prop-types';

export function SeccionMontos({ titulo, items, total, colorTitulo }) {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      border="1px"
      borderColor="gray.200"
    >
      <Heading size="md" mb={4} color={colorTitulo} letterSpacing="tight">
        {titulo}
      </Heading>
      <Box>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <LineaLiquidacion {...item} />
            {index < items.length - 1 && <Divider my={2} borderColor="gray.100" />}
          </React.Fragment>
        ))}
      </Box>
      <Divider my={4} borderColor="gray.200" />
      <Grid templateColumns="1fr auto" gap={4} pt={2}>
        <GridItem>
          <Text fontWeight="bold" fontSize="lg">Total {titulo}</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" fontSize="lg">$ {total}</Text>
        </GridItem>
      </Grid>
    </Box>
  );
}

SeccionMontos.propTypes = {
  titulo: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      concepto: PropTypes.string.isRequired,
      monto: PropTypes.number.isRequired,
      descripcion: PropTypes.string,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  colorTitulo: PropTypes.string.isRequired,
};