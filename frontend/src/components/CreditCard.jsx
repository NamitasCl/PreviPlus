import { Box, Input, Stack, Text, VStack, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";

const CreditCard = () => {
    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiration: "",
        cvc: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "number") {
            const formattedValue = value.replace(/\D/g, "").slice(0, 16);
            setCardDetails((prev) => ({ ...prev, number: formattedValue }));
        } else if (name === "expiration") {
            const formattedValue = value
                .replace(/\D/g, "")
                .slice(0, 4)
                .replace(/(\d{2})/, "$1/");
            setCardDetails((prev) => ({ ...prev, expiration: formattedValue }));
        } else if (name === "cvc") {
            const formattedValue = value.replace(/\D/g, "").slice(0, 3);
            setCardDetails((prev) => ({ ...prev, cvc: formattedValue }));
        } else {
            setCardDetails((prev) => ({ ...prev, [name]: value }));
        }
    };

    const formatCardNumber = (number) => {
        return number
            .replace(/\s?/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim();
    };

    return (
        <VStack spacing={8}>
            {/* Tarjeta de Crédito */}
            <Box
                w="400px"
                h="220px"
                bgGradient="linear(to-r, gray.700, gray.900)"
                color="white"
                borderRadius="lg"
                p={6}
                boxShadow="xl"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <Text fontSize="sm" fontWeight="light">
                    Tarjeta de Crédito
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                    {cardDetails.number
                        ? formatCardNumber(cardDetails.number)
                        : "XXXX XXXX XXXX XXXX"}
                </Text>
                <Stack direction="row" justify="space-between">
                    <Text fontSize="sm">Titular</Text>
                    <Text fontSize="sm">Válida hasta</Text>
                </Stack>
                <Stack direction="row" justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">
                        {cardDetails.name || "Nombre Apellido"}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">
                        {cardDetails.expiration || "MM/YY"}
                    </Text>
                </Stack>
                <Text fontSize="sm" textAlign="right">
                    CVC: {cardDetails.cvc || "XXX"}
                </Text>
            </Box>

            {/* Campos de Entrada */}
            <VStack spacing={4} w="400px">
                <Input
                    type="text"
                    placeholder="Número de Tarjeta"
                    name="number"
                    value={formatCardNumber(cardDetails.number)}
                    onChange={handleInputChange}
                    maxLength={19}
                    size="lg"
                    focusBorderColor="teal.400"
                    variant="filled"
                />
                <Input
                    type="text"
                    placeholder="Nombre del Titular"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleInputChange}
                    size="lg"
                    focusBorderColor="teal.400"
                    variant="filled"
                />
                <Grid templateColumns="2fr 1fr" gap={4} w="100%">
                    <GridItem>
                        <Input
                            type="text"
                            placeholder="MM/YY"
                            name="expiration"
                            value={cardDetails.expiration}
                            onChange={handleInputChange}
                            maxLength={5}
                            size="lg"
                            focusBorderColor="teal.400"
                            variant="filled"
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            type="text"
                            placeholder="CVC"
                            name="cvc"
                            value={cardDetails.cvc}
                            onChange={handleInputChange}
                            maxLength={3}
                            size="lg"
                            focusBorderColor="teal.400"
                            variant="filled"
                        />
                    </GridItem>
                </Grid>
            </VStack>
        </VStack>
    );
};

export default CreditCard;
