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
            { value: '33-capital', label: 'Capital' },
            { value: '03-cuprum', label: 'Cuprum' },
            { value: '05-habitat', label: 'Habitat' },
            { value: '29-planvital', label: 'PlanVital' },
            { value: '08-provida', label: 'ProVida' },
            { value: '34-modelo', label: 'Modelo' },
            { value: '35-uno', label: 'Uno' },
          ]}
          placeholder="Seleccionar AFP"
          validationRules={{ required: 'Este campo es obligatorio' }}
          flex={1}
        />
        <SelectField
          id="previsionalInfo.salud"
          label="Salud"
          options={[
            { value: '01-banmedica', label: 'Banmédica' },
            { value: '04-colmena', label: 'Colmena' },
            { value: '05-cruzblanca', label: 'Cruz Blanca' },
            { value: '10-nuevamasvida', label: 'Nueva Masvida' },
            { value: '02-consalud', label: 'Consalud' },
            { value: '03-vidatres', label: 'Vida Tres' },
            { value: '07-fonasa', label: 'Fonasa' },
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
              { value: '1', label: 'Pesos' },
              { value: '2', label: 'Unidades de Fomento' },
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