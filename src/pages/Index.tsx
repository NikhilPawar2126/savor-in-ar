import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import MenuPage from "@/components/MenuPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<"landing" | "menu">("landing");

  const handleGetStarted = () => {
    setCurrentPage("menu");
  };

  const handleBackToLanding = () => {
    setCurrentPage("landing");
  };

  if (currentPage === "menu") {
    return <MenuPage onBack={handleBackToLanding} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
