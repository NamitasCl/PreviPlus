import { Box, Heading, Image, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import ImagenAccidenteLaboral from './assets/accidentelaboral.jpg';
import ImagenInclusividad from './assets/inclusividad.jpg';
import ImagenSeguroCesantia from './assets/segurocesantia.jpg';

const DashboardInformacionAdicional = () => {
    const cardBg = useColorModeValue('gray.50', 'gray.700');
    const cardTextColor = useColorModeValue('gray.800', 'gray.100');
    const cardTitleColor = useColorModeValue('teal.600', 'teal.300');

    return (
        <Box p={5} mt={8}>
            <Heading as="h2" size="lg" mb={6}>
                Información adicional
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                {/* Tarjeta 1: Inclusividad en la contratación */}
                <Box bg={cardBg} borderRadius="lg" boxShadow="md" color={cardTextColor} overflow="hidden">
                    <Image
                        src={ImagenInclusividad}
                        alt="Inclusividad en la Contratación"
                        objectFit="cover"
                        width="100%"
                        height="200px" // Altura fija para todas las imágenes
                    />
                    <Box p={6}>
                        <Heading as="h3" size="md" mb={4} color={cardTitleColor}>
                            Inclusividad en la Contratación
                        </Heading>
                        <Text fontSize="md" mb={4}>
                            La contratación de personas con inclusividad no solo es un imperativo ético, sino que también puede mejorar la diversidad y la productividad en el entorno laboral.
                        </Text>
                        <Text fontSize="sm">
                            La Ley de Inclusión en Chile obliga a las empresas con más de 100 empleados a contratar al menos un 1% de personas con discapacidad, promoviendo la igualdad de oportunidades y fomentando un ambiente más inclusivo.
                        </Text>
                    </Box>
                </Box>

                {/* Tarjeta 2: Seguro de Cesantía */}
                <Box bg={cardBg} borderRadius="lg" boxShadow="md" color={cardTextColor} overflow="hidden">
                    <Image
                        src={ImagenSeguroCesantia}
                        alt="Seguro de Cesantía"
                        objectFit="cover"
                        width="100%"
                        height="200px" // Altura fija para todas las imágenes
                    />
                    <Box p={6}>
                        <Heading as="h3" size="md" mb={4} color={cardTitleColor}>
                            ¿Qué es el Seguro de Cesantía?
                        </Heading>
                        <Text fontSize="md" mb={4}>
                            El seguro de cesantía es un beneficio que protege a los trabajadores en caso de desempleo, entregando un soporte económico mientras buscan un nuevo empleo.
                        </Text>
                        <Text fontSize="sm">
                            Este seguro cubre tanto a trabajadores con contrato indefinido como a plazo fijo. Es financiado por aportes de los empleadores, trabajadores y el Estado, siendo un mecanismo esencial para asegurar el bienestar de los empleados en tiempos de incertidumbre laboral.
                        </Text>
                    </Box>
                </Box>

                {/* Tarjeta 3: Importancia de la Mutualidad */}
                <Box bg={cardBg} borderRadius="lg" boxShadow="md" color={cardTextColor} overflow="hidden">
                    <Image
                        src={ImagenAccidenteLaboral}
                        alt="Importancia de la Mutualidad"
                        objectFit="cover"
                        width="100%"
                        height="200px" // Altura fija para todas las imágenes
                    />
                    <Box p={6}>
                        <Heading as="h3" size="md" mb={4} color={cardTitleColor}>
                            La Importancia de la Mutualidad
                        </Heading>
                        <Text fontSize="md" mb={4}>
                            La mutualidad es fundamental para asegurar la salud y seguridad en el trabajo, brindando cobertura en caso de accidentes laborales y enfermedades profesionales.
                        </Text>
                        <Text fontSize="sm">
                            Las mutualidades ofrecen capacitación preventiva, asesoría y apoyo a las empresas para reducir riesgos, promoviendo un entorno laboral seguro y protegiendo tanto a empleados como a empleadores frente a eventualidades.
                        </Text>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default DashboardInformacionAdicional;
