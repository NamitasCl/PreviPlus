import { Button, Container, Flex, Heading, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import MujerHero from './assets/persona-feliz-landing.png';
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function HeroSection() {

    const textColor = useColorModeValue('gray.700', 'gray.100')
    const highlightColor = useColorModeValue('red.500', 'red.300')

    return (
        <Container maxW={'1280px'}px={0} pt={16}>
                <Flex 
                    direction={{ base: 'column', md: 'row' }} 
                    align="center" 
                    justify="space-between"
                    gap={{ base: 8, md: 0 }}
                >
                    <VStack 
                        align={{ base: 'center', md: 'flex-start' }} 
                        spacing={6} 
                        maxW={{ base: 'full', md: '50%' }}
                        textAlign={{ base: 'center', md: 'left' }}
                        pr={{ base: 0, md: 8 }}
                    >
                        <Heading
                            as="h1"
                            fontWeight={800}
                            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                            lineHeight={1.2}
                            color={textColor}
                        >
                            <Text as="span" color={highlightColor} display="block">
                                Nos preocupamos...
                            </Text>
                            para que te ocupes
                            <Text as="span" display="block">
                                de tu empresa.
                            </Text>
                        </Heading>
                        <Button 
                            colorScheme='blue' 
                            size="lg"
                            width={{ base: 'full', sm: 'auto' }}
                            height={12} 
                            rightIcon={<ArrowForwardIcon />}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}
                        >
                            Comienza ya!
                        </Button>
                    </VStack>
                    <Flex 
                        maxW={{ base: '100%', md: '50%' }}
                        mt={{ base: 8, md: 0 }}
                        justifyContent={{ base: 'center', md: 'flex-end' }}
                    >
                        <Image 
                            src={MujerHero}
                            alt="Persona feliz usando nuestra plataforma"
                            height="auto"
                            width="60%"
                            maxW="none"
                            objectFit="cover"
                        />
                    </Flex>
                </Flex>
            </Container>
    )
}