import { Flex, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { memo } from 'react'
import { InputField, SelectField, Section, SwitchField } from './ComponentesFormularios'

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
            label="Sueldo Imponible"
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
          <SelectField
            id="tipoTrabajador"
            name="tipoTrabajador"
            label="Tipo de Trabajador"
            placeholder="Seleccionar una opción"
            value={data.tipoTrabajador}
            onChange={onChange}
            options={[
              { value: "0", label: 'Activo (No pensionado)' },
              { value: "1", label: 'Pensionado y cotiza' },
              { value: "2", label: 'Pensionado y no cotiza' },
              { value: "3", label: 'Activo > 65 años (nunca pensionado)' },
              { value: "8", label: 'Exento de cotizar (Mujer > 60, Hombre > 65 o Extranjero)' },
            ]}
            w="30%"
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
            id="colacion"
            name="colacion"
            label="Colación"
            placeholder="Colación"
            value={data.colacion}
            onChange={onChange}
            type="number"
            w="50%"
            
            />
        
        
          <InputField
            id="movilizacion"
            name="movilizacion"
            label="Movilización"
            placeholder="Movilización"
            value={data.movilizacion}
            onChange={onChange}
            type="number"
            w="50%"
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

  export {
    InformacionContractual
  }