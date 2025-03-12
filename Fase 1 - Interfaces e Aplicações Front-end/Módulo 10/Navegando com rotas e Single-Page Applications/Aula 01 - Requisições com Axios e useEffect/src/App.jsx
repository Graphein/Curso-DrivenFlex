import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import FeaturesSection from "./components/FeaturesSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TeamSection from "./components/TeamSection";
import Banner from "./components/Banner";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/features" element={<FeaturesSection />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/portfolio" element={<PortfolioSection />} />
        <Route path="/testimonials" element={<TestimonialsSection />} />
        <Route path="/team" element={<TeamSection />} />
      </Routes>
    </BrowserRouter>
  );
}