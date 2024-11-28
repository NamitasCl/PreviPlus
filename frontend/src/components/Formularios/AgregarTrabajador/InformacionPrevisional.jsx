import { Flex, Stack } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { memo } from 'react'
import { InputField, SelectField, Section } from './ComponentesFormularios'

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
          value={data.codigoAfp ? `${data.codigoAfp}-${data.afp}` : ''}
          onChange={onChange}
          options={[
            { value: '33-capital', label: 'Capital' },
            { value: '03-cuprum', label: 'Cuprum' },
            { value: '05-habitat', label: 'Habitat' },
            { value: '29-planvital', label: 'PlanVital' },
            { value: '08-provida', label: 'ProVida' },
            { value: '34-modelo', label: 'Modelo' },
            { value: '35-uno', label: 'Uno' },
          ]}
          flex={1}
        />
        <SelectField
          id="salud"
          name="salud"
          label="Salud"
          placeholder="Seleccionar Institución de Salud"
          value={data.codigoSalud ? `${data.codigoSalud}-${data.salud}` : ''}
          onChange={onChange}
          options={[
            { value: '01-banmedica', label: 'Banmédica' },
            { value: '04-colmena', label: 'Colmena' },
            { value: '05-cruzblanca', label: 'Cruz Blanca' },
            { value: '10-nuevamasvida', label: 'Nueva Masvida' },
            { value: '02-consalud', label: 'Consalud' },
            { value: '03-vidatres', label: 'Vida Tres' },
            { value: '07-fonasa', label: 'Fonasa' },
            { value: '11-isalud', label: 'Isalud' }, 
            { value: '12-fundacion', label: 'Fundación' },  
            { value: '25-cruzdelnorte', label: 'Cruz del Norte' },   
            { value: '28-esencial', label: 'Esencial' },
          ]}
          flex={1}
        />
        </Flex>
        {data.salud && data.salud.value !== '07-fonasa' && (
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
                { value: '1', label: 'Pesos' },
                { value: '2', label: 'Unidades de Fomento' },
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

  export {
    InformacionPrevisional
  }