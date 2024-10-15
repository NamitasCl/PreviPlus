import { Box, Button, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import MujerHero from './assets/persona-feliz-landing.png';

export default function HeroSection() {
    return (
        <Container maxW={'1280px'} px={0}>
            <Flex justifyContent={'space-between'}>
                <Flex alignItems={'center'} flexDirection={'column'} justifyContent={'center'} ml={10}>
                    <Heading
                        fontWeight={800}
                        fontSize={'6xl'}
                    >
                        <Text as={'span'}>
                            <span style={{ color: 'red' }}>Nos preocupamos...</span><br />
                            para que te ocupes<br />
                            de tu empresa.
                        </Text>
                    </Heading>
                    <Button alignSelf={'flex-start'} colorScheme='blue' width={250} height={12} mt={10}>
                        Comienza ya!
                    </Button>
                </Flex>
                <Box minW={'50%'}>
                    <Image src={MujerHero} mr={0} ml={'auto'} height={'auto'} width={400} display={'block'} />
                </Box>
            </Flex>
        </Container>
    )
}