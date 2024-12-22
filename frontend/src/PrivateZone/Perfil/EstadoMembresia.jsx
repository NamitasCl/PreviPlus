import {
    Box,
    Heading,
    Text,
    Flex,
    Alert,
    AlertIcon,
    Icon,
  } from '@chakra-ui/react';

import { BiCreditCard } from 'react-icons/bi';
import PropTypes from 'prop-types';
  
  export const MembershipStatus = ({isActive}) => {
  
    return (
      <Box p={6} borderWidth="1px" borderRadius="lg" bg="white">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={4}>
            <Box
              p={3}
              borderRadius="full"
              bg={isActive ? 'green.100' : 'yellow.100'}
            >
              <Icon
                as={BiCreditCard}
                w={6}
                h={6}
                color={isActive ? 'green.600' : 'yellow.600'}
              />
            </Box>
            <Box>
              <Heading size="md">Estado de Membresía</Heading>
              <Text color="gray.600">
                {isActive ? 'Membresía Activa' : 'Membresía Inactiva'}
              </Text>
            </Box>
          </Flex>
        </Flex>
        
        {!isActive && (
          <Alert status="warning" mt={4} borderRadius="md">
            <AlertIcon />
            Activa tu membresía para acceder a todos los beneficios premium
          </Alert>
        )}
      </Box>
    );
  };

  export default MembershipStatus;

  MembershipStatus.propTypes = {
    isActive: PropTypes.bool.isRequired,
  };

