import { Box, Container, Flex, Heading, Icon, Text, VStack, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { TbChecks, TbShieldCheck, TbTarget } from "react-icons/tb";

const Features = [
    { 
        id: 1, 
        title: "Previred", 
        icon: TbChecks,
        description: "Genera archivos compatibles con Previred de forma rápida y sencilla, ahorrando tiempo y reduciendo errores en tus procesos de nómina."
    },
    { 
        id: 2, 
        title: "Precisión", 
        icon: TbTarget,
        description: "Nuestro sistema garantiza cálculos precisos de sueldos y cotizaciones, minimizando errores y asegurando el cumplimiento normativo."
    },
    { 
        id: 3, 
        title: "Seguridad", 
        icon: TbShieldCheck,
        description: "Protegemos tus datos con las más avanzadas medidas de seguridad, garantizando la confidencialidad y el cumplimiento de las normativas de protección de datos."
    },
];

export default function FeaturesSection() {
    const bgColor = useColorModeValue('gray.50', 'gray.700');
    const boxBgColor = useColorModeValue('white', 'gray.600');
    const boxShadow = useColorModeValue('lg', 'dark-lg');

    return (
        <Box py={16} bg={bgColor}>
            <Container maxW={'1280px'}>
                <VStack spacing={12}>
                    <Heading as={'h2'} fontSize={'4xl'} textAlign="center">
                        Funcionalidades Destacadas
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} width="full">
                        {Features.map(feat => (
                            <Box 
                                key={feat.id} 
                                p={8} 
                                borderRadius="xl" 
                                boxShadow={boxShadow} 
                                bg={boxBgColor}
                                transition="all 0.3s"
                                _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
                            >
                                <VStack spacing={4} align="start">
                                    <Flex alignItems={'center'} gap={3}>
                                        <Icon as={feat.icon} boxSize={8} color="blue.500" />
                                        <Heading as="h3" fontSize="2xl">
                                            {feat.title}
                                        </Heading>
                                    </Flex>
                                    <Text>
                                        {feat.description}
                                    </Text>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>
        </Box>
    );
}