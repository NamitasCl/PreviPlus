// validationSchema.js
import * as Yup from 'yup';

const fechaMinima = new Date();
fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);

export const validationSchema = Yup.object().shape({
  personalInfo: Yup.object().shape({
    names: Yup.string().required('El nombre es obligatorio'),
    patlastname: Yup.string().required('El apellido paterno es obligatorio'),
    matlastname: Yup.string().required('El apellido materno es obligatorio'),
    email: Yup.string()
      .email('Debe ser un correo válido')
      .required('El correo es obligatorio'),
    rut: Yup.number()
      .typeError('El RUT debe ser un número')
      .required('El RUT es obligatorio'),
    dv: Yup.number()
      .typeError('El dígito verificador debe ser un número')
      .required('El dígito verificador es obligatorio'),
    genero: Yup.string()
      .oneOf(['masculino', 'femenino'], 'El género debe ser masculino o femenino')
      .required('El género es obligatorio'),
    fechaNacimiento: Yup.date()
      .required('La fecha de nacimiento es obligatoria')
      .nullable()
      .max(new Date(), 'La fecha de nacimiento no puede ser mayor a hoy')
      .max(fechaMinima, 'La fecha de nacimiento no puede ser menor a 18 años'),
    direccion: Yup.string().required('La dirección es obligatoria'),
    nationality: Yup.string().required('La nacionalidad es obligatoria'),
    telefono: Yup.string().required('El teléfono es obligatorio'),
    numeroCuenta: Yup.string(),
    banco: Yup.string(),
    observaciones: Yup.string(),
    isCorriente: Yup.boolean(),
    isVista: Yup.boolean(),
  }),
  contractualInfo: Yup.object().shape({
    puesto: Yup.string().required('El puesto es obligatorio'),
    departamento: Yup.string().required('El departamento es obligatorio'),
    fechaInicio: Yup.date()
      .required('La fecha de inicio es obligatoria')
      .nullable()
      .max(new Date(), 'La fecha de inicio no puede ser mayor a hoy'),
    tipoContrato: Yup.string().required('Selecciona un tipo de contrato'),
    salario: Yup.number()
      .typeError('El salario debe ser un número')
      .required('El salario es obligatorio')
      .positive('El salario debe ser un número positivo'),
    colacion: Yup.number()
      .typeError('La colación debe ser un número')
      .min(0, 'La colación no puede ser negativa')
      .nullable(),
    movilizacion: Yup.number()
      .typeError('La movilización debe ser un número')
      .min(0, 'La movilización no puede ser negativa')
      .nullable(),
    tipoTrabajador: Yup.string().required('Selecciona un tipo de trabajador'),
    asignacionFamiliar: Yup.boolean(),
    tramoAsignacionFamiliar: Yup.string().when('asignacionFamiliar', {
      is: true,
      then: Yup.string().required('Selecciona un tramo de asignación familiar'),
      otherwise: Yup.string().notRequired(),
    }),
    resolucionAsignacionFamiliar: Yup.string().when('asignacionFamiliar', {
      is: true,
      then: Yup.string().required('La resolución es obligatoria'),
      otherwise: Yup.string().notRequired(),
    }),
    tiempoCompleto: Yup.boolean(),
  }),
  previsionalInfo: Yup.object().shape({
    afp: Yup.string().required('La AFP es obligatoria'),
    codigoAfp: Yup.string(),
    salud: Yup.string().required('La institución de salud es obligatoria'),
    codigoSalud: Yup.string(),
    numeroFun: Yup.string(),
    cotizacionPactada: Yup.number()
      .typeError('La cotización pactada debe ser un número')
      .min(0, 'Debe ser un número positivo')
      .nullable(),
    tipoMoneda: Yup.string(),
  }),
  otraInfo: Yup.object().shape({
    habilidades: Yup.string(),
    educacion: Yup.string(),
    certificaciones: Yup.string(),
    disponibleTraslado: Yup.boolean(),
  }),
});
