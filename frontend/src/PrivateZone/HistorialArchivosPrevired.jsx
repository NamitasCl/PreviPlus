import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  useColorModeValue,
  TableContainer,
} from '@chakra-ui/react';
import axios from 'axios';
import { useUserAuth } from '../contexto/UserContext';

const MESES = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',  
  12: 'Diciembre',
}

const HistorialArchivosPrevired = () => {
  const { user } = useUserAuth();
  const [archivos, setArchivos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [filtroNegocio, setFiltroNegocio] = useState('');
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroAno, setFiltroAno] = useState('');

  const tableBgColor = useColorModeValue('gray.50', 'gray.800');
  const tableTextColor = useColorModeValue('gray.900', 'gray.50');
  const buttonBgColor = useColorModeValue('teal.500', 'teal.300');
  const buttonTextColor = useColorModeValue('white', 'gray.800');

    useEffect(() => {
        const fetchData = async () => {
        try {
            const negociosResponse = await axios.get(`http://localhost:3000/api/negocios/${user.id}`, { withCredentials: true });
            setNegocios(negociosResponse.data);
            console.log(negociosResponse.data)
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        if (user && user.id) fetchData();
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            axios.post('http://localhost:3000/api/archprev/info', 
                { 
                    idNegocio: filtroNegocio,
                    mes: filtroMes,
                    anio: filtroAno
                },
                { 
                    withCredentials: true 
                })
                .then(response => {
                    setArchivos(response.data);
                    console.log(response.data)
                })
        }

        if (filtroNegocio !== '' || filtroMes !== '' || filtroAno !== '') fetchData();

        if (filtroNegocio === '' || filtroMes === '' || filtroAno === '') setArchivos([]);
    }, [filtroAno, filtroMes, filtroNegocio]);

  
  const descargarArchivo = async (archivoId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/archprev/descarga/${archivoId}`, {
        responseType: 'Blob',
        withCredentials: true
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `archivo_previred_${archivoId}.txt`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  const borrarArchivo = async (archivoId) => {
    try {
      await axios.delete(`http://localhost:3000/api/archprev/descarga/${archivoId}`, { withCredentials: true });
      setArchivos(archivos.filter(archivo => archivo.id !== archivoId));
    } catch (error) {
      console.error('Error al borrar el archivo:', error);
    }
  };

  /* const archivosFiltrados = archivos.filter(archivo => {
    const fecha = new Date(archivo.fecha);
    return (
      (!filtroNegocio || archivo.negocioId === filtroNegocio) &&
      (!filtroMes || fecha.getMonth() + 1 === parseInt(filtroMes)) &&
      (!filtroAno || fecha.getFullYear() === parseInt(filtroAno))
    );
  }); */

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" mb={6}>
        <Heading as="h2" size="lg" color={tableTextColor}>
          Historial de Archivos Previred
        </Heading>
      </Flex>

      <Flex mb={4} gap={4}>
        <Select
          placeholder="Filtrar por negocio"
          value={filtroNegocio}
          onChange={(e) => setFiltroNegocio(e.target.value)}
        >
          {negocios.map(negocio => (
            <option key={negocio.id} value={negocio.id}>{negocio.negocioName}</option>
          ))}
        </Select>
        <Select
          placeholder="Filtrar por mes"
          value={filtroMes}
          onChange={(e) => setFiltroMes(e.target.value)}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </Select>
        <Select
          placeholder="Filtrar por año"
          value={filtroAno}
          onChange={(e) => setFiltroAno(e.target.value)}
        >
          {[...Array(5)].map((_, i) => {
            const year = new Date().getFullYear() - i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </Select>
      </Flex>

      <TableContainer>
        <Table size="lg" variant="simple" colorScheme="blue" bg={tableBgColor}>
          <Thead>
            <Tr>
              <Th color={tableTextColor}>Negocio</Th>
              <Th color={tableTextColor}>Mes de Archivo Previred</Th>
              <Th color={tableTextColor}>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {archivos.map(archivo => {
              const negocio = negocios.find(n => n.id === archivo.negocio.id);
              const fechaArchivo = new Date(archivo.fecha).toLocaleString().split(',')[0]
              const mesArchivo = fechaArchivo.split('/')[1]
              const anioArchivo = fechaArchivo.split('/')[2]
              return (
                <Tr key={archivo.id}>
                  <Td>{negocio ? negocio.negocioName : 'Desconocido'}</Td>
                  <Td>{`${MESES[mesArchivo]} ${anioArchivo}`}</Td>
                  <Td>
                    <Button
                      colorScheme="teal"
                      size="sm"
                      bg={buttonBgColor}
                      color={buttonTextColor}
                      onClick={() => descargarArchivo(archivo.id, negocio.name)}
                      mr={2}
                    >
                      Descargar
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => borrarArchivo(archivo.id)}
                    >
                      Borrar
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistorialArchivosPrevired;

