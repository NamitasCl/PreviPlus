import { Grid, GridItem, Text, Tooltip } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export function LineaLiquidacion({ concepto, monto, descripcion }) {
  return (
    <Grid templateColumns="1fr auto" gap={4} w="100%" py={2}>
      <GridItem>
        <Tooltip label={descripcion} hasArrow placement="top">
          <Text fontSize="sm" cursor={descripcion ? "help" : "default"}>
            {concepto}
          </Text>
        </Tooltip>
      </GridItem>
      <GridItem>
        <Text fontSize="sm" fontWeight="medium">$ {monto}</Text>
      </GridItem>
    </Grid>
  );
}

LineaLiquidacion.propTypes = {
  concepto: PropTypes.string.isRequired,
  monto: PropTypes.number.isRequired,
  descripcion: PropTypes.string,
};