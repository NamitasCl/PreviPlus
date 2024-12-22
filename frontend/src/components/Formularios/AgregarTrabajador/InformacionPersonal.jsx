// InformacionPersonal.jsx
import { memo } from 'react';
import { Stack, Flex, Text } from '@chakra-ui/react';
import { InputField, SelectField, SwitchField, TextareaField } from './ComponentesFormularios';
import AutocompleteNacionalidad from '../../AutoCompleteNacionalidad';

const InformacionPersonal = memo(() => {
  return (
    <Stack spacing={4}>
      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="personalInfo.names"
          label="Nombres"
          placeholder="Nombre"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
      </Flex>

      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="personalInfo.patlastname"
          label="Apellido Paterno"
          placeholder="Apellido Paterno"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
        <InputField
          id="personalInfo.matlastname"
          label="Apellido Materno"
          placeholder="Apellido Materno"
          flex={1}
        />
      </Flex>

      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="personalInfo.email"
          label="Correo Electrónico"
          placeholder="correo@ejemplo.com"
          type="email"
          validationRules={{
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: 'Correo electrónico no válido',
            },
          }}
          flex={1}
        />
        <Flex w={{ base: '100%', md: '50%' }} gap={4} alignItems="center">
          <InputField
            id="personalInfo.rut"
            label="Rut"
            placeholder="12345678"
            validationRules={{ required: 'Este campo es obligatorio' }}
            flex={1}
          />
          <Text alignSelf="center" mt={6} fontSize="lg" color="gray.500" fontWeight="bolder">
            -
          </Text>
          <InputField
            id="personalInfo.dv"
            label="DV"
            placeholder="9"
            validationRules={{ required: 'Este campo es obligatorio' }}
            flex={0.3}
          />
        </Flex>
        <SelectField
          id="personalInfo.genero"
          label="Género"
          options={[
            { value: 'M', label: 'Masculino' },
            { value: 'F', label: 'Femenino' },
          ]}
          placeholder="Seleccionar género"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
      </Flex>

      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="personalInfo.fechaNacimiento"
          label="Fecha de Nacimiento"
          type="date"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
        <InputField
          id="personalInfo.direccion"
          label="Dirección"
          placeholder="Dirección"
          flex={1}
        />
      </Flex>

      <Flex direction={['column', 'row']} gap={4}>
        <SwitchField
          id="personalInfo.isExtranjero"
          label="¿Es extranjero?"
          
          style={{ width: '200px' }}
        />
        <AutocompleteNacionalidad
          id="personalInfo.nationality"
          label="Nacionalidad"
          placeholder="Escribe para buscar..."
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
        <InputField
          id="personalInfo.telefono"
          label="Teléfono"
          placeholder="+56 9 1234 5678"
          type="tel"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
      </Flex>

      <Flex direction={['column', 'row']} gap={4}>
        <InputField
          id="personalInfo.numeroCuenta"
          label="Número de Cuenta"
          placeholder="Número de Cuenta"
          flex={1}
        />
        <InputField
          id="personalInfo.banco"
          label="Banco"
          placeholder="Banco"
          flex={1}
        />
        <SwitchField
          id="personalInfo.isCorriente"
          label="Cta. Corriente"
          flex={1}
        />
        <SwitchField
          id="personalInfo.isVista"
          label="Cta. Vista"
          flex={1}
        />
      </Flex>

      <TextareaField
        id="personalInfo.observaciones"
        label="Observaciones"
        placeholder="Observaciones adicionales"
      />
    </Stack>
  );
});

InformacionPersonal.displayName = 'InformacionPersonal';

export default InformacionPersonal;
