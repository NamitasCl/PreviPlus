import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../contexto/UserContext'

export default function Ingreso() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const toast = useToast()
    const { user, login } = useUserAuth();

    useEffect(() => {
        if (user) navigate("/dashboard")
    }, [])

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async () => {

        const response = login(formData)

        if (!response) {
            toast({
                title: 'Inicio de sesión fallido',
                description: 'Porfavor, inténtelo nuevamente',
                isClosable: true,
                duration: 4000,
                colorScheme: 'red'
            })
        } else {
            navigate('/dashboard')
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} minW={{ base: 'sm', md: 'xl' }} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Ingresa a PreviPlus</Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input name='email' type="email" value={formData.email} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Contraseña</FormLabel>
                            <Input name='password' type="password" value={formData.password} onChange={handleChange} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'column' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Recuérdame</Checkbox>
                                <Text color={'blue.400'}>Olvidó su contraseña?</Text>
                            </Stack>
                            <Button
                                onClick={handleSubmit}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Ingresar
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}