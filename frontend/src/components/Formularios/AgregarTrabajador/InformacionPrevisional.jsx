// InformacionPrevisional.jsx
import { memo } from 'react';
import { Stack, Flex } from '@chakra-ui/react';
import { SelectField, InputField } from './ComponentesFormularios';
import { useFormContext, useWatch } from 'react-hook-form';

const InformacionPrevisional = memo(() => {
  const { control } = useFormContext();
  
  const salud = useWatch({
    control,
    name: 'previsionalInfo.salud',
  });

  
  return (
    <Stack spacing={4}>
      <Flex direction={['column', 'row']} gap={4}>
        <SelectField
          id="previsionalInfo.afp"
          label="AFP"
          options={[
            { value: 33, label: 'Capital' },
            { value: 3, label: 'Cuprum' },
            { value: 5, label: 'Habitat' },
            { value: 29, label: 'PlanVital' },
            { value: 8, label: 'ProVida' },
            { value: 34, label: 'Modelo' },
            { value: 35, label: 'Uno' },
          ]}
          placeholder="Seleccionar AFP"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
        <SelectField
          id="previsionalInfo.salud"
          label="Salud"
          options={[
            { value: 1, label: 'Banmédica' },
            { value: 4, label: 'Colmena' },
            { value: 5, label: 'Cruz Blanca' },
            { value: 10, label: 'Nueva Masvida' },
            { value: 2, label: 'Consalud' },
            { value: 3, label: 'Vida Tres' },
            { value: 7, label: 'Fonasa' },
          ]}
          placeholder="Seleccionar institución de salud"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
      </Flex>

      {salud !== '07-fonasa' && (
        <>
          <InputField
            id="previsionalInfo.numeroFun"
            label="FUN"
            placeholder="Número de Contrato de Salud"
            validationRules={{ required: 'Este campo es obligatorio' }}
            flex={1}
          />
          <InputField
            id="previsionalInfo.cotizacionPactada"
            label="Cotización Pactada"
            placeholder="Cotización pactada"
            type="number"
            validationRules={{ required: 'Este campo es obligatorio' }}
            flex={1}
          />
          <SelectField
            id="previsionalInfo.tipoMoneda"
            label="Tipo de Moneda"
            options={[
              { value: 1, label: 'Pesos' },
              { value: 2, label: 'Unidades de Fomento' },
            ]}
            placeholder="Seleccionar tipo de moneda"
            validationRules={{ required: 'Este campo es obligatorio' }}
            flex={1}
          />
        </>
      )}
    </Stack>
  );
});

InformacionPrevisional.displayName = 'InformacionPrevisional';

export default InformacionPrevisional;