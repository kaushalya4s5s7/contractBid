import React, { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import FunkyCarousel from "./Corousel";
import Footer from "./Footer";
import SignupModal from "./SignupModal";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestedUserType, setRequestedUserType] = useState("");
  const [userTypeHandler, setUserTypeHandler] = useState(null);

  const handleSignupClick = (handler) => {
    if (typeof handler === "function") {
      setUserTypeHandler(() => handler);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onSignupClick={handleSignupClick} />
      <Hero onSignupClick={handleSignupClick} />
      <FunkyCarousel />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />

      {isModalOpen && (
        <SignupModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setRequestedUserType("");
            setUserTypeHandler(null);
          }}
          preSelectedType={requestedUserType}
          onUserTypeClick={userTypeHandler}
        />
      )}
    </div>
  );
}
