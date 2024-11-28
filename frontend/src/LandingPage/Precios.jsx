import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Container,
  useColorModeValue,
  ListIcon,
  List,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const PriceWrapper = ({ children }) => {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  )
}

PriceWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function PricingSection() {
  return (
    <Box py={12}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Planes de Precios Flexibles</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          Elija el plan que mejor se adapte a sus necesidades
        </Text>
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Free
            </Text>
            <Heading as="h3" fontSize="5xl" mt={2}>
              $0
            </Heading>
            <Text fontSize="3xl" fontWeight="600">
              /mes
            </Text>
          </Box>
          <Box bg={useColorModeValue('gray.50', 'gray.700')} py={4} px={12}>
            <ListWrapper spacing={3}>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Crear 1 negocio
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Máximo 5 trabajadores
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Creación de 1 archivo compatible con Previred
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Acceso a noticias periódicas
              </ListItem>
            </ListWrapper>
            <Button as={NavLink} to={'/registro'} mt={10} w={'full'} colorScheme={'blue'} variant={'outline'}>
              Comenzar gratis
            </Button>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('blue.300', 'blue.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Más Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Premium
              </Text>
              <Heading as="h3" fontSize="5xl" mt={2}>
                $20.000
              </Heading>
              <Text fontSize="3xl" fontWeight="600">
                /mes
              </Text>
            </Box>
            <Box bg={useColorModeValue('gray.50', 'gray.700')} py={4} px={12}>
              <ListWrapper spacing={3}>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  Creación de hasta 50 negocios
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  Agregar trabajadores en forma ilimitada
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  Acceso a nuevas funcionalidades en el futuro
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  Archivos Previred ilimitados
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.500" />
                  2 asesorías de normativa laboral y previsional
                </ListItem>
              </ListWrapper>
              <Button mt={10} w={'full'} colorScheme={'blue'}>
                Comenzar ahora
              </Button>
            </Box>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              A la medida
            </Text>
            <Heading as="h3" fontSize="5xl" mt={2}>
              Contactar
            </Heading>
            <Text fontSize="3xl" fontWeight="600">
              /mes
            </Text>
          </Box>
          <Box bg={useColorModeValue('gray.50', 'gray.700')} py={4} px={12}>
            <ListWrapper spacing={3}>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Todo lo incluido en Premium
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Soluciones hechas a la medida
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Incorporación de funcionalidades personalizadas
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                5 asesorías mensuales (no acumulables)
              </ListItem>
            </ListWrapper>
            <Button mt={10} w={'full'} colorScheme={'blue'} variant={'outline'}>
              Contactar ventas
            </Button>
          </Box>
        </PriceWrapper>
      </Stack>
    </Box>
  )
}


const ListItem = (props) => {
  const { children } = props
  return (
    <Text as="li" display="flex" alignItems="center" mb={2}>
      {children}
    </Text>
  )
}

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
}



const ListWrapper = ({ children }) => {
  return (
    <List as="ul" spacing={3} align="start">
      {children}
    </List>
  )
}

ListWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}