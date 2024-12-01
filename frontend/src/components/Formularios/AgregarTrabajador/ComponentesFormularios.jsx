/* import { Card, CardHeader, Heading, CardBody, FormControl, FormLabel, Input, Select, Textarea, Switch } from "@chakra-ui/react"
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'
import { memo } from 'react'

/* Componentes auxiliares

const Section = memo(({ title, children, isOpen, onToggle }) => {
    return (
      <Card mb={4}>
        <CardHeader
          as="button"
          type="button"
          onClick={onToggle}
          cursor="pointer"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="md">{title}</Heading>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </CardHeader>
        {isOpen && <CardBody>{children}</CardBody>}
      </Card>
    )
  })
  
  Section.displayName = 'Section'
  
  Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  }
  
  /* Componentes de campo memoizados 
  
  const InputField = memo(({ label, id, name, value, onChange, ...props }) => {
    return (
      <FormControl {...props}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input id={id} name={name} value={value} onChange={onChange} type={props.type} />
      </FormControl>
    )
  })
  
  InputField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
  }
  
  InputField.displayName = 'InputField'
  
  const SelectField = memo(({ label, id, name, value, onChange, options, placeholder, ...props }) => {
    return (
      <FormControl {...props}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Select id={id} name={name} value={value} onChange={onChange} placeholder={placeholder}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    )
  })
  
  SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
    placeholder: PropTypes.string,
  }
  
  SelectField.displayName = 'SelectField'
  
  const TextareaField = memo(({ label, id, name, value, onChange, ...props }) => {
    return (
      <FormControl {...props}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Textarea id={id} name={name} value={value} onChange={onChange} />
      </FormControl>
    )
  })
  
  TextareaField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  
  TextareaField.displayName = 'TextareaField'
  
  const SwitchField = memo(({ label, id, name, isChecked, onChange, ...props }) => {
    return (
      <FormControl display="flex" alignItems="center" {...props}>
        <FormLabel htmlFor={id} mb="0">
          {label}
        </FormLabel>
        <Switch id={id} name={name} isChecked={isChecked} onChange={onChange} />
      </FormControl>
    )
  })
  
  SwitchField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  
  SwitchField.displayName = 'SwitchField'

  export {
    Section,
    InputField,
    SelectField,
    TextareaField,
    SwitchField
  } */

    import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Switch,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import { memo } from "react";

/* Componentes auxiliares */

const Section = memo(({ title, children, isOpen, onToggle, onBlur }) => {
  return (
    <Card mb={4}>
      <CardHeader
        as="button"
        type="button"
        onClick={onToggle}
        cursor="pointer"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onBlur={onBlur}
      >
        <Heading size="md">{title}</Heading>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </CardHeader>
      {isOpen && <CardBody>{children}</CardBody>}
    </Card>
  );
});

Section.displayName = "Section";

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

/* Componentes de campo memoizados */

const InputField = memo(
  ({ label, id, name, value, onChange, error, onBlur, ...props }) => {
    return (
      <FormControl isInvalid={!!error} {...props}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type={props.type}
          onBlur={onBlur}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
};

InputField.displayName = "InputField";

const SelectField = memo(
  ({
    label,
    id,
    name,
    value,
    onChange,
    options,
    placeholder,
    error,
    onBlur,
    ...props
  }) => {
    return (
      <FormControl isInvalid={!!error} {...props}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
};

SelectField.displayName = "SelectField";

const TextareaField = memo(
  ({ label, id, name, value, onChange, error, onBlur, ...props }) => {
    return (
      <FormControl isInvalid={!!error} {...props}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Textarea id={id} name={name} value={value} onChange={onChange} onBlur={onBlur} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);

TextareaField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
};

TextareaField.displayName = "TextareaField";

const SwitchField = memo(
  ({ label, id, name, isChecked, onChange, error, ...props }) => {
    return (
      <FormControl display="flex" alignItems="center" isInvalid={!!error} {...props}>
        <FormLabel htmlFor={id} mb="0">
          {label}
        </FormLabel>
        <Switch id={id} name={name} isChecked={isChecked} onChange={onChange} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);

SwitchField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

SwitchField.displayName = "SwitchField";

export { Section, InputField, SelectField, TextareaField, SwitchField };