// AutocompleteNacionalidad.jsx
import { memo, useCallback, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  Box,
} from '@chakra-ui/react';
import nacionalidades from '../PrivateZone/assets/ArchivosJson/nacionalidades.json'; // Asegúrate de tener este archivo
import PropTypes from 'prop-types';

const InputSearch = memo(({ name, placeholder, value, onChange }) => {
  return (
    <FormControl id={name} isRequired flex={1}>
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
});

InputSearch.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputSearch.displayName = 'InputSearch';


const AutocompleteNacionalidad = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = useCallback((e) => {
    const inputValue = e.target.value;
    onChange(e); // Pasa el evento al manejador padre

    if (inputValue.length > 0) {
      const filtered = nacionalidades.filter((nacionalidad) =>
        nacionalidad.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [onChange]);

  const handleSelect = useCallback((nacionalidad) => {
    onChange({
      target: {
        name: 'nationality',
        value: nacionalidad.label, // Pasa solo el valor (clave) de la nacionalidad
      },
    });
    setSuggestions([]);
  }, [onChange]);

  return (
    <FormControl id="nationality" isRequired flex={1}>
      <FormLabel>Nacionalidad</FormLabel>
      <InputSearch
        name="nationality"
        placeholder="Escribe para buscar..."
        value={value}
        onChange={handleInputChange}
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
                onClick={() => handleSelect(nacionalidad)}
              >
                {nacionalidad.label}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </FormControl>
  );
};

export default AutocompleteNacionalidad;

AutocompleteNacionalidad.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};