// AutocompleteNacionalidad.jsx
import { memo, useState, useCallback } from 'react';
import { FormControl, FormLabel, Input, List, ListItem, Box, FormErrorMessage } from '@chakra-ui/react';
import { useFormContext, Controller } from 'react-hook-form';
import nacionalidades from '../PrivateZone/assets/ArchivosJson/nacionalidades.json';
import PropTypes from 'prop-types';

const AutocompleteNacionalidad = memo(({ id, label, placeholder, validationRules, ...props }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors?.[id];
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = useCallback((value) => {
    if (value.length > 0) {
      const filtered = nacionalidades.filter((nacionalidad) =>
        nacionalidad.label.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleSelect = useCallback((value, onChange) => {
    onChange(value);
    setSuggestions([]);
  }, []);

  return (
    <FormControl isInvalid={!!error} position="relative" {...props}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Controller
        name={id}
        control={control}
        rules={validationRules}
        render={({ field }) => (
          <>
            <Input
              id={id}
              placeholder={placeholder}
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e.target.value);
                handleInputChange(e.target.value);
              }}
            />
            {suggestions.length > 0 && (
              <Box
                border="1px solid #ccc"
                borderRadius="md"
                mt={1}
                maxHeight="150px"
                overflowY="auto"
                bg="white"
                position="absolute"
                width="100%"
                zIndex={1}
              >
                <List>
                  {suggestions.map((nacionalidad) => (
                    <ListItem
                      key={nacionalidad.key}
                      padding={2}
                      cursor="pointer"
                      _hover={{ backgroundColor: 'gray.100' }}
                      onClick={() => handleSelect(nacionalidad.label, field.onChange)}
                    >
                      {nacionalidad.label}
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </>
        )}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
});

AutocompleteNacionalidad.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  validationRules: PropTypes.object,
};

AutocompleteNacionalidad.displayName = 'AutocompleteNacionalidad';

export default AutocompleteNacionalidad;