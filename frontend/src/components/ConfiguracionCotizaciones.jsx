import {
    Box,
    ChakraProvider,
    FormControl,
    FormLabel,
    Heading,
    NumberInput,
    NumberInputField,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    theme,
    VStack
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { useState } from "react";

// Componente para editar valores base
const ValoresBase = ({ valoresBase, onChange }) => (
    <VStack spacing={3} align="stretch">
        <FormControl>
            <FormLabel>UF Actual</FormLabel>
            <NumberInput
                value={valoresBase.uf.actual}
                onChange={(value) => onChange("uf", "actual", parseFloat(value))}
            >
                <NumberInputField />
            </NumberInput>
        </FormControl>
        <FormControl>
            <FormLabel>UF Anterior</FormLabel>
            <NumberInput
                value={valoresBase.uf.anterior}
                onChange={(value) => onChange("uf", "anterior", parseFloat(value))}
            >
                <NumberInputField />
            </NumberInput>
        </FormControl>
        <FormControl>
            <FormLabel>UTM</FormLabel>
            <NumberInput
                value={valoresBase.utm}
                onChange={(value) => onChange("utm", null, parseFloat(value))}
            >
                <NumberInputField />
            </NumberInput>
        </FormControl>
        <FormControl>
            <FormLabel>UTA</FormLabel>
            <NumberInput
                value={valoresBase.uta}
                onChange={(value) => onChange("uta", null, parseFloat(value))}
            >
                <NumberInputField />
            </NumberInput>
        </FormControl>
    </VStack>
);

// Componente para editar rentas topes imponibles
const RentasTopesImponibles = ({ rentasTopes, onChange }) => (
    <VStack spacing={3} align="stretch">
        <FormControl>
            <FormLabel>AFP</FormLabel>
            <NumberInput
                value={rentasTopes.afp}
                onChange={(value) => onChange("afp", null, parseFloat(value))}
            >
                <NumberInputField />
            </NumberInput>
        </FormControl>
        <FormControl>
            <FormLabel>IPS</FormLabel>
            <NumberInput
                value={rentasTopes.ips}
                onChange={(value) => onChange("ips", null, parseFloat(value))}
            >
                <NumberInputField />
            </NumberInput>
        </FormControl>
        <FormControl>
            <FormLabel>Cesantía</FormLabel>
            <NumberInput
                value={rentasTopes.cesantia}
                onChange={(value) => onChange("cesantia", null, parseFloat(value))}
            >
                <NumberInputField />
            </NumberInput>
        </FormControl>
    </VStack>
);

// Componente para editar rentas mínimas imponibles
const RentasMinimasImponibles = ({ rentasMinimas, onChange }) => (
    <VStack spacing={3} align="stretch">
        {Object.entries(rentasMinimas).map(([key, value]) => (
            <FormControl key={key}>
                <FormLabel>{key.replace(/_/g, " ").toUpperCase()}</FormLabel>
                <NumberInput
                    value={value}
                    onChange={(val) => onChange(key, null, parseFloat(val))}
                >
                    <NumberInputField />
                </NumberInput>
            </FormControl>
        ))}
    </VStack>
);

// Componente para editar seguro de cesantía
const SeguroCesantia = ({ seguroCesantia, onChange }) => (
    <VStack spacing={3} align="stretch">
        {Object.entries(seguroCesantia).map(([tipo, tasas]) => (
            <Box key={tipo} p={2} borderWidth="1px" borderRadius="md">
                <Heading as="h4" size="sm" mb={2}>
                    {tipo.replace(/_/g, " ").toUpperCase()}
                </Heading>
                {Object.entries(tasas).map(([rol, tasa]) => (
                    <FormControl key={rol}>
                        <FormLabel>{rol.charAt(0).toUpperCase() + rol.slice(1)}</FormLabel>
                        <NumberInput
                            value={tasa}
                            onChange={(val) => onChange(tipo, rol, parseFloat(val))}
                        >
                            <NumberInputField />
                        </NumberInput>
                    </FormControl>
                ))}
            </Box>
        ))}
    </VStack>
);

// Componente principal con tabs para cada sección
const ConfiguracionCotizaciones = () => {
    const [configuracion, setConfiguracion] = useState({
        valores_base: {
            uf: { actual: 37971.42, anterior: 37910.42 },
            utm: 66561,
            uta: 798732
        },
        rentas_topes_imponibles: {
            afp: 3200991,
            ips: 2274625,
            cesantia: 4807182
        },
        rentas_minimas_imponibles: {
            dependientes_independientes: 500000,
            menores_mayores: 372989,
            casa_particular: 500000,
            fines_no_remuneracionales: 322295
        },
        seguro_cesantia: {
            contrato_plazo_indefinido: { empleador: 2.4, trabajador: 0.6 },
            contrato_plazo_fijo: { empleador: 3.0, trabajador: 0 },
            contrato_plazo_indefinido_11_anos: { empleador: 0.8, trabajador: 0 },
            trabajador_casa_particular: { empleador: 3.0, trabajador: 0 }
        }
        // Puedes agregar aquí el resto de las configuraciones
    });

    const handleChange = (section, key, subkey, value) => {
        setConfiguracion((prevConfig) => {
            const newConfig = { ...prevConfig };
            if (subkey) {
                newConfig[section][key][subkey] = value;
            } else {
                newConfig[section][key] = value;
            }
            return newConfig;
        });
    };

    return (
        <ChakraProvider theme={theme}>
            <Box maxW="800px" p={6}>
                <Heading as="h1" size="lg" mb={6} textAlign="center">
                    Configuración de Parámetros de Cotización
                </Heading>
                <Tabs variant="enclosed">
                    <TabList>
                        <Tab>Valores Base</Tab>
                        <Tab>Rentas Topes Imponibles</Tab>
                        <Tab>Rentas Mínimas Imponibles</Tab>
                        <Tab>Seguro Cesantía</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <ValoresBase
                                valoresBase={configuracion.valores_base}
                                onChange={(key, subkey, value) =>
                                    handleChange("valores_base", key, subkey, value)
                                }
                            />
                        </TabPanel>
                        <TabPanel>
                            <RentasTopesImponibles
                                rentasTopes={configuracion.rentas_topes_imponibles}
                                onChange={(key, subkey, value) =>
                                    handleChange("rentas_topes_imponibles", key, subkey, value)
                                }
                            />
                        </TabPanel>
                        <TabPanel>
                            <RentasMinimasImponibles
                                rentasMinimas={configuracion.rentas_minimas_imponibles}
                                onChange={(key, subkey, value) =>
                                    handleChange("rentas_minimas_imponibles", key, subkey, value)
                                }
                            />
                        </TabPanel>
                        <TabPanel>
                            <SeguroCesantia
                                seguroCesantia={configuracion.seguro_cesantia}
                                onChange={(key, subkey, value) =>
                                    handleChange("seguro_cesantia", key, subkey, value)
                                }
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </ChakraProvider>
    );
};

export default ConfiguracionCotizaciones;

ConfiguracionCotizaciones.propTypes = {
    valoresBase: PropTypes.object,
    rentasTopesImponibles: PropTypes.object,
    rentasMinimasImponibles: PropTypes.object,
    seguroCesantia: PropTypes.object
}

SeguroCesantia.propTypes = {
    seguroCesantia: PropTypes.object,
    onChange: PropTypes.func
}

RentasMinimasImponibles.propTypes = {
    rentasMinimas: PropTypes.object,
    onChange: PropTypes.func
}

RentasTopesImponibles.propTypes = {
    rentasTopes: PropTypes.object,
    onChange: PropTypes.func
}

ValoresBase.propTypes = {
    valoresBase: PropTypes.object,
    onChange: PropTypes.func
}

