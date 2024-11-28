import { Stack} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { memo } from 'react'
import { Section, SwitchField, TextareaField } from './ComponentesFormularios'

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

  export {
    OtraInformacion
  }