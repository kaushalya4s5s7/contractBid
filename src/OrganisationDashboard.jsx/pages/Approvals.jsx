import { TenderList } from "../components/tenders/TenderList";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Approvals() {
  const titleRef = useRef(null);
  const animationRef = useRef(null); // Prevent multiple GSAP animations

  useEffect(() => {
    // GSAP animation for title (only once)
    if (!animationRef.current) {
      animationRef.current = gsap.fromTo(
        titleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );
    }
  }, []);

  return (
    <div className="p-8">
      {/* Animated Title with GSAP */}
      <h1
        ref={titleRef}
        className="mb-8 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
      >
        Pending Approvals
      </h1>

      {/* Framer Motion for TenderList Box */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="rounded-xl bg-gray-900 p-8 shadow-lg"
      >
        <TenderList />
      </motion.div>

      {/* Neon Button with Framer Motion */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px #fff" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 w-full rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 px-6 py-3 text-xl font-semibold text-white shadow-xl transition-all hover:from-blue-500 hover:to-green-500"
      >
        Approve All Tenders
      </motion.button>
    </div>
  );
}
