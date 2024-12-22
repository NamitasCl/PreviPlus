import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import PricingSection from "./Precios";
import DomesticWorkerCalculator from "./SeccionCalculadoraNanas";

export default function LandingPageSections() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <DomesticWorkerCalculator />
            <Footer />
        </>
    )
}