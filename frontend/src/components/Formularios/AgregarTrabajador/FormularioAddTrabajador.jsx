// FormularioEmpleado.js
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useReducer, useState, Suspense } from "react";
/* import { InformacionPersonal } from "./InformacionPersonal";
import { InformacionContractual } from "./InformacionContractual";
import { InformacionPrevisional } from "./InformacionPrevisional";
import { OtraInformacion } from "./OtraInformacion"; */
import axios from "axios";
import PropTypes from "prop-types";
import { validationSchema } from "../../validationSchema"; // Importar el esquema


// Lazy load de componentes de formulario
const InformacionPersonal = React.lazy(() => import("./InformacionPersonal"));
const InformacionContractual = React.lazy(() => import("./InformacionContractual"));
const InformacionPrevisional = React.lazy(() => import("./InformacionPrevisional"));
const OtraInformacion = React.lazy(() => import("./OtraInformacion"));

/* Reducer para manejar el estado del formulario */

const initialState = {
  personalInfo: {
    names: "",
    patlastname: "",
    matlastname: "",
    email: "",
    rut: "",
    dv: "",
    genero: "masculino",
    fechaNacimiento: "",
    direccion: "",
    nationality: "",
    telefono: "",
    numeroCuenta: "",
    banco: "",
    observaciones: "",
    isCorriente: false,
    isVista: false,
  },
  contractualInfo: {
    puesto: "",
    departamento: "",
    fechaInicio: "",
    tipoContrato: "",
    salario: "",
    colacion: "",
    movilizacion: "",
    asignacionFamiliar: false,
    tramoAsignacionFamiliar: "",
    resolucionAsignacionFamiliar: "",
    tiempoCompleto: false,
    tipoTrabajador: "",
  },
  previsionalInfo: {
    afp: "",
    codigoAfp: "",
    salud: "",
    codigoSalud: "",
    numeroFun: "",
    cotizacionPactada: "",
    tipoMoneda: "",
  },
  otraInfo: {
    habilidades: "",
    educacion: "",
    certificaciones: "",
    disponibleTraslado: false,
  },
  errors: {
    personalInfo: {},
    contractualInfo: {},
    previsionalInfo: {},
    otraInfo: {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.name]: action.value,
        },
      };
    case "setErrors":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.section]: {
            ...state.errors[action.section],
            [action.name]: action.error,
          },
        },
      };
    case "clearErrors":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.section]: {
            ...state.errors[action.section],
            [action.name]: "",
          },
        },
      };
    case "clearAllErrors":
      return {
        ...state,
        errors: initialState.errors,
      };
    default:
      return state;
  }
}

export default function FormularioEmpleado({ negocioId, onTrabajadorAdded }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false); // Definir isSubmitting

  const [visibleSections, setVisibleSections] = useState({
    personal: false,
    contractual: false,
    previsional: false,
    otra: false,
  });

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  console.log("Negocio ID:", negocioId);

  const handleChange = useCallback(
    (e, section) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;
  
      // Actualizar el campo
      dispatch({
        type: "updateField",
        section: section,
        name: name,
        value: newValue,
      });
    },
    [dispatch]
  );

  const handleBlur = useCallback(
    async (e, section) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;
  
      try {
        await validationSchema.validateAt(`${section}.${name}`, {
          ...state,
          [section]: {
            ...state[section],
            [name]: newValue,
          },
        });
        // Si pasa la validación, limpiar el error
        dispatch({
          type: "clearErrors",
          section: section,
          name: name,
        });
      } catch (err) {
        // Si falla, establecer el error
        dispatch({
          type: "setErrors",
          section: section,
          name: name,
          error: err.message,
        });
      }
    },
    [dispatch, state]
  );
  
  

  const personal = useDisclosure();
  const contractual = useDisclosure();
  const previsional = useDisclosure();
  const otra = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Iniciar estado de envío

    try {
      // Validar todo el formulario
      await validationSchema.validate(state, { abortEarly: false });

      // Limpiar todos los errores
      dispatch({ type: "clearAllErrors" });

      console.log("Datos válidos:", state);

      // Enviar los datos al servidor
      await axios.post(
        "http://localhost:3000/api/trabajadores",
        { ...state, negocioId },
        { withCredentials: true }
      );
      console.log("Formulario enviado exitosamente");
      onTrabajadorAdded(state);
    } catch (err) {
      if (err.inner) {
        // Si hay múltiples errores
        err.inner.forEach((validationError) => {
          const [section, field] = validationError.path.split(".");
          dispatch({
            type: "setErrors",
            section: section,
            name: field,
            error: validationError.message,
          });
        });
        alert(
          "Hay errores en el formulario:\n" +
            err.inner.map((error) => `${error.path}: ${error.message}`).join("\n")
        );
      } else {
        console.error("Error al validar el formulario:", err);
      }
    } finally {
      setIsSubmitting(false); // Finalizar estado de envío
    }
  };

  const hasErrors = Object.values(state.errors).some((sectionErrors) =>
    Object.values(sectionErrors).some((error) => error)
  );

  return (
    <Box as="form" onSubmit={handleSubmit} maxWidth="6xl" margin="auto" padding={4}>
      <VStack spacing={4} align="stretch">
        <Card>
          <CardHeader>
            <Heading size="lg">Formulario de contratación</Heading>
          </CardHeader>
          <CardBody>
            <Box>
              Complete la información del empleado contratado en las siguientes secciones.
            </Box>
          </CardBody>
        </Card>

        <Button onClick={() => toggleSection("personal")}>
          {visibleSections.personal ? "Ocultar Información Personal" : "Mostrar Información Personal"}
        </Button>
        <Suspense fallback={<Spinner size="xl" />}>
          {
            visibleSections.personal && 
            <InformacionPersonal
              isOpen={personal.isOpen}
              onToggle={personal.onToggle}
              onChange={(e) => handleChange(e, "personalInfo")}
              data={state.personalInfo}
              errors={state.errors.personalInfo || {}}
              onBlur={(e) => handleBlur(e, "personalInfo")}
            />
          }
        </Suspense>
        <Button onClick={() => toggleSection("contractual")}>
          {visibleSections.contractual ? "Ocultar Información Contractual" : "Mostrar Información Contractual"}
        </Button>
        <Suspense fallback={<Spinner size="xl" />}>
          {
            visibleSections.contractual && 
            <InformacionContractual
              isOpen={contractual.isOpen}
              onToggle={contractual.onToggle}
              onChange={(e) => handleChange(e, "contractualInfo")}
              data={state.contractualInfo}
              errors={state.errors.contractualInfo || {}}
              onBlur={(e) => handleBlur(e, "contractualInfo")}
            />
          }
        </Suspense>
        <Button onClick={() => toggleSection("previsional")}>
          {visibleSections.previsional ? "Ocultar Información Previsional" : "Mostrar Información Previsional"}
        </Button>  
        <Suspense fallback={<Spinner size="xl" />}>
          {
            visibleSections.previsional &&
            <InformacionPrevisional
              isOpen={previsional.isOpen}
              onToggle={previsional.onToggle}
              onChange={(e) => handleChange(e, "previsionalInfo")}
              data={state.previsionalInfo}
              errors={state.errors.previsionalInfo || {}}
              onBlur={(e) => handleBlur(e, "previsionalInfo")}
            />
          }
        </Suspense>
        <Button onClick={() => toggleSection("otra")}>
          {visibleSections.otra ? "Ocultar Otra Información" : "Mostrar Otra Información"}
        </Button>  
        <Suspense fallback={<Spinner size="xl" />}>
          {
            visibleSections.otra &&
            <OtraInformacion
              isOpen={otra.isOpen}
              onToggle={otra.onToggle}
              onChange={(e) => handleChange(e, "otraInfo")}
              data={state.otraInfo}
              errors={state.errors.otraInfo || {}}
              onBlur={(e) => handleBlur(e, "otraInfo")}
            />
          }
        </Suspense>

        <Button
          colorScheme="blue"
          width="20%"
          type="submit"
          isDisabled={hasErrors || isSubmitting} // Deshabilitar si hay errores o se está enviando
          isLoading={isSubmitting} // Mostrar indicador de carga
          loadingText="Guardando..." // Texto mientras se carga
        >
          Guardar Información
        </Button>
      </VStack>
    </Box>
  );
}

FormularioEmpleado.propTypes = {
  negocioId: PropTypes.number,
  onTrabajadorAdded: PropTypes.func,
};