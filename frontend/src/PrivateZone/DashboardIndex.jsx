import { Box, Heading, Stat, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import React from 'react';

const userStats = {
    negocios: 5,
    archivosPrevired: 12,
    creditosRestantes: 50
};

// Este es el componente que actuará como página principal del Dashboard
const DashboardIndex = () => {
    return (
        <Box p={5}>
            <Heading as="h2" size="lg" mb={5}>
                Resumen de tu cuenta
            </Heading>
            <StatGroup gap={10} flexDirection={{ base: 'column', md: 'row' }}>
                <Stat
                    backgroundColor={'blue.100'}
                    px={4}
                    py={6}
                    borderRadius={20}
                    width={{ base: 'full' }}
                >
                    <StatLabel fontSize={'lg'}>Negocios creados</StatLabel>
                    <StatNumber fontSize={'6xl'} fontWeight={'bold'}>{userStats.negocios}</StatNumber>
                    <StatHelpText fontSize={'md'} fontWeight={'semibold'}>Negocios asociados a tu cuenta</StatHelpText>
                </Stat>

                <Stat
                    backgroundColor={'blue.100'}
                    px={4}
                    py={6}
                    borderRadius={20}
                    width={{ base: 'full' }}
                >
                    <StatLabel fontSize={'lg'}>Archivos Previred realizados</StatLabel>
                    <StatNumber fontSize={'6xl'} fontWeight={'bold'}>{userStats.archivosPrevired}</StatNumber>
                    <StatHelpText fontSize={'md'} fontWeight={'semibold'}>Cantidad total de archivos generados</StatHelpText>
                </Stat>

                <Stat
                    backgroundColor={'blue.100'}
                    px={4}
                    py={6}
                    borderRadius={20}
                    width={{ base: 'full' }}
                >
                    <StatLabel fontSize={'lg'}>Créditos restantes</StatLabel>
                    <StatNumber fontSize={'6xl'} fontWeight={'bold'}>{userStats.creditosRestantes}</StatNumber>
                    <StatHelpText fontSize={'md'} fontWeight={'semibold'}>Saldo de créditos disponibles</StatHelpText>
                </Stat>
            </StatGroup>

            {/* Información adicional */}
            <Box mt={8}>
                <Heading as="h2" size="lg" mb={3}>Información adicional</Heading>
                <p>En este panel, puedes administrar tus negocios, generar archivos de Previred y gestionar tus créditos. Mantente al tanto de tus actividades recientes.</p>
            </Box>
        </Box>
    );
};

export default DashboardIndex;
