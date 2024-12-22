// src/components/ComponentesFormularios.js
import { memo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Switch,
  FormErrorMessage,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  IconButton,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';

// Función helper (puedes moverla a un archivo separado si lo prefieres)
// eslint-disable-next-line react-refresh/only-export-components
export const getNestedErrorFunc = (errors, name) => {
  return name.split('.').reduce((acc, part) => acc && acc[part], errors);
};

// Componente InputField
export const InputField = memo(
  ({ id, label, type = 'text', validationRules, ...props }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const error = getNestedErrorFunc(errors, id);

    return (
      <FormControl isInvalid={!!error} {...props}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Controller
          name={id}
          control={control}
          rules={validationRules}
          render={({ field }) => <Input id={id} type={type} {...field} />}
        />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

InputField.displayName = 'InputField';

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  validationRules: PropTypes.object,
};

// Componente SelectField
export const SelectField = memo(
  ({ id, label, options, placeholder, validationRules, ...props }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const error = getNestedErrorFunc(errors, id);

    return (
      <FormControl isInvalid={!!error} {...props}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Controller
          name={id}
          control={control}
          rules={validationRules}
          render={({ field }) => (
            <Select id={id} placeholder={placeholder} {...field}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}
        />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

SelectField.displayName = 'SelectField';

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  validationRules: PropTypes.object,
};

// Componente TextareaField
export const TextareaField = memo(
  ({ id, label, validationRules, ...props }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const error = getNestedErrorFunc(errors, id);

    return (
      <FormControl isInvalid={!!error} {...props}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Controller
          name={id}
          control={control}
          rules={validationRules}
          render={({ field }) => <Textarea id={id} {...field} />}
        />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

TextareaField.displayName = 'TextareaField';

TextareaField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validationRules: PropTypes.object,
};

// Componente SwitchField
export const SwitchField = memo(
  ({ id, label, validationRules, ...props }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const error = getNestedErrorFunc(errors, id);

    return (
      <FormControl
        display="flex"
        alignItems="center"
        isInvalid={!!error}
        {...props}
      >
        <FormLabel htmlFor={id} mb="0">
          {label}
        </FormLabel>
        <Controller
          name={id}
          control={control}
          rules={validationRules}
          render={({ field }) => (
            <Switch
              id={id}
              isChecked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);

SwitchField.displayName = 'SwitchField';

SwitchField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validationRules: PropTypes.object,
};

// Componente SeccionColapsable
export const SeccionColapsable = memo(
  ({ title, children, defaultIsOpen = false }) => {
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen });

    return (
      <Card bg="white" borderRadius="md" boxShadow="md" mb={4}>
        <CardHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          cursor="pointer"
          onClick={onToggle}
          bg="blue.500"
          color="white"
          borderTopRadius="md"
        >
          <Heading size="md">{title}</Heading>
          <IconButton
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            variant="ghost"
            color="white"
            aria-label={isOpen ? 'Colapsar' : 'Expandir'}
            onClick={onToggle}
          />
        </CardHeader>
        <Collapse in={isOpen} animateOpacity>
          <CardBody>{children}</CardBody>
        </Collapse>
      </Card>
    );
  }
);

SeccionColapsable.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultIsOpen: PropTypes.bool,
};

SeccionColapsable.displayName = 'SeccionColapsable';