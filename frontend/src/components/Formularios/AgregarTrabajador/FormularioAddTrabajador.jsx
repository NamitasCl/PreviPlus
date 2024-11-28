import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useReducer } from 'react'
import { InformacionPersonal } from './InformacionPersonal'
import { InformacionContractual } from './InformacionContractual'
import { InformacionPrevisional } from './InformacionPrevisional'
import { OtraInformacion } from './OtraInformacion'
import axios from 'axios'
import PropTypes from 'prop-types'

/* Reducer para manejar el estado del formulario */

const initialState = {
  personalInfo: {
    names: '',
    patlastname: '',
    matlastname: '',
    email: '',
    rut: '',
    dv: '',
    genero: 'masculino',
    fechaNacimiento: '',
    direccion: '',
    nationality: '',
    telefono: '',
    numeroCuenta: '',
    banco: '',
    observaciones: '',
    isCorriente: false,
    isVista: false,
  },
  contractualInfo: {
    puesto: '',
    departamento: '',
    fechaInicio: '',
    tipoContrato: '',
    salario: '',
    colacion: '',
    movilizacion: '',
    asignacionFamiliar: false,
    tramoAsignacionFamiliar: '',
    resolucionAsignacionFamiliar: '',
    tiempoCompleto: false,
    tipoTrabajador: '',
  },
  previsionalInfo: {
    afp: '',
    codigoAfp: '',       // Añadido
    salud: '',
    codigoSalud: '',     // Añadido
    numeroFun: '',
    cotizacionPactada: '',
    tipoMoneda: '',
  },
  otraInfo: {
    habilidades: '',
    educacion: '',
    certificaciones: '',
    disponibleTraslado: false,
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.name]: action.value,
        },
      }
    default:
      return state
  }
}

export default function FormularioEmpleado({negocioId, onTrabajadorAdded}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log("Negocio ID:",negocioId)
  const handlePersonalInfoChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target
      dispatch({
        type: 'updateField',
        section: 'personalInfo',
        name,
        value: type === 'checkbox' ? checked : value,
      })
    },
    [dispatch]
  )

  const handleContractualInfoChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target
      dispatch({
        type: 'updateField',
        section: 'contractualInfo',
        name,
        value: type === 'checkbox' ? checked : value,
      })
    },
    [dispatch]
  )

  const handlePrevisionalInfoChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target
  
      if (name === 'afp') {
        if (value && value.includes('-')) {
          const [codigoAfp, afp] = value.split('-')
          dispatch({
            type: 'updateField',
            section: 'previsionalInfo',
            name: 'afp',
            value: afp,
          })
          dispatch({
            type: 'updateField',
            section: 'previsionalInfo',
            name: 'codigoAfp',
            value: codigoAfp,
          })
        } else {
          // Manejo de valores inválidos
          dispatch({
            type: 'updateField',
            section: 'previsionalInfo',
            name: 'afp',
            value: '',
          })
          dispatch({
            type: 'updateField',
            section: 'previsionalInfo',
            name: 'codigoAfp',
            value: '',
          })
        }
      } else if (name === 'salud') {
        if (value && value.includes('-')) {
          const [codigoSalud, salud] = value.split('-')
          dispatch({
            type: 'updateField',
            section: 'previsionalInfo',
            name: 'salud',
            value: salud,
          })
          dispatch({
            type: 'updateField',
            section: 'previsionalInfo',
            name: 'codigoSalud',
            value: codigoSalud,
          })
        } else {
          // Manejo de valores inválidos
          dispatch({
            type: 'updateField',
            section: 'previsionalInfo',
            name: 'salud',
            value: '',
          })
          dispatch({
            type: 'updateField',
            section: 'previsionalInfo',
            name: 'codigoSalud',
            value: '',
          })
        }
      } else {
        dispatch({
          type: 'updateField',
          section: 'previsionalInfo',
          name,
          value: type === 'checkbox' ? checked : value,
        })
      }
    },
    [dispatch]
  )

  const handleOtraInfoChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target
      dispatch({
        type: 'updateField',
        section: 'otraInfo',
        name,
        value: type === 'checkbox' ? checked : value,
      })
    },
    [dispatch]
  )

  const personal = useDisclosure()
  const contractual = useDisclosure()
  const previsional = useDisclosure()
  const otra = useDisclosure()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Aquí puedes manejar el envío del formulario
    console.log('Formulario enviado', { ...state, negocioId })
    await axios.post('http://localhost:3000/api/trabajadores', { ...state, negocioId }, { withCredentials: true })
      .then(response => {
        console.log('Formulario enviado exitosamente', response.data)
        onTrabajadorAdded(state)
      })
      .catch(error => {
        console.error('Error al enviar el formulario:', error)
      })
  }

  return (
    <Box as="form" onSubmit={handleSubmit} maxWidth="6xl" margin="auto" padding={4}>
      <VStack spacing={4} align="stretch">
        <Card>
          <CardHeader>
            <Heading size="lg">Formulario de contratación</Heading>
          </CardHeader>
          <CardBody>
            <Box>
              Complete la información del empleado contratado en las siguientes secciones.
            </Box>
          </CardBody>
        </Card>

        <InformacionPersonal
          isOpen={personal.isOpen}
          onToggle={personal.onToggle}
          onChange={handlePersonalInfoChange}
          data={state.personalInfo}
        />
        <InformacionContractual
          isOpen={contractual.isOpen}
          onToggle={contractual.onToggle}
          onChange={handleContractualInfoChange}
          data={state.contractualInfo}
        />
        <InformacionPrevisional
          isOpen={previsional.isOpen}
          onToggle={previsional.onToggle}
          onChange={handlePrevisionalInfoChange}
          data={state.previsionalInfo}
        />
        <OtraInformacion
          isOpen={otra.isOpen}
          onToggle={otra.onToggle}
          onChange={handleOtraInfoChange}
          data={state.otraInfo}
        />

        <Button colorScheme="blue" width="20%" type="submit">
          Guardar Información
        </Button>
      </VStack>
    </Box>
  )
}

FormularioEmpleado.propTypes = {
  negocioId: PropTypes.number,
  onTrabajadorAdded: PropTypes.func,
}
