import { Box, Heading, Spinner, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUserAuth } from '../contexto/UserContext';
import DashboardInformacionAdicional from './DashboardInformacionAdicional';

const DashboardIndex = () => {
    const { user, loading } = useUserAuth(); // Ahora incluimos 'loading'
    const [userStats, setUserStats] = useState(null);

    const statBgColor = useColorModeValue('gray.100', 'gray.700');
    const statTextColor = useColorModeValue('gray.800', 'gray.100');
    const headingColor = useColorModeValue('gray.900', 'gray.50');
    const shadowColor = useColorModeValue('lg', 'dark-lg');

    useEffect(() => {
        const fetchUserStats = async () => {
            if (user && user.id) {  // Solo intentamos obtener las estadísticas si 'user.id' está disponible
                await axios.get(`http://localhost:3000/api/usuarios/stats/${user.id}`)
                .then(response => {
                    setUserStats(prev => setUserStats({
                        ...prev,
                        ...response.data
                    }));
                })
                .catch(error => {
                    setUserStats((
                        {
                            totalNegocios: 0, 
                            totalTrabajadores: 0, 
                            creditos: 0}
                    ))
                    console.error("Error al obtener las estadísticas del usuario:", error);
                })
            }
        };

        if (!loading) {  // Solo hacemos la consulta cuando la autenticación ha terminado (loading === false)
            fetchUserStats();
        }
    }, [user, loading]); // La dependencia de 'loading' asegura que se espere hasta que el usuario esté listo

    if (loading) {
        return (
            <Box p={5} textAlign="center">
                <Spinner size="xl" />
                <Heading as="h2" size="lg" mt={5}>Cargando...</Heading>
            </Box>
        );
    }

    return (
        <>
            {userStats && (
                <Box p={5}>
                    <Heading as="h2" size="lg" mb={5} color={headingColor}>
                        Resumen de tu cuenta
                    </Heading>

                    {/* Grupo de estadísticas */}
                    <StatGroup gap={10} flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-around">
                        <Stat
                            backgroundColor={statBgColor}
                            px={6}
                            py={8}
                            borderRadius={20}
                            width={{ base: 'full', md: '30%' }}
                            boxShadow={shadowColor}
                            color={statTextColor}
                        >
                            <StatLabel fontSize={'lg'}>Negocios creados</StatLabel>
                            <StatNumber fontSize={'5xl'} fontWeight={'bold'}>{userStats.totalNegocios}</StatNumber>
                            <StatHelpText fontSize={'md'} fontWeight={'semibold'}>Negocios asociados a tu cuenta</StatHelpText>
                        </Stat>

                        <Stat
                            backgroundColor={statBgColor}
                            px={6}
                            py={8}
                            borderRadius={20}
                            width={{ base: 'full', md: '30%' }}
                            boxShadow={shadowColor}
                            color={statTextColor}
                        >
                            <StatLabel fontSize={'lg'}>Trabajadores agregados</StatLabel>
                            <StatNumber fontSize={'5xl'} fontWeight={'bold'}>{userStats.totalTrabajadores}</StatNumber>
                            <StatHelpText fontSize={'md'} fontWeight={'semibold'}>Cantidad total de trabajadores</StatHelpText>
                        </Stat>

                        <Stat
                            backgroundColor={statBgColor}
                            px={6}
                            py={8}
                            borderRadius={20}
                            width={{ base: 'full', md: '30%' }}
                            boxShadow={shadowColor}
                            color={statTextColor}
                        >
                            <StatLabel fontSize={'lg'}>Créditos restantes</StatLabel>
                            <StatNumber fontSize={'5xl'} fontWeight={'bold'}>{user.credits > 0 ? user.credits : 0}</StatNumber>
                            <StatHelpText fontSize={'md'} fontWeight={'semibold'}>Saldo de créditos disponibles</StatHelpText>
                        </Stat>
                    </StatGroup>

                    {/* Información adicional */}
                    <DashboardInformacionAdicional />
                </Box>
            )}
        </>
    );
};

export default DashboardIndex;
