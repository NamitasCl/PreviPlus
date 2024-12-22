// src/validation/validationSchema.js
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  personalInfo: yup.object().shape({
    names: yup.string().required('Este campo es obligatorio'),
    patlastname: yup.string().required('Este campo es obligatorio'),
    matlastname: yup.string(),
    email: yup
      .string()
      .email('Correo electrónico no válido')
      .required('Este campo es obligatorio'),
    rut: yup.string().required('Este campo es obligatorio'),
    dv: yup.string().required('Este campo es obligatorio'),
    genero: yup.string().required('Este campo es obligatorio'),
    fechaNacimiento: yup.date().required('Este campo es obligatorio'),
    direccion: yup.string(),
    nationality: yup.string().required('Este campo es obligatorio'),
    telefono: yup
      .string()
      .required('Este campo es obligatorio')
      .matches(
        /^\+56\s9\s\d{4}\s\d{4}$/,
        'Número de teléfono no válido. Formato: +56 9 1234 5678'
      ),
    numeroCuenta: yup.string(),
    banco: yup.string(),
    isCorriente: yup.boolean(),
    isVista: yup.boolean(),
    observaciones: yup.string(),
  }),
  contractualInfo: yup.object().shape({
    puesto: yup.string().required('Este campo es obligatorio'),
    departamento: yup.string().required('Este campo es obligatorio'),
    fechaInicio: yup.date().required('Este campo es obligatorio'),
    tipoContrato: yup.string().required('Este campo es obligatorio'),
    salario: yup
      .number()
      .typeError('Debe ser un número')
      .min(0, 'Debe ser un número positivo')
      .required('Este campo es obligatorio'),
    colacion: yup
      .number()
      .typeError('Debe ser un número')
      .min(0, 'Debe ser un número positivo'),
    movilizacion: yup
      .number()
      .typeError('Debe ser un número')
      .min(0, 'Debe ser un número positivo'),
    asignacionFamiliar: yup.boolean(),
    tramoAsignacionFamiliar: yup.string().when('asignacionFamiliar', {
      is: true,
      then: () => (yup.string().required('Este campo es obligatorio')),
      otherwise: () => yup.string(),
    }),
    resolucionAsignacionFamiliar: yup.string().when('asignacionFamiliar', {
      is: true,
      then: () => (yup.string().required('Este campo es obligatorio')),
      otherwise: () => yup.string(),
    }),
    tiempoCompleto: yup.boolean(),
    tipoTrabajador: yup.string().required('Este campo es obligatorio'),
  }),
  previsionalInfo: yup.object().shape({
    afp: yup.string().required('Este campo es obligatorio'),
    salud: yup.string().required('Este campo es obligatorio'),
    numeroFun: yup.string().when('salud', {
      is: (val) => val !== '07-fonasa',
      then: () => (yup.string().required('Este campo es obligatorio')),
      otherwise: () =>yup.string(),
    }),
    cotizacionPactada: yup.number().when('salud', {
      is: (val) => val !== '07-fonasa',
      then: () => (yup
        .number()
        .typeError('Debe ser un número')
        .min(0, 'Debe ser un número positivo')
        .required('Este campo es obligatorio')),
      otherwise: () => yup.number(),
    }),
    tipoMoneda: yup.string().when('salud', {
      is: (val) => val !== '07-fonasa',
      then: () => (yup.string().required('Este campo es obligatorio')),
      otherwise: () => yup.string(),
    }),
  }),
  otraInfo: yup.object().shape({
    habilidades: yup.string(),
    educacion: yup.string(),
    certificaciones: yup.string(),
    disponibleTraslado: yup.boolean(),
  }),
});