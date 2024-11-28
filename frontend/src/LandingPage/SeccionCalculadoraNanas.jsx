
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaCalculator } from 'react-icons/fa'
import CalculadoraEcp from './assets/calculadora-ecp.jpg'
import { NavLink } from 'react-router-dom'

export default function DomesticWorkerCalculator() {
  const bgColor = useColorModeValue('blue.50', 'blue.900')
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const headingColor = useColorModeValue('blue.600', 'blue.300')

  return (
    <Box bg={bgColor} py={16}>
      <Container maxW={'1280px'}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={10} align={'center'}>
          <Box flex={1}>
            <Heading as="h2" size="2xl" color={headingColor} mb={6}>
              Calculadora Gratuita para Empleadas de Casa Particular
            </Heading>
            <Text fontSize="xl" color={textColor} mb={6}>
              Ofrecemos una herramienta gratuita para que los empleadores domésticos puedan:
            </Text>
            <Stack spacing={4}>
              <Flex align="center">
                <Icon as={FaCalculator} color="green.500" boxSize={5} mr={2} />
                <Text fontSize="lg">Calcular el costo total de una empleada doméstica</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaCalculator} color="green.500" boxSize={5} mr={2} />
                <Text fontSize="lg">Determinar sueldos y cotizaciones con precisión</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaCalculator} color="green.500" boxSize={5} mr={2} />
                <Text fontSize="lg">Cumplir con las normativas laborales vigentes</Text>
              </Flex>
            </Stack>
            <Button
              as={NavLink}
              to={'/calculadora'}
              mt={8}
              size="lg"
              colorScheme="blue"
              leftIcon={<FaCalculator />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Usar Calculadora Gratis
            </Button>
          </Box>
          <Box>
            <Image
              src={CalculadoraEcp}
              alt="Calculadora para Empleadas de Casa Particular"
              width={400}
              height={400}
              objectFit="cover"
              borderRadius="xl"
              boxShadow="2xl"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}