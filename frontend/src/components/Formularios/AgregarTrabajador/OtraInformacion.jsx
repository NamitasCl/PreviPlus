// OtraInformacion.jsx
import { memo } from 'react';
import { Stack } from '@chakra-ui/react';
import { TextareaField, SwitchField } from './ComponentesFormularios';

const OtraInformacion = memo(() => {
  return (
    <Stack spacing={4}>
      <TextareaField
        id="otraInfo.habilidades"
        label="Habilidades"
        placeholder="Describe tus habilidades"
      />
      <TextareaField
        id="otraInfo.educacion"
        label="Educación"
        placeholder="Describe tu educación"
      />
      <TextareaField
        id="otraInfo.certificaciones"
        label="Certificaciones"
        placeholder="Lista tus certificaciones"
      />
      <SwitchField
        id="otraInfo.disponibleTraslado"
        label="Disponible para Traslado"
      />
    </Stack>
  );
});

OtraInformacion.displayName = 'OtraInformacion';

export default OtraInformacion;