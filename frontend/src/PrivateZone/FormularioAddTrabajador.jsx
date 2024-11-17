import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { memo, useCallback, useReducer } from 'react'
import AutocompleteNacionalidad from '../components/AutoCompleteNacionalidad'

/* Componentes auxiliares */

const Section = memo(({ title, children, isOpen, onToggle }) => {
  return (
    <Card mb={4}>
      <CardHeader
        as="button"
        type="button"
        onClick={onToggle}
        cursor="pointer"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="md">{title}</Heading>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </CardHeader>
      {isOpen && <CardBody>{children}</CardBody>}
    </Card>
  )
})

Section.displayName = 'Section'

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

/* Componentes de campo memoizados */

const InputField = memo(({ label, id, name, value, onChange, ...props }) => {
  return (
    <FormControl {...props}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input id={id} name={name} value={value} onChange={onChange} type={props.type} />
    </FormControl>
  )
})

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
}

InputField.displayName = 'InputField'

const SelectField = memo(({ label, id, name, value, onChange, options, placeholder, ...props }) => {
  return (
    <FormControl {...props}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select id={id} name={name} value={value} onChange={onChange} placeholder={placeholder}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  )
})

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
}

SelectField.displayName = 'SelectField'

const TextareaField = memo(({ label, id, name, value, onChange, ...props }) => {
  return (
    <FormControl {...props}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Textarea id={id} name={name} value={value} onChange={onChange} />
    </FormControl>
  )
})

TextareaField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextareaField.displayName = 'TextareaField'

const SwitchField = memo(({ label, id, name, isChecked, onChange, ...props }) => {
  return (
    <FormControl display="flex" alignItems="center" {...props}>
      <FormLabel htmlFor={id} mb="0">
        {label}
      </FormLabel>
      <Switch id={id} name={name} isChecked={isChecked} onChange={onChange} />
    </FormControl>
  )
})

SwitchField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

SwitchField.displayName = 'SwitchField'

/* Reducer para manejar el estado del formulario */

const initialState = {
  personalInfo: {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    rut: '',
    dv: '',
    genero: 'masculino',
    fechaNacimiento: '',
    direccion: '',
    nacionalidad: '',
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
    otrasRentas: '',
    comisiones: false,
    colacion: '',
    movilizacion: '',
    asignacionFamiliar: false,
    tramoAsignacionFamiliar: '',
    resolucionAsignacionFamiliar: '',
    tiempoCompleto: false,
    pensionado: false,
  },
  previsionalInfo: {
    afp: '',
    salud: '',
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

/* Componentes funcionales de los formularios */

const InformacionPersonal = memo(({ isOpen, onToggle, onChange, data }) => (
  <Section title="Información Personal" isOpen={isOpen} onToggle={onToggle}>
    <Stack spacing={4}>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="nombre"
          name="nombre"
          label="Nombres"
          placeholder="Nombre"
          value={data.nombre}
          onChange={onChange}
          flex={1}
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="apellidoPaterno"
          name="apellidoPaterno"
          label="Apellido Paterno"
          placeholder="Apellido Paterno"
          value={data.apellidoPaterno}
          onChange={onChange}
          flex={1}
        />
        <InputField
          id="apellidoMaterno"
          name="apellidoMaterno"
          label="Apellido Materno"
          placeholder="Apellido Materno"
          value={data.apellidoMaterno}
          onChange={onChange}
          flex={1}
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="email"
          name="email"
          label="Correo Electrónico"
          placeholder="correo@ejemplo.com"
          value={data.email}
          onChange={onChange}
          type="email"
          flex={1}
        />
        <Flex w={{ base: '100%', md: '50%' }} gap={4}>
          <InputField
            id="rut"
            name="rut"
            label="Rut"
            placeholder="12345678-9"
            value={data.rut}
            onChange={onChange}
            type="text"
            w="70%"
          />
          <Text
            alignSelf={'center'}
            mt={6}
            fontSize="lg"
            color="gray.500"
            fontWeight={'bolder'}
          >
            -
          </Text>
          <InputField
            id="dv"
            name="dv"
            label="DV"
            value={data.dv}
            onChange={onChange}
            type="text"
            w="15%"
          />
        </Flex>
        <SelectField
          id="genero"
          name="genero"
          label="Género"
          value={data.genero}
          onChange={onChange}
          options={[
            { value: 'masculino', label: 'Masculino' },
            { value: 'femenino', label: 'Femenino' },
          ]}
          flex={1}
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="fechaNacimiento"
          name="fechaNacimiento"
          label="Fecha de Nacimiento"
          value={data.fechaNacimiento}
          onChange={onChange}
          type="date"
          flex={1}
        />
        <InputField
          id="direccion"
          name="direccion"
          label="Dirección"
          placeholder="Dirección"
          value={data.direccion}
          onChange={onChange}
          flex={1}
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4}>
        {/* Aquí debes ajustar el componente AutocompleteNacionalidad para que funcione con memo y useCallback */}
        <AutocompleteNacionalidad value={data.nacionalidad} onChange={onChange} />
        <InputField
          id="telefono"
          name="telefono"
          label="Teléfono"
          placeholder="+56 9 1234 5678"
          value={data.telefono}
          onChange={onChange}
          type="tel"
          flex={1}
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="numeroCuenta"
          name="numeroCuenta"
          label="Número de Cuenta"
          placeholder="Número de Cuenta"
          value={data.numeroCuenta}
          onChange={onChange}
          flex={1}
        />
        <InputField
          id="banco"
          name="banco"
          label="Banco"
          placeholder="Banco"
          value={data.banco}
          onChange={onChange}
          flex={1}
        />
        <SwitchField
          id="isCorriente"
          name="isCorriente"
          label="Cta. Corriente"
          isChecked={data.isCorriente}
          onChange={(e) => {
            onChange(e)
            if (e.target.checked) {
              onChange({
                target: { name: 'isVista', value: false },
              })
            }
          }}
          isDisabled={data.isVista}
          flex={1}
        />
        <SwitchField
          id="isVista"
          name="isVista"
          label="Cta. Vista"
          isChecked={data.isVista}
          onChange={(e) => {
            onChange(e)
            if (e.target.checked) {
              onChange({
                target: { name: 'isCorriente', value: false },
              })
            }
          }}
          isDisabled={data.isCorriente}
          flex={1}
        />
      </Flex>
      <TextareaField
        id="observaciones"
        name="observaciones"
        label="Observaciones"
        placeholder="Observaciones adicionales"
        value={data.observaciones}
        onChange={onChange}
      />
    </Stack>
  </Section>
))

InformacionPersonal.displayName = 'InformacionPersonal'

InformacionPersonal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

/* InformacionContractual */

const InformacionContractual = memo(({ isOpen, onToggle, onChange, data }) => (
  <Section title="Información Contractual" isOpen={isOpen} onToggle={onToggle}>
    <Stack spacing={4}>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="puesto"
          name="puesto"
          label="Puesto"
          placeholder="Puesto"
          value={data.puesto}
          onChange={onChange}
          flex={1}
        />
        <InputField
          id="departamento"
          name="departamento"
          label="Departamento"
          placeholder="Departamento"
          value={data.departamento}
          onChange={onChange}
          flex={1}
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="fechaInicio"
          name="fechaInicio"
          label="Fecha de Inicio"
          value={data.fechaInicio}
          onChange={onChange}
          type="date"
          flex={1}
        />
        <SelectField
          id="tipoContrato"
          name="tipoContrato"
          label="Tipo de Contrato"
          placeholder="Seleccionar tipo de contrato"
          value={data.tipoContrato}
          onChange={onChange}
          options={[
            { value: 'indefinido', label: 'Indefinido' },
            { value: 'plazoFijo', label: 'Plazo Fijo' },
            { value: 'honorarios', label: 'Honorarios' },
          ]}
          flex={1}
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4} alignItems="center">
        <InputField
          id="salario"
          name="salario"
          label="Sueldo base"
          placeholder="Salario"
          value={data.salario}
          onChange={onChange}
          type="number"
          w="30%"
        />
        <SwitchField
          id="tiempoCompleto"
          name="tiempoCompleto"
          label="Tiempo Completo"
          isChecked={data.tiempoCompleto}
          onChange={onChange}
          w="30%"
        />
        <SwitchField
          id="pensionado"
          name="pensionado"
          label="Pensionado"
          isChecked={data.pensionado}
          onChange={onChange}
          w="20%"
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4} alignItems="center">
        <SelectField
          id="tramoAsignacionFamiliar"
          name="tramoAsignacionFamiliar"
          label="Asignación Familiar"
          placeholder="Seleccionar Tramo"
          value={data.tramoAsignacionFamiliar}
          onChange={onChange}
          options={[
            { value: 'A', label: 'Tramo A' },
            { value: 'B', label: 'Tramo B' },
            { value: 'C', label: 'Tramo C' },
            { value: 'D', label: 'Tramo D' },
          ]}
          isDisabled={!data.asignacionFamiliar}
          w="30%"
        />
        <InputField
          id="resolucionAsignacionFamiliar"
          name="resolucionAsignacionFamiliar"
          label="Resolución asignación familiar"
          placeholder="Número de Resolución"
          value={data.resolucionAsignacionFamiliar}
          onChange={onChange}
          isDisabled={!data.asignacionFamiliar}
          w="40%"
        />
        <SwitchField
          id="asignacionFamiliar"
          name="asignacionFamiliar"
          label="Recibe Asignación Familiar"
          isChecked={data.asignacionFamiliar}
          onChange={onChange}
          flex={1}
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4} alignItems="center">
        <InputField
          id="otrasRentas"
          name="otrasRentas"
          label="Otras rentas"
          placeholder="Otras rentas"
          value={data.otrasRentas}
          onChange={onChange}
          type="number"
          flex={1}
        />
        <SwitchField
          id="comisiones"
          name="comisiones"
          label="¿Sujeto a comisiones?"
          isChecked={data.comisiones}
          onChange={onChange}
          flex={1}
        />
      </Flex>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="colacion"
          name="colacion"
          label="Colación"
          placeholder="Colación"
          value={data.colacion}
          onChange={onChange}
          type="number"
          flex={1}
        />
        <InputField
          id="movilizacion"
          name="movilizacion"
          label="Movilización"
          placeholder="Movilización"
          value={data.movilizacion}
          onChange={onChange}
          type="number"
          flex={1}
        />
      </Flex>
    </Stack>
  </Section>
))

InformacionContractual.displayName = 'InformacionContractual'

InformacionContractual.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

/* InformacionPrevisional */

const InformacionPrevisional = memo(({ isOpen, onToggle, onChange, data }) => (
  <Section title="Información Previsional" isOpen={isOpen} onToggle={onToggle}>
    <Stack spacing={4}>
      <Flex direction={['column', 'row']} gap={4}>
        <SelectField
          id="afp"
          name="afp"
          label="AFP"
          placeholder="Seleccionar AFP"
          value={data.afp}
          onChange={onChange}
          options={[
            { value: 'capital', label: 'Capital' },
            { value: 'cuprum', label: 'Cuprum' },
            { value: 'habitat', label: 'Habitat' },
            { value: 'planvital', label: 'PlanVital' },
            { value: 'provida', label: 'ProVida' },
            { value: 'modelo', label: 'Modelo' },
            { value: 'uno', label: 'Uno' },
          ]}
          flex={1}
        />
        <SelectField
          id="salud"
          name="salud"
          label="Salud"
          placeholder="Seleccionar Institución de Salud"
          value={data.salud}
          onChange={onChange}
          options={[
            { value: 'banmedica', label: 'Banmédica' },
            { value: 'colmena', label: 'Colmena' },
            { value: 'cruzblanca', label: 'Cruz Blanca' },
            { value: 'nuevamasvida', label: 'Nueva Masvida' },
            { value: 'consalud', label: 'Consalud' },
            { value: 'vidatres', label: 'Vida Tres' },
            { value: 'fonasa', label: 'Fonasa' },
          ]}
          flex={1}
        />
      </Flex>
      {data.salud && data.salud !== 'fonasa' && (
        <>
          <InputField
            id="numeroFun"
            name="numeroFun"
            label="FUN"
            placeholder="Número de Contrato de Salud"
            value={data.numeroFun}
            onChange={onChange}
            flex={1}
          />
          <InputField
            id="cotizacionPactada"
            name="cotizacionPactada"
            label="Cotización pactada"
            placeholder="Cotización pactada"
            value={data.cotizacionPactada}
            onChange={onChange}
            flex={1}
          />
          <SelectField
            id="tipoMoneda"
            name="tipoMoneda"
            label="Tipo de Moneda"
            value={data.tipoMoneda}
            onChange={onChange}
            options={[
              { value: 'clp', label: 'Pesos' },
              { value: 'uf', label: 'Unidades de Fomento' },
            ]}
            flex={1}
          />
        </>
      )}
    </Stack>
  </Section>
))

InformacionPrevisional.displayName = 'InformacionPrevisional'

InformacionPrevisional.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

/* OtraInformacion */

const OtraInformacion = memo(({ isOpen, onToggle, onChange, data }) => (
  <Section title="Otra Información" isOpen={isOpen} onToggle={onToggle}>
    <Stack spacing={4}>
      <TextareaField
        id="habilidades"
        name="habilidades"
        label="Habilidades"
        placeholder="Lista de habilidades"
        value={data.habilidades}
        onChange={onChange}
      />
      <TextareaField
        id="educacion"
        name="educacion"
        label="Educación"
        placeholder="Historial educativo"
        value={data.educacion}
        onChange={onChange}
      />
      <TextareaField
        id="certificaciones"
        name="certificaciones"
        label="Certificaciones"
        placeholder="Certificaciones obtenidas"
        value={data.certificaciones}
        onChange={onChange}
      />
      <SwitchField
        id="disponibleTraslado"
        name="disponibleTraslado"
        label="Disponible para Traslado"
        isChecked={data.disponibleTraslado}
        onChange={onChange}
      />
    </Stack>
  </Section>
))

OtraInformacion.displayName = 'OtraInformacion'

OtraInformacion.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

export default function FormularioEmpleado() {
  const [state, dispatch] = useReducer(reducer, initialState)

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
      dispatch({
        type: 'updateField',
        section: 'previsionalInfo',
        name,
        value: type === 'checkbox' ? checked : value,
      })
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

  const handleSubmit = (e) => {
    e.preventDefault()

    // Aquí puedes manejar el envío del formulario
    console.log('Formulario enviado', state)
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
