import { Box, Divider, Heading, Stat, StatGroup, StatLabel, StatNumber, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';

const Perfil = () => {
    // Estado inicial con datos mockup
    const [usuario, setUsuario] = useState({
        nombre_usuario: "enzoramirez",
        email: "enzo.ramirez@ejemplo.com",
        saldo_creditos: 100.00
    });

    const [negocios, setNegocios] = useState([
        {
            id: 1,
            rut_empresa: "76123456-7",
            nombre: "Negocio 1",
            direccion: "Calle 123, Ciudad X"
        },
        {
            id: 2,
            rut_empresa: "76123456-8",
            nombre: "Negocio 2",
            direccion: "Avenida 456, Ciudad Y"
        }
    ]);

    const [archivosPrevired, setArchivosPrevired] = useState([
        {
            id: 1,
            fecha_creacion: "2024-10-13",
            descripcion: "Archivo de octubre 2024"
        },
        {
            id: 2,
            fecha_creacion: "2024-09-13",
            descripcion: "Archivo de septiembre 2024"
        }
    ]);

    /*
    // useEffect para obtener los datos del perfil desde el backend
    useEffect(() => {
      const obtenerDatosPerfil = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/usuarios/perfil', { withCredentials: true });
          setUsuario(response.data.usuario);
          setNegocios(response.data.negocios);
          setArchivosPrevired(response.data.archivosPrevired);
        } catch (error) {
          console.error('Error al obtener datos del perfil:', error);
        }
      };
      obtenerDatosPerfil();
    }, []);
    */

    return (
        <Box maxW="1200px" mx="auto" p={6}>
            <Heading as="h1" size="xl" mb={6}>
                Perfil de Usuario
            </Heading>

            {/* Datos personales */}
            <Box bg="gray.100" p={4} borderRadius="md" mb={6}>
                <Heading as="h2" size="lg" mb={4}>
                    Datos Personales
                </Heading>
                <Text><strong>Nombre de Usuario:</strong> {usuario.nombre_usuario}</Text>
                <Text><strong>Email:</strong> {usuario.email}</Text>
                <Text><strong>Créditos disponibles:</strong> {usuario.saldo_creditos}</Text>
            </Box>

            {/* Estadísticas */}
            <StatGroup mb={6}>
                <Stat>
                    <StatLabel>Negocios</StatLabel>
                    <StatNumber>{negocios.length}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Archivos Previred creados</StatLabel>
                    <StatNumber>{archivosPrevired.length}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Créditos disponibles</StatLabel>
                    <StatNumber>{usuario.saldo_creditos}</StatNumber>
                </Stat>
            </StatGroup>

            <Divider mb={6} />

            {/* Lista de Negocios */}
            <Heading as="h2" size="lg" mb={4}>
                Negocios
            </Heading>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>RUT Empresa</Th>
                        <Th>Nombre</Th>
                        <Th>Dirección</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {negocios.map((negocio) => (
                        <Tr key={negocio.id}>
                            <Td>{negocio.rut_empresa}</Td>
                            <Td>{negocio.nombre}</Td>
                            <Td>{negocio.direccion}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Divider my={6} />

            {/* Lista de Archivos Previred */}
            <Heading as="h2" size="lg" mb={4}>
                Archivos Previred Creados
            </Heading>
            {archivosPrevired.length === 0 ? (
                <Text>No se han creado archivos Previred.</Text>
            ) : (
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Fecha de Creación</Th>
                            <Th>Descripción</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {archivosPrevired.map((archivo) => (
                            <Tr key={archivo.id}>
                                <Td>{archivo.id}</Td>
                                <Td>{archivo.fecha_creacion}</Td>
                                <Td>{archivo.descripcion}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

export default Perfil;
