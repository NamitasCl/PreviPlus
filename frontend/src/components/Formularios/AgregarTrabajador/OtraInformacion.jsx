// OtraInformacion.js
import { Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { memo } from "react";
import { Section, SwitchField, TextareaField } from "./ComponentesFormularios";

const OtraInformacion = memo(({ isOpen, onToggle, onChange, data, errors, onBlur }) => (
  <Section title="Otra Información" isOpen={isOpen} onToggle={onToggle}>
    <Stack spacing={4}>
      <TextareaField
        id="habilidades"
        name="habilidades"
        label="Habilidades"
        placeholder="Lista de habilidades"
        value={data.habilidades}
        onChange={onChange}
        error={errors.habilidades}
        onBlur={onBlur}
      />
      <TextareaField
        id="educacion"
        name="educacion"
        label="Educación"
        placeholder="Historial educativo"
        value={data.educacion}
        onChange={onChange}
        error={errors.educacion}
        onBlur={onBlur}
      />
      <TextareaField
        id="certificaciones"
        name="certificaciones"
        label="Certificaciones"
        placeholder="Certificaciones obtenidas"
        value={data.certificaciones}
        onChange={onChange}
        error={errors.certificaciones}
        onBlur={onBlur}
      />
      <SwitchField
        id="disponibleTraslado"
        name="disponibleTraslado"
        label="Disponible para Traslado"
        isChecked={data.disponibleTraslado}
        onChange={onChange}
        error={errors.disponibleTraslado}
        onBlur={onBlur}
      />
    </Stack>
  </Section>
));

OtraInformacion.displayName = "OtraInformacion";

OtraInformacion.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object, // Añadido
  onBlur: PropTypes.func.isRequired,
};

export default OtraInformacion;