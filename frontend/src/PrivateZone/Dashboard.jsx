import {
    Avatar,
    Box,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { BsFillPeopleFill } from 'react-icons/bs'
import { FcBusiness, FcHome } from 'react-icons/fc'
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi'
import { NavLink, Outlet } from 'react-router-dom'
import { useUserAuth } from '../contexto/UserContext'


const LinkItems = [
    { name: 'Inicio', icon: FcHome, href: '/dashboard' },
    { name: 'Negocios', icon: FcBusiness, href: 'negocios' },
    { name: 'Archivos Previred', icon: FcBusiness, href: 'previred' },
    { name: 'Perfil', icon: BsFillPeopleFill, href: 'perfil' },
]

const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    PreviPlus
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavLink key={link.name} to={link.href}>
                    <Flex
                        align="center"
                        p="4"
                        mx="4"
                        borderRadius="lg"
                        role="group"
                        cursor="pointer"
                        _hover={{
                            bg: 'cyan.400',
                            color: 'white',
                        }}
                        {...rest}>
                        {link.icon && (
                            <Icon
                                mr="4"
                                fontSize="16"
                                _groupHover={{
                                    color: 'white',
                                }}
                                as={link.icon}
                            />
                        )}
                        {link.name}
                    </Flex>

                </NavLink>
            ))}
        </Box>
    )
}

SidebarContent.propTypes = {
    onClose: PropTypes.func.isRequired
}

const NavItem2 = ({ to, icon, children, ...rest }) => {
    return (
        <Box
            as="a"
            href={to}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    )
}

NavItem2.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.element,
    children: PropTypes.node.isRequired,
}

const MobileNav = ({ onOpen, ...rest }) => {

    const { user, logout } = useUserAuth();

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Logo
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    name={user ? `${user.name} ${user.firstLastName}` : 'Error de carga'}
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{user ? `${user.name} ${user.firstLastName}` : 'Error de carga'}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        `Administrador (Cambiar)`
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Perfil</MenuItem>
                            <MenuItem>Créditos</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

MobileNav.propTypes = {
    onOpen: PropTypes.func.isRequired,
}

const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (

        <Box maxW={'1400px'} minH="100vh" >

            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Outlet />
            </Box>
        </Box>
    )
}

export default Dashboard