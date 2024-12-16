import React, { useEffect, useState, useRef } from "react";
import { Shield, Lock, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";

const features = [
  {
    title: "Anonymous Bidding System",
    description:
      "Our cutting-edge blockchain technology ensures complete anonymity during the bidding process. Contractors can submit proposals without bias, creating a fair and transparent marketplace for all participants.",
    image:
      "https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&q=80&w=2833&ixlib=rb-4.0.3",
    icon: Shield,
    gradient: "from-violet-600 to-purple-600",
  },
  {
    title: "Smart Contract Integration",
    description:
      "Automated smart contracts handle everything from bid submission to payment release. This eliminates paperwork, reduces delays, and ensures all parties meet their obligations transparently.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3",
    icon: Lock,
    gradient: "from-purple-600 to-fuchsia-600",
  },
  {
    title: "Real-time Analytics",
    description:
      "Get instant insights into bid performance, market trends, and contractor ratings. Our platform provides comprehensive analytics to help you make informed decisions quickly.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    icon: Zap,
    gradient: "from-fuchsia-600 to-violet-600",
  },
];

export default function Features() {
  const [neonHeight, setNeonHeight] = useState(0);
  const sectionRef = useRef(null);
  const firstFeatureRef = useRef(null);
  const lastFeatureRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        sectionRef.current &&
        firstFeatureRef.current &&
        lastFeatureRef.current
      ) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const firstFeatureRect =
          firstFeatureRef.current.getBoundingClientRect();
        const lastFeatureRect = lastFeatureRef.current.getBoundingClientRect();

        if (
          firstFeatureRect.top < window.innerHeight &&
          lastFeatureRect.bottom > 0
        ) {
          const scrollOffset = Math.max(
            0,
            window.innerHeight - firstFeatureRect.top
          );
          const maxHeight = lastFeatureRect.bottom - firstFeatureRect.top;
          setNeonHeight(Math.min(scrollOffset, maxHeight));
        } else {
          setNeonHeight(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="features"
      className="relative py-32 bg-black overflow-hidden"
      ref={sectionRef}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[2px] z-10 bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500 blur-sm"
        style={{
          height: `${neonHeight}px`,
          transition: "height 0.2s linear",
          top: firstFeatureRef.current
            ? firstFeatureRef.current.offsetTop - sectionRef.current.offsetTop
            : 0,
        }}
      ></div>
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[1px] z-10 bg-gradient-to-b from-violet-500 via-purple-500 to-fuchsia-500"
        style={{
          height: `${neonHeight}px`,
          transition: "height 0.2s linear",
          top: firstFeatureRef.current
            ? firstFeatureRef.current.offsetTop - sectionRef.current.offsetTop
            : 0,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 mb-6">
            Why Choose DecentraBid?
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the future of contractor bidding with our innovative
            features
          </p>
        </div>

        <div className="space-y-32 relative">
          {features.map((feature, index) => (
            <FeatureRow
              key={feature.title}
              feature={feature}
              isReversed={index % 2 !== 0}
              ref={
                index === 0
                  ? firstFeatureRef
                  : index === features.length - 1
                  ? lastFeatureRef
                  : null
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureRow = React.forwardRef(
  ({ feature, isReversed, ...props }, ref) => {
    const [contentRef, contentInView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });
    const [imageRef, imageInView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    return (
      <div
        ref={ref}
        className={`flex flex-col ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-16 items-center`}
      >
        <div
          ref={imageRef}
          className={`flex-1 transform transition-all duration-1000 delay-300 perspective-1000 ${
            imageInView
              ? "opacity-100 translate-x-0"
              : isReversed
              ? "opacity-0 translate-x-24"
              : "opacity-0 -translate-x-24"
          }`}
        >
          <div className="relative preserve-3d group duration-500 hover:rotate-x-10 hover:rotate-y-10 hover:scale-105">
            <div className="relative backface-hidden group-hover:shadow-xl group-hover:shadow-violet-500 transition-shadow duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl blur-3xl opacity-20"></div>
              <img
                src={feature.image}
                alt={feature.title}
                className="relative rounded-xl shadow-2xl w-96 h-96 object-cover group-hover:brightness-110 group-hover:contrast-125 transition-all duration-500"
              />
              <feature.icon className="absolute bottom-4 right-4 w-12 h-12 text-white bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>

        <div
          ref={contentRef}
          className={`flex-1 transform transition-all duration-1000 ${
            contentInView
              ? "opacity-100 translate-x-0"
              : isReversed
              ? "opacity-0 -translate-x-24"
              : "opacity-0 translate-x-24"
          }`}
        >
          <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 mb-6">
            {feature.title}
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed hover:text-gray-100 transition-colors duration-300">
            {feature.description}
          </p>
        </div>
      </div>
    );
  }
);