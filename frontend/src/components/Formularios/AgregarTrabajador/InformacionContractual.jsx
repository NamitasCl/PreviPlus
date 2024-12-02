// InformacionContractual.jsx
import { memo } from 'react';
import { Stack, Flex } from '@chakra-ui/react';
import { InputField, SelectField, SwitchField } from './ComponentesFormularios';
import { useFormContext, useWatch } from 'react-hook-form';

const InformacionContractual = memo(() => {
  const { control } = useFormContext();
  const asignacionFamiliar = useWatch({
    control,
    name: 'contractualInfo.asignacionFamiliar',
  });

  return (
    <Stack spacing={4}>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="contractualInfo.puesto"
          label="Puesto"
          placeholder="Puesto"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
        <InputField
          id="contractualInfo.departamento"
          label="Departamento"
          placeholder="Departamento"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
      </Flex>

      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="contractualInfo.fechaInicio"
          label="Fecha de Inicio"
          type="date"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
        <SelectField
          id="contractualInfo.tipoContrato"
          label="Tipo de Contrato"
          options={[
            { value: 'indefinido', label: 'Indefinido' },
            { value: 'plazoFijo', label: 'Plazo Fijo' },
            { value: 'honorarios', label: 'Honorarios' },
          ]}
          placeholder="Seleccionar tipo de contrato"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
      </Flex>

      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="contractualInfo.salario"
          label="Sueldo Imponible"
          placeholder="Salario"
          type="number"
          validationRules={{
            required: 'Este campo es obligatorio',
            min: { value: 0, message: 'Debe ser un número positivo' },
          }}
          flex={1}
        />
        <SwitchField
          id="contractualInfo.tiempoCompleto"
          label="Tiempo Completo"
          flex={1}
        />
        <SelectField
          id="contractualInfo.tipoTrabajador"
          label="Tipo de Trabajador"
          options={[
            { value: '0', label: 'Activo (No pensionado)' },
            { value: '1', label: 'Pensionado y cotiza' },
            { value: '2', label: 'Pensionado y no cotiza' },
            { value: '3', label: 'Activo > 65 años (nunca pensionado)' },
            { value: '8', label: 'Exento de cotizar (Mujer > 60, Hombre > 65 o Extranjero)' },
          ]}
          placeholder="Seleccionar tipo de trabajador"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
      </Flex>

      <Flex direction={['column', 'row']} gap={4}>
        <SelectField
          id="contractualInfo.tramoAsignacionFamiliar"
          label="Asignación Familiar"
          options={[
            { value: 'A', label: 'Tramo A' },
            { value: 'B', label: 'Tramo B' },
            { value: 'C', label: 'Tramo C' },
            { value: 'D', label: 'Tramo D' },
          ]}
          placeholder="Seleccionar tramo"
          validationRules={{
            required: asignacionFamiliar ? 'Este campo es obligatorio' : false,
          }}
          isDisabled={!asignacionFamiliar}
          flex={1}
        />
        <InputField
          id="contractualInfo.resolucionAsignacionFamiliar"
          label="Resolución Asignación Familiar"
          placeholder="Número de Resolución"
          validationRules={{
            required: asignacionFamiliar ? 'Este campo es obligatorio' : false,
          }}
          isDisabled={!asignacionFamiliar}
          flex={1}
        />
        <SwitchField
          id="contractualInfo.asignacionFamiliar"
          label="Recibe Asignación Familiar"
          flex={1}
        />
      </Flex>

      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="contractualInfo.colacion"
          label="Colación"
          placeholder="Colación"
          type="number"
          validationRules={{
            min: { value: 0, message: 'Debe ser un número positivo' },
          }}
          flex={1}
        />
        <InputField
          id="contractualInfo.movilizacion"
          label="Movilización"
          placeholder="Movilización"
          type="number"
          validationRules={{
            min: { value: 0, message: 'Debe ser un número positivo' },
          }}
          flex={1}
        />
      </Flex>
    </Stack>
  );
});

InformacionContractual.displayName = 'InformacionContractual';

export default InformacionContractual;
