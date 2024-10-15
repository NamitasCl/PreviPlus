import { Button, ButtonGroup, Center, Flex, HStack, Image, Text } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import ImagenLogo from './assets/imagen-logo.png'

const AppLinks = [
    { id: 1, urlString: 'Inicio', url: '/' },
    { id: 2, urlString: 'Funcionalidades', url: 'funcionalidades' },
    { id: 3, urlString: 'Contacto', url: 'contacto' },

]

export default function Header() {
    return (
        <Center>
            <Flex height={20} alignItems={'center'} justifyContent={'space-between'} w={'full'} maxW={'1280px'}>
                <HStack>
                    <Image src={ImagenLogo} width={20} />
                    <Text fontSize={'3xl'} fontWeight={'bolder'}>
                        Previplus
                    </Text>
                </HStack>
                <Flex gap={4}>
                    {AppLinks.map(link => <NavLink to={link.url} key={link.id}>{link.urlString}</NavLink>)}
                </Flex>
                <ButtonGroup>
                    <Button as={NavLink} to={'ingreso'} colorScheme="green">Ingreso</Button>
                    <Button as={NavLink} to={'registro'} colorScheme="blue">Registro</Button>
                </ButtonGroup>

            </Flex>
        </Center>
    )
}