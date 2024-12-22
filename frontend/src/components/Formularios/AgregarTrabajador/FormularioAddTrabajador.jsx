// FormularioEmpleado.jsx

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { validationSchema } from '../../validationSchema';

// Importación de componentes de sección
import InformacionPersonal from './InformacionPersonal';
import InformacionContractual from './InformacionContractual';
import InformacionPrevisional from './InformacionPrevisional';
import OtraInformacion from './OtraInformacion';
import { SeccionColapsable } from './ComponentesFormularios';

export default function FormularioEmpleado({ negocioId, onTrabajadorAdded }) {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues: {
      personalInfo: {
        names: '',
        patlastname: '',
        matlastname: '',
        email: '',
        rut: '',
        dv: '',
        genero: '',
        fechaNacimiento: '',
        direccion: '',
        isExtranjero: false,
        nationality: '',
        telefono: '',
        numeroCuenta: '',
        banco: '',
        isCorriente: false,
        isVista: false,
        observaciones: '',
      },
      contractualInfo: {
        puesto: '',
        departamento: '',
        fechaInicio: '',
        tipoContrato: '',
        salario: '',
        colacion: '',
        movilizacion: '',
        asignacionFamiliar: false,
        tramoAsignacionFamiliar: '',
        resolucionAsignacionFamiliar: '',
        tiempoCompleto: false,
        tipoTrabajador: '',
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
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = async (data) => {
    console.log(data)

    const datosBasicosTrabajador = {
      names: data.personalInfo.names,
      patlastname: data.personalInfo.patlastname,
      matlastname: data.personalInfo.matlastname,
      rut: data.personalInfo.rut,
      dv: data.personalInfo.dv,
      genero: data.personalInfo.genero,
    }

    try {
      await axios.post(
        '/api/trabajadores',
        { ...data, negocioId },
        { withCredentials: true }
      );
      console.log('Formulario enviado exitosamente');
      onTrabajadorAdded(datosBasicosTrabajador);
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
      // Maneja el error según tus necesidades
    }
  };

  return (
    <FormProvider {...methods}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} maxWidth="6xl" margin="auto" padding={4}>
        <VStack spacing={4} align="stretch">
          {/* Puedes agregar aquí un encabezado o descripción del formulario */}
          
          <Box as="h1" fontWeight="semibold" fontSize="2xl" mb={4}>
            Formulario de contratación
          </Box>

          <SeccionColapsable title="Información Personal">
            <InformacionPersonal />
          </SeccionColapsable>

          <SeccionColapsable title="Información Contractual">
            <InformacionContractual />
          </SeccionColapsable>
          
          <SeccionColapsable title="Información Previsional">
            <InformacionPrevisional />
          </SeccionColapsable>

          <SeccionColapsable title="Otra Información">
            <OtraInformacion />
          </SeccionColapsable>

          <Button
            colorScheme="blue"
            width="20%"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Guardando..."
          >
            Guardar Información
          </Button>
        </VStack>
      </Box>
    </FormProvider>
  );
}

FormularioEmpleado.propTypes = {
  negocioId: PropTypes.number.isRequired,
  onTrabajadorAdded: PropTypes.func.isRequired,
};