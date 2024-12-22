
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Image,
  Text,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { HamburgerIcon } from '@chakra-ui/icons'
import ImagenLogo from './assets/imagen-logo.png'

/* const AppLinks = [
    { id: 1, urlString: 'Inicio', url: '/' },
    { id: 2, urlString: 'Funcionalidades', url: 'funcionalidades' },
    { id: 3, urlString: 'Contacto', url: 'contacto' },

] */

    export default function Header() {
        const bgColor = useColorModeValue('white', 'gray.800')
        const borderColor = useColorModeValue('gray.200', 'gray.700')
      
        return (
          <Box as="header" bg={bgColor} borderBottom={1} py={4} borderStyle={'solid'} borderColor={borderColor}>
            <Flex
              maxW={'1280px'}
              mx={'auto'}
              px={4}
              height={20}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <HStack spacing={4}>
                <Image src={ImagenLogo} alt="Previplus Logo" width={20} height={20} />
                <Text fontSize={'2xl'} fontWeight={'bold'} color={useColorModeValue('blue.600', 'blue.300')}>
                  Previplus
                </Text>
              </HStack>
      
              <ButtonGroup display={{ base: 'none', md: 'flex' }} spacing={4}>
                <Button as={NavLink} to={'ingreso'} colorScheme="green" size="md">
                  Ingreso
                </Button>
                <Button as={NavLink} to={'registro'} colorScheme="blue" size="md">
                  Registro
                </Button>
              </ButtonGroup>
      
              <Box display={{ base: 'block', md: 'none' }}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                  />
                  <MenuList>
                    <MenuItem as={NavLink} to={'ingreso'}>Ingreso</MenuItem>
                    <MenuItem as={NavLink} to={'registro'}>Registro</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
          </Box>
        )
      }