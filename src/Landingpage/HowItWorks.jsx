import React, { useEffect, useRef } from "react";
import { FileText, Users, CheckCircle, CreditCard } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    icon: FileText,
    title: "Create Your Project",
    description:
      "List your project requirements and specifications on our platform.",
  },
  {
    icon: Users,
    title: "Receive Anonymous Bids",
    description:
      "Qualified contractors submit their proposals through our secure system.",
  },
  {
    icon: CheckCircle,
    title: "Select the Best Bid",
    description:
      "Compare bids and contractor ratings to make an informed decision.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Use our escrow system for safe and transparent transactions.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const stepsRef = useRef([]);
  const pathRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create scroll-driven animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });

    // Animate the progress path
    tl.to(progressRef.current, {
      strokeDashoffset: 0,
      ease: "none",
    });

    // Animate each step with a glow effect
    stepsRef.current.forEach((step, index) => {
      tl.to(
        step,
        {
          scale: 1,
          opacity: 1,
          filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))",
          duration: 0.25,
        },
        index * 0.25
      );
    });

    return () => tl.kill();
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black relative"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 top-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -right-1/4 top-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute left-1/4 bottom-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-violet-500">
              How It Works
            </span>
          </h2>
          <p className="mt-4 text-xl text-zinc-400">
            Get started with DecentraBid in four simple steps
          </p>
        </div>

        <div ref={containerRef} className="relative mt-20">
          {/* Journey Path SVG */}
          <svg
            className="absolute inset-0 w-full h-[600px] pointer-events-none"
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background path */}
            <path
              ref={pathRef}
              d="M100,300 C300,300 400,100 600,100 C800,100 900,300 1100,300"
              className="stroke-zinc-800"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Glowing progress path */}
            <path
              ref={progressRef}
              d="M100,300 C300,300 400,100 600,100 C800,100 900,300 1100,300"
              className="stroke-gradient-animated"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset="2000"
              filter="url(#glow)"
            />

            <defs>
              <linearGradient id="pathGradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Steps Container */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pt-10">
            {steps.map((step, index) => (
              <div
                key={step.title}
                ref={(el) => (stepsRef.current[index] = el)}
                className="relative transform scale-75 opacity-0"
                style={{
                  transformOrigin: "center center",
                }}
              >
                <div className="relative p-6 rounded-xl bg-zinc-900/50 backdrop-blur-lg border border-zinc-800 hover:border-violet-500 transition-all group">
                  {/* Milestone marker */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform z-10">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-center pt-4">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500/10 via-orange-500/10 to-violet-500/10 mb-6 group-hover:scale-110 transition-transform">
                      <step.icon className="w-10 h-10 text-orange-500 group-hover:text-violet-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 text-center group-hover:text-orange-500 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 text-center">
                      {step.description}
                    </p>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-500/0 via-orange-500/0 to-violet-500/0 group-hover:from-red-500/5 group-hover:via-orange-500/5 group-hover:to-violet-500/5 rounded-xl transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
