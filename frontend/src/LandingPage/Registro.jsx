import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useColorModeValue,
    useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Registro() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        firstlastname: '',
        secondlastname: '',
        username: '',
        email: '',
        password: ''
    })
    const toast = useToast()

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async () => {
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            toast({
                title: 'Cuenta creada',
                description: "Se ha creado satisfactoriamente su cuenta.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }

        if (!response.ok) {
            const jsonResponse = await response.json()

            toast({
                title: 'Error',
                description: jsonResponse.error,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Registrate en PreviPlus
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id='name'>
                            <FormLabel>Nombre</FormLabel>
                            <Input name='name' type='text' value={formData.name} onChange={handleChange} />
                        </FormControl>
                        <FormControl id='firstlastname'>
                            <FormLabel>Primer apellido</FormLabel>
                            <Input name='firstlastname' type='text' value={formData.firstlastname} onChange={handleChange} />
                        </FormControl>
                        <FormControl id='secondlastname'>
                            <FormLabel>Segundo apellido</FormLabel>
                            <Input name='secondlastname' type='text' value={formData.secondlastname} onChange={handleChange} />
                        </FormControl>
                        <FormControl id='username' isRequired>
                            <FormLabel>Nombre de usuario</FormLabel>
                            <Input name='username' type='text' value={formData.username} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input name='email' type="email" value={formData.email} onChange={handleChange} />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Contraseña</FormLabel>
                            <InputGroup>
                                <Input name='password' type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                onClick={handleSubmit}
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Regístrate
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Estás registrado? <NavLink to={'/ingreso'}>Ingresar</NavLink>
                            </Text>
                            <Text align={'center'}>
                                Volver al <NavLink to={'/'}>Inicio</NavLink>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}