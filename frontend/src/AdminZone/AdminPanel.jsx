'use client'

import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import axios from 'axios';
import { useUserAuth } from '../contexto/UserContext';

export default function AdminPanel() {
  const { user } = useUserAuth();

  // Datos de ventas y uso del servicio (pueden ser estáticos o dinámicos)
  const salesData = [
    { month: 'Ene', ventas: 1200 },
    { month: 'Feb', ventas: 1900 },
    { month: 'Mar', ventas: 1500 },
    { month: 'Abr', ventas: 2200 },
    { month: 'May', ventas: 2800 },
    { month: 'Jun', ventas: 2500 },
    { month: 'Jul', ventas: 3000 },
    { month: 'Ago', ventas: 3200 },
    { month: 'Sep', ventas: 3500 },
    { month: 'Oct', ventas: 3800 },
    { month: 'Nov', ventas: 4000 },
    { month: 'Dic', ventas: 4500 },
  ]

  const usageData = [
    { month: 'Ene', archivos: 500 },
    { month: 'Feb', archivos: 700 },
    { month: 'Mar', archivos: 600 },
    { month: 'Abr', archivos: 800 },
    { month: 'May', archivos: 1000 },
    { month: 'Jun', archivos: 900 },
    { month: 'Jul', archivos: 1100 },
    { month: 'Ago', archivos: 1200 },
    { month: 'Sep', archivos: 1300 },
    { month: 'Oct', archivos: 1400 },
    { month: 'Nov', archivos: 1500 },
    { month: 'Dic', archivos: 1700 },
  ]

  // Estados para almacenar datos de usuarios y negocios
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [businesses, setBusinesses] = useState([]); // Lista de negocios y cantidad de trabajadores
  const [userStats, setUserStats] = useState([]); // Estadísticas usuarios registrados por mes
  const [businessStats, setBusinessStats] = useState([]); // Estadística cantidad de negocios y trabajadores ingresados al sistema

  const toast = useToast();
  // Obtener lista de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats/usuarios/list', { withCredentials: true });
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener lista de usuarios:", error);
      }
    }

    fetchUsers();
  }, []);

  // Obtener estadísticas de usuarios
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats/usuarios/mes', { withCredentials: true });
        setUserStats(response.data);
      } catch (error) {
        console.error("Error al obtener estadísticas de usuarios:", error);
      }
    }

    fetchUserStats();
  }, []);

  // Obtener estadísticas de negocios y trabajadores
  useEffect(() => {
    const fetchBusinessStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats/negocios/', { withCredentials: true });
        setBusinessStats(response.data);
      } catch (error) {
        console.error("Error al obtener estadísticas de negocios:", error);
      }
    }

    fetchBusinessStats();
  }, []);

  // Obtener lista de negocios y cantidad de trabajadores
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats/negocios/list', { withCredentials: true });
        setBusinesses(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error al obtener lista de negocios:", error);
      }
    }

    fetchBusinesses();
  }, []);

  const COLORS = ['#0088FE', '#00C49F']

  // Funciones para manejar acciones de usuarios
  const handleResetPassword = async (userId) => {
    const user = await axios.get(`http://localhost:3000/api/usuarios/${userId}`, { withCredentials: true }).then(response => response.data);
    console.log(user);
    
    toast({
      title: "Contraseña Restablecida",
      description: `La contraseña de ${user.name} ${user.firstlastname} ${user.secondlastname} ha sido restablecida correctamente y se ha enviado a su correo electrónico.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Implementar lógica para resetear contraseña
  }

  const handleDeleteUser = async (userId) => {

    const user = await axios.get(`http://localhost:3000/api/usuarios/${userId}`, { withCredentials: true }).then(response => response.data);
    console.log(user);
    
    toast({
      title: "Usuario Eliminado",
      description: `El usuario ${user.name} ${user.firstlastname} ${user.secondlastname} ha sido eliminado correctamente.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setUsers(users.filter(user => user.id !== userId))
    // Implementar lógica para eliminar usuario en el backend
  }

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'Activo' ? 'Inactivo' : 'Activo' }
        : user
    ))
    // Implementar lógica para cambiar estado en el backend
  }

  // Nueva función para cambiar el rol del usuario
  const handleToggleUserRole = (userId) => {
    
    toast({
      title: "Rol Cambiado",
      description: `El rol de ${user.name} ${user.firstlastname} ${user.secondlastname} ha sido cambiado correctamente.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, rol: user.rol === 'administrador' ? 'usuario' : 'administrador' }
        : user
    ))
    // Implementar lógica para cambiar rol en el backend
  }

  return (
    <Container maxW="container.xl" py={5}>
      <Heading as="h1" size="xl" mb={6}>{`Bienvenido ${user.name} al Panel de Administración`}</Heading>
      <Tabs isFitted variant="enclosed">
        <TabList mb={4}>
          <Tab>Estadísticas</Tab>
          <Tab>Usuarios</Tab>
          <Tab>Negocios</Tab>
          <Tab>Crear Usuario</Tab>
        </TabList>
        <TabPanels>
          {/* Estadísticas */}
          <TabPanel>
            <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" gap={6}>
              {/* Usuarios Registrados por Mes */}
              <Card flex={1} minW={{ base: '100%', md: '45%' }} h="400px">
                <CardHeader>
                  <Heading size="md">Usuarios Registrados por Mes</Heading>
                </CardHeader>
                <CardBody>
                  <Box h="100%">
                    {userStats && userStats.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userStats}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="usuarios" fill="#3182CE" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <Text>No hay datos disponibles</Text>
                    )}
                  </Box>
                </CardBody>
              </Card>

              {/* Distribución de Negocios y Trabajadores */}
              <Card flex={1} minW={{ base: '100%', md: '45%' }} h="400px">
                <CardHeader>
                  <Heading size="md">Distribución de Negocios y Trabajadores</Heading>
                </CardHeader>
                <CardBody>
                  <Box h="100%">
                    {businessStats && businessStats.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={businessStats}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {businessStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <Text>No hay datos disponibles</Text>
                    )}
                  </Box>
                </CardBody>
              </Card>

              {/* Tendencia de Ventas Mensuales */}
              <Card flex={1} minW={{ base: '100%', md: '45%' }} h="400px">
                <CardHeader>
                  <Heading size="md">Tendencia de Ventas Mensuales</Heading>
                  <Text>Ingresos por generación de archivos de texto</Text>
                </CardHeader>
                <CardBody>
                  <Box h="100%">
                    {salesData && salesData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="ventas" stroke="#82ca9d" strokeWidth={2} name="Ventas" />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <Text>No hay datos disponibles</Text>
                    )}
                  </Box>
                </CardBody>
              </Card>

              {/* Uso del Servicio por Mes */}
              <Card flex={1} minW={{ base: '100%', md: '45%' }} h="400px">
                <CardHeader>
                  <Heading size="md">Uso del Servicio por Mes</Heading>
                  <Text>Número de archivos generados mensualmente</Text>
                </CardHeader>
                <CardBody>
                  <Box h="100%">
                    {usageData && usageData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={usageData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="archivos" fill="#8884d8" name="Archivos Generados" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <Text>No hay datos disponibles</Text>
                    )}
                  </Box>
                </CardBody>
              </Card>
            </Flex>
          </TabPanel>

          {/* Gestión de Usuarios */}
          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Gestión de Usuarios</Heading>
                <Text>Administra los usuarios del sistema</Text>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Nombre</Th>
                      <Th>Email</Th>
                      <Th>Estado</Th>
                      <Th>Acciones</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.map((user) => (
                      <Tr key={user.id}>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.status}</Td>
                        <Td>
                          <Flex gap={2}>
                            <Button size="sm" onClick={() => handleResetPassword(user.id)}>
                              Resetear Contraseña
                            </Button>
                            <Button size="sm" colorScheme="red" onClick={() => handleDeleteUser(user.id)}>
                              Eliminar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleToggleUserStatus(user.id)}>
                              {user.status === 'Activo' ? 'Deshabilitar' : 'Habilitar'}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleToggleUserRole(user.id)}>
                              {user.rol === 'admin' ? 'Cambiar a perfil usuario' : 'Hacer administrador'}
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Negocios */}
          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Negocios y Trabajadores</Heading>
                <Text>Vista general de negocios y sus trabajadores</Text>
              </CardHeader>
              <CardBody>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Nombre del Negocio</Th>
                      <Th>Propietario</Th>
                      <Th>Número de Trabajadores</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {businesses.map((business) => (
                      <Tr key={business.id}>
                        <Td>{business.name}</Td>
                        <Td>{business.owner}</Td>
                        <Td>{business.employees}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Crear Usuario */}
          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Crear Nuevo Usuario</Heading>
                <Text>Añade un nuevo usuario al sistema</Text>
              </CardHeader>
              <CardBody>
                <form>
                  <VStack spacing={4} align="stretch" w={'md'}>
                    <FormControl>
                      <FormLabel htmlFor="name">Nombre</FormLabel>
                      <Input id="name" placeholder="Nombre completo" required />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="name">Apellido Paterno</FormLabel>
                      <Input id="firstlastname" placeholder="Apellido Paterno" required />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="name">Apellido Materno</FormLabel>
                      <Input id="secondlastname" placeholder="Apellido Materno" required />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="name">Nombre de usuario</FormLabel>
                      <Input id="username" placeholder="Nombre de usuario" required />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Contraseña</FormLabel>
                      <Input id="password" type="password" required />
                    </FormControl>
                    <Button type="submit" colorScheme="blue">
                      Crear Usuario
                    </Button>
                  </VStack>
                </form>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}
