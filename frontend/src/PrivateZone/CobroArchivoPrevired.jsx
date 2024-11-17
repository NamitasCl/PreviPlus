import { Box, Heading, Text } from '@chakra-ui/react';

const CobroArchivoPrevired = () => {
    return (
        <Box p={5} my={6} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
            <Heading as="h3" size="md" mb={4} color="teal.600">
                Condiciones de Cobro para Generar Archivos Previred
            </Heading>
            <Text fontSize="md" mb={2}>
                - Cada usuario puede generar <strong>1 archivo Previred por mes</strong> por un costo de <strong>$ 2.000</strong>.
            </Text>
            <Text fontSize="md" mb={2}>
                - Si tienes más de un negocio o necesitas generar archivos adicionales en el mismo mes, deberás <strong>recargar tus Previpuntos</strong>. Cada archivo adicional costará 1 Previpunto, y estos tienen un valor de <strong>$ 1.000</strong>.
            </Text>
            <Text fontSize="md" mb={2}>
                - El saldo de tus Previpuntos y la cantidad de archivos generados se mostrarán en la sección de tu cuenta.
            </Text>
        </Box>
    );
};

export default CobroArchivoPrevired;
