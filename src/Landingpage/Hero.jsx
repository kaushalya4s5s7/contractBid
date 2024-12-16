"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Shield, Lock, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

export default function WavyHero({ onSignupClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSignupClick = (e) => {
    e.preventDefault();
    onSignupClick();
    setIsMenuOpen(false);
  };

  const object1Ref = useRef(null);
  const object2Ref = useRef(null);
  const object3Ref = useRef(null);

  useEffect(() => {
    const objects = [
      object1Ref.current,
      object2Ref.current,
      object3Ref.current,
    ];

    objects.forEach((obj, index) => {
      gsap.to(obj, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        backgroundColor: "random(#ff0000, #0000ff)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3,
      });
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#1A1147] to-black overflow-hidden w-full">
      {/* Remove the Grid Wave Background and animated gradient lines */}

      {/* Add new 3D floating objects */}
      <div className="absolute inset-0 z-10">
        {/* Cube */}
        <div ref={object1Ref} className="absolute w-32 h-32 top-1/4 left-1/4">
          <div className="relative w-full h-full preserve-3d">
            <div className="absolute inset-0 bg-[#00F6FF]/20 backdrop-blur-lg border border-[#00F6FF]/30 rounded-lg transform rotate-12"></div>
            <div className="absolute inset-0 bg-[#7000FF]/20 backdrop-blur-lg border border-[#7000FF]/30 rounded-lg transform -rotate-12 translate-x-2 translate-y-2"></div>
          </div>
        </div>

        {/* Sphere */}
        <div ref={object2Ref} className="absolute w-40 h-40 top-2/3 right-1/4">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-[#FF00E5]/20 backdrop-blur-lg border border-[#FF00E5]/30 rounded-full"></div>
            <div className="absolute inset-0 bg-[#00F6FF]/20 backdrop-blur-lg border border-[#00F6FF]/30 rounded-full transform scale-90"></div>
          </div>
        </div>

        {/* Pyramid */}
        <div ref={object3Ref} className="absolute w-36 h-36 top-1/3 right-1/3">
          <div className="relative w-full h-full preserve-3d">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7000FF]/20 to-[#FF00E5]/20 backdrop-blur-lg border border-[#7000FF]/30 transform rotate-45 skew-y-12"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-[#00F6FF]/20 to-[#7000FF]/20 backdrop-blur-lg border border-[#00F6FF]/30 transform -rotate-45 skew-y-12"></div>
          </div>
        </div>
      </div>

      {/* Rest of the content remains the same */}
      <div className="relative z-20 max-w-full mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-center">
        <div
          ref={ref}
          className={`transform transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
          }`}
        >
          {/* Glowing badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-[#1E1456]/80 border border-[#4D4DFF]/50">
            <div className="w-2 h-2 rounded-full bg-[#00F6FF] animate-pulse mr-2"></div>
            <span className="text-[#00F6FF] text-sm font-semibold">
              Decentralized Bidding Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-hero font-bold bg-gradient-to-r from-red-500 via-orange-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(180,180,255,0.3)]">
            Revolutionize Contract Bidding
          </h1>

          <h2 className="text-1xl sm:text-5xl font-bold font-hero text-white mt-4 drop-shadow-[0_0_10px_rgba(180,180,255,0.3)]">
            Secure. Transparent. Decentralized.
          </h2>
          <p className="text-xl text-white mt-6 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            Transform your contracting business with blockchain-powered bidding.
            Ensure fairness, eliminate intermediaries, and streamline the entire
            bidding process with smart contract automation.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-red-500 via-orange-500 to-violet-500rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(77,77,255,0.5)]">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
              <div
                className="relative flex items-center justify-center gap-2 text-white font-medium"
                onClick={handleSignupClick}
              >
                Start Bidding
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <button className="group relative px-8 py-4 bg-transparent border border-[#4D4DFF]/30 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:border-[#4D4DFF] hover:shadow-[0_0_20px_rgba(77,77,255,0.2)] hover:bg-[#4D4DFF]/10">
              <div className="relative text-white font-medium">
                Post a Project
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Features Section - Reduced spacing */}
      <div className="relative z-20 w-full py-16">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4D4DFF]/30 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-8">
          {/* Features grid - Adjusted gap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <Feature
              icon={<Shield className="w-7 h-7 text-[#00F6FF]" />}
              title="Secure Bidding"
              description="Encrypted submissions and blockchain-verified identities ensure complete security."
              glowColor="from-[#00F6FF]/20 to-[#7000FF]/20"
            />
            <Feature
              icon={<Lock className="w-7 h-7 text-[#00F6FF]" />}
              title="Smart Contracts"
              description="Automated escrow and payment release based on predefined milestones."
              glowColor="from-[#7000FF]/20 to-[#FF00E5]/20"
            />
            <Feature
              icon={<Zap className="w-7 h-7 text-[#00F6FF]" />}
              title="Instant Matching"
              description="AI-powered matching system connects the right contractors with the right projects."
              glowColor="from-[#FF00E5]/20 to-[#00F6FF]/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Feature = ({ icon, title, description, glowColor }) => (
  <div className="relative group">
    {/* Neon glow effect */}
    <div
      className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-xl blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500`}
    ></div>

    {/* Feature card */}
    <div className="relative p-8 rounded-xl bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]">
      {/* Icon container with enhanced glow */}
      <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-indigo-500/10 to-violet-500/10 mb-6 mx-auto relative group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-500">
        {/* Icon glow effect */}
        <div className="absolute inset-0 rounded-lg bg-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative">{icon}</div>
      </div>

      {/* Text content with enhanced effects */}
      <h3 className="text-xl font-semibold text-indigo-300 mb-3 transition-all duration-300">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
        {description}
      </p>

      {/* Hover line effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 group-hover:w-2/3 transition-all duration-500"></div>
    </div>
  </div>
);
