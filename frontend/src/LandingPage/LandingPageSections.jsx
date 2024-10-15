import { Flex } from "@chakra-ui/react";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";

export default function LandingPageSections() {
    return (
        <>
            <HeroSection />
            <Flex background={'gray.50'} h={'500px'} alignItems={'center'}>
                <FeaturesSection />
            </Flex>
            <Footer />
        </>
    )
}