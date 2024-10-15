import { Box, Center, Container, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { TbChecks, TbShieldCheck, TbTarget } from "react-icons/tb";

const Features = [
    { id: 1, title: "Previred", icon: TbChecks },
    { id: 2, title: "Precisión", icon: TbTarget },
    { id: 3, title: "Seguridad", icon: TbShieldCheck },

]


export default function FeaturesSection() {
    return <Container maxW={'1280px'}>
        <Center>
            <Flex gap={10} flexDirection={'column'} alignItems={'center'}>
                <Heading as={'h2'}>Funcionalidades</Heading>
                <Flex gap={10}>
                    {
                        Features.map(feat => (
                            <Box key={feat.id} w={300} py={5} px={5} borderRadius={20} boxShadow={'base'} background={'white'}>
                                <VStack>
                                    <Heading w={'auto'}>
                                        <Flex alignItems={'center'} gap={2}>
                                            <Icon as={feat.icon} />
                                            <Text>{feat.title}</Text>
                                        </Flex>
                                    </Heading>
                                    <Text textAlign={'center'}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora error quod sit, tenetur dolore doloribus illum quas consectetur iste incidunt aliquam voluptas, minima iusto. Aperiam, necessitatibus. Iure quidem consequatur nisi.
                                    </Text>
                                </VStack>
                            </Box>
                        ))
                    }
                </Flex>
            </Flex>
        </Center>
    </Container>
}