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
} from '@chakra-ui/react'
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import axios from 'axios';
import { useUserAuth } from '../contexto/UserContext';

export default function AdminPanel() {
 /*  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', status: 'Activo' },
    { id: 2, name: 'María García', email: 'maria@example.com', status: 'Inactivo' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', status: 'Activo' },
  ])

  const [businesses, setBusinesses] = useState([
    { id: 1, name: 'Negocio A', owner: 'Juan Pérez', employees: 5 },
    { id: 2, name: 'Negocio B', owner: 'María García', employees: 3 },
    { id: 3, name: 'Negocio C', owner: 'Carlos López', employees: 7 },
  ])

  const userStats = [
    { name: 'Ene', usuarios: 400 },
    { name: 'Feb', usuarios: 300 },
    { name: 'Mar', usuarios: 500 },
    { name: 'Abr', usuarios: 280 },
    { name: 'May', usuarios: 590 },
    { name: 'Jun', usuarios: 800 },
  ]

  const businessStats = [
    { name: 'Negocios', value: 55 },
    { name: 'Trabajadores', value: 310 },
    ] */

    const { user } = useUserAuth();
   
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
   
  const [users, setUsers] = useState([]); //Lista de usuarios
  const [businesses, setBusinesses] = useState([]); //Lista de negocios y cantidad de trabajadores
  const [userStats, setUserStats] = useState([]); //Estadísticas usuarios registrados por mes
  const [businessStats, setBusinessStats] = useState([]); //Estadística cantidad de negocios y trabajadores ingresados al sistema


  //Obtener lista de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      await axios.get('http://localhost:3000/api/stats/usuarios/list', 
          { withCredentials: true }
        ).then(response => {
          setUsers(response.data);
        })
      .catch(error => {
        console.error("Error al obtener lista de usuarios:", error);
      });
    }

    fetchUsers();

  }, []);
      
  //Obtener estadísticas de usuarios
  useEffect(() => {
    const fetchUserStats = async () => {
      await axios.get('http://localhost:3000/api/stats/usuarios/mes', 
          { withCredentials: true }
        ).then(response => {
          setUserStats(response.data);
        })
      .catch(error => {
        console.error("Error al obtener estadísticas de usuarios:", error);
      });
    }

    fetchUserStats();

  }, []);

  //Obtener estadísticas de negocios y trabajadores
  useEffect(() => {
    const fetchBusinessStats = async () => {
      await axios.get('http://localhost:3000/api/stats/negocios/', 
          { withCredentials: true }
        ).then(response => {
          setBusinessStats(response.data);
        })
      .catch(error => {
        console.error("Error al obtener estadísticas de negocios:", error);
      });
    }

    fetchBusinessStats();

  }, []);

  //Obtener lista de negocios y cantidad de trabajadores
  useEffect(() => {
    const fetchBusinesses = async () => {
      await axios.get('http://localhost:3000/api/stats/negocios/list', 
          { withCredentials: true }
        ).then(response => {
          setBusinesses(response.data);
        })
      .catch(error => {
        console.error("Error al obtener lista de negocios:", error);
      });
    }

    fetchBusinesses();

  }, []);

  const COLORS = ['#0088FE', '#00C49F']

  const handleResetPassword = (userId) => {
    console.log(`Resetear contraseña para usuario ${userId}`)
    // Implementar lógica para resetear contraseña
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
    // Implementar lógica para eliminar usuario en el backend
  }

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? {...user, status: user.status === 'Activo' ? 'Inactivo' : 'Activo'}
        : user
    ))
    // Implementar lógica para cambiar estado en el backend
  }

  return (
    <Container maxW="container.xl" py={5}>
      <Heading as="h1" size="xl" mb={6}>{`Bienvenido ${user.name} al Panel de Administración`}</Heading>
      <Tabs>
        <TabList mb={4}>
          <Tab>Estadísticas</Tab>
          <Tab>Usuarios</Tab>
          <Tab>Negocios</Tab>
          <Tab>Crear Usuario</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" gap={6}>
              <Card flex={1} minW={{ base: '100%', md: '45%' }}>
                <CardHeader>
                  <Heading size="md">Usuarios Registrados por Mes</Heading>
                </CardHeader>
                <CardBody>
                  <Box h="300px">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="usuarios" fill="blue.500" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>
              <Card flex={1} minW={{ base: '100%', md: '45%' }}>
                <CardHeader>
                  <Heading size="md">Distribución de Negocios y Trabajadores</Heading>
                </CardHeader>
                <CardBody>
                  <Box h="300px">
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
                  </Box>
                </CardBody>
              </Card>
              <Card flex={1} minW={{ base: '100%', md: '45%' }}>
                <CardHeader>
                  <Heading size="md">Tendencia de Ventas Mensuales</Heading>
                  <Text>Ingresos por generación de archivos de texto</Text>
                </CardHeader>
                <CardBody>
                  <Box h="300px">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={salesData}>
                        <CartesianGrid stroke='#ccc' strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ventas" stroke="#82ca9d" strokeWidth={2} name="Ventas" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardBody>
              </Card>
              <Card flex={1} minW={{ base: '100%', md: '45%' }}>
                <CardHeader>
                  <Heading size="md">Uso del Servicio por Mes</Heading>
                  <Text>Número de archivos generados mensualmente</Text>
                </CardHeader>
                <CardBody>
                  <Box h="300px">
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
                  </Box>
                </CardBody>
              </Card>
            </Flex>
          </TabPanel>
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
                            <Button size="sm" variant="outline" onClick={() => handleToggleUserStatus(user.id)}>
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
          <TabPanel>
            <Card>
              <CardHeader>
                <Heading size="md">Crear Nuevo Usuario</Heading>
                <Text>Añade un nuevo usuario al sistema</Text>
              </CardHeader>
              <CardBody>
                <form>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel htmlFor="name">Nombre</FormLabel>
                      <Input id="name" placeholder="Nombre completo" />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input id="email" type="email" placeholder="correo@ejemplo.com" />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Contraseña</FormLabel>
                      <Input id="password" type="password" />
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