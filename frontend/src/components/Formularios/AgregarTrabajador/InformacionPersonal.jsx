// InformacionPersonal.js
import { Flex, Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { memo } from "react";
import { InputField, SelectField, Section, SwitchField, TextareaField } from "./ComponentesFormularios";
import AutocompleteNacionalidad from "../../AutoCompleteNacionalidad";

const InformacionPersonal = memo(({ isOpen, onToggle, onChange, data, errors, onBlur }) => (
  <Section title="Información Personal" isOpen={isOpen} onToggle={onToggle}>
    <Stack spacing={4}>
      <Flex direction={["column", "row"]} gap={4}>
        <InputField
          id="names"
          name="names"
          label="Nombres"
          placeholder="Nombre"
          value={data.names}
          onChange={onChange}
          flex={1}
          error={errors.names}
          isRequired
          onBlur={onBlur}
        />
      </Flex>
      <Flex direction={["column", "row"]} gap={4}>
        <InputField
          id="patlastname"
          name="patlastname"
          label="Apellido Paterno"
          placeholder="Apellido Paterno"
          value={data.patlastname}
          onChange={onChange}
          flex={1}
          error={errors.patlastname}
          isRequired
          onBlur={onBlur}
        />
        <InputField
          id="matlastname"
          name="matlastname"
          label="Apellido Materno"
          placeholder="Apellido Materno"
          value={data.matlastname}
          onChange={onChange}
          flex={1}
          error={errors.matlastname}
          onBlur={onBlur}
        />
      </Flex>
      <Flex direction={["column", "row"]} gap={4}>
        <InputField
          id="email"
          name="email"
          label="Correo Electrónico"
          placeholder="correo@ejemplo.com"
          value={data.email}
          onChange={onChange}
          type="email"
          flex={1}
          error={errors.email}
          isRequired
          onBlur={onBlur}
        />
        <Flex w={{ base: "100%", md: "50%" }} gap={4}>
          <InputField
            id="rut"
            name="rut"
            label="Rut"
            placeholder="12345678-9"
            value={data.rut}
            onChange={onChange}
            type="text"
            w="70%"
            error={errors.rut}
            isRequired
            onBlur={onBlur}
          />
          <Text
            alignSelf={"center"}
            mt={6}
            fontSize="lg"
            color="gray.500"
            fontWeight={"bolder"}
          >
            -
          </Text>
          <InputField
            id="dv"
            name="dv"
            label="DV"
            value={data.dv}
            onChange={onChange}
            type="text"
            w="15%"
            error={errors.dv}
            isRequired
            onBlur={onBlur}
          />
        </Flex>
        <SelectField
          id="genero"
          name="genero"
          label="Género"
          value={data.genero}
          onChange={onChange}
          options={[
            { value: "masculino", label: "Masculino" },
            { value: "femenino", label: "Femenino" },
          ]}
          flex={1}
          error={errors.genero}
          isRequired
        />
      </Flex>
      <Flex direction={["column", "row"]} gap={4}>
        <InputField
          id="fechaNacimiento"
          name="fechaNacimiento"
          label="Fecha de Nacimiento"
          value={data.fechaNacimiento}
          onChange={onChange}
          type="date"
          flex={1}
          error={errors.fechaNacimiento}
          onBlur={onBlur}
        />
        <InputField
          id="direccion"
          name="direccion"
          label="Dirección"
          placeholder="Dirección"
          value={data.direccion}
          onChange={onChange}
          flex={1}
          error={errors.direccion}
          onBlur={onBlur}
        />
      </Flex>
      <Flex direction={["column", "row"]} gap={4}>
        <AutocompleteNacionalidad
          value={data.nationality}
          onChange={onChange}
          // Puedes agregar manejo de errores si es necesario
          onBlur={onBlur}
        />
        <InputField
          id="telefono"
          name="telefono"
          label="Teléfono"
          placeholder="+56 9 1234 5678"
          value={data.telefono}
          onChange={onChange}
          type="tel"
          flex={1}
          error={errors.telefono}
          onBlur={onBlur}
        />
      </Flex>
      <Flex direction={["column", "row"]} gap={4}>
        <InputField
          id="numeroCuenta"
          name="numeroCuenta"
          label="Número de Cuenta"
          placeholder="Número de Cuenta"
          value={data.numeroCuenta}
          onChange={onChange}
          flex={1}
          error={errors.numeroCuenta}
          onBlur={onBlur}
        />
        <InputField
          id="banco"
          name="banco"
          label="Banco"
          placeholder="Banco"
          value={data.banco}
          onChange={onChange}
          flex={1}
          error={errors.banco}
          onBlur={onBlur}
        />
        <SwitchField
          id="isCorriente"
          name="isCorriente"
          label="Cta. Corriente"
          isChecked={data.isCorriente}
          onChange={(e) => {
            onChange(e);
            if (e.target.checked) {
              onChange({
                target: { name: "isVista", value: false },
              });
            }
          }}
          isDisabled={data.isVista}
          flex={1}
          error={errors.isCorriente}
          onBlur={onBlur}
        />
        <SwitchField
          id="isVista"
          name="isVista"
          label="Cta. Vista"
          isChecked={data.isVista}
          onChange={(e) => {
            onChange(e);
            if (e.target.checked) {
              onChange({
                target: { name: "isCorriente", value: false },
              });
            }
          }}
          isDisabled={data.isCorriente}
          flex={1}
          error={errors.isVista}
          onBlur={onBlur}
        />
      </Flex>
      <TextareaField
        id="observaciones"
        name="observaciones"
        label="Observaciones"
        placeholder="Observaciones adicionales"
        value={data.observaciones}
        onChange={onChange}
        error={errors.observaciones}
        onBlur={onBlur}
      />
    </Stack>
  </Section>
));

InformacionPersonal.displayName = "InformacionPersonal";

InformacionPersonal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object, // Añadido
  onBlur: PropTypes.func.isRequired,
};

export default InformacionPersonal;
