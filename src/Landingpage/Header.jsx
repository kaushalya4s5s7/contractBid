import React, { useState } from "react";
import { Blocks } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { pinataService } from "../services/pinataService";
import { checkWalletStatus } from "../utils/authUtils";

export default function Header({ onSignupClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = (e) => {
    e.preventDefault();
    if (typeof onSignupClick === "function") {
      onSignupClick(handleUserTypeClick);
    }
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close the menu on navigation (for mobile)
  };

  const handleUserTypeClick = async (userType) => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this feature");
      return;
    }

    try {
      // First request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const userAddress = accounts[0].toLowerCase();

      // Get wallet status
      const walletStatus = await checkWalletStatus();

      if (!walletStatus.connected) {
        alert("Please connect your wallet first");
        return;
      }

      if (walletStatus.exists) {
        // User exists
        if (walletStatus.userType === userType) {
          // Correct user type, redirect to dashboard immediately
          if (userType === "organisation") {
            navigate("/organisation");
          } else {
            navigate("/contractor");
          }
          return;
        } else {
          // Wrong user type, show modal to create new wallet
          alert(
            `This wallet is already registered as a ${walletStatus.userType}. Please use a different wallet to register as a ${userType}.`
          );
        }
      } else {
        // New user, show signup modal
        onSignupClick(handleUserTypeClick);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <header className="bg-black/95 border-b border-cyan-500/30 backdrop-blur-sm">
      <div className="flex items-center justify-between py-6 px-12 relative">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r text-[#8a92f4] text-transparent bg-clip-text hover:animate-pulse">
          DecentraBid
        </h1>

        {/* Navbar for Desktop */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/how-it-works">How It Works</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <button
            className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 px-6 rounded-md hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300"
            onClick={handleSignupClick}
          >
            Sign Up
            <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <Blocks
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-cyan-400 hover:text-purple-500 cursor-pointer transition-colors duration-300"
            size={30}
            aria-label="Toggle Mobile Menu"
          />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-cyan-500/30 space-y-4 p-6">
          <MobileNavLink to="/features" onClick={handleLinkClick}>
            Features
          </MobileNavLink>
          <MobileNavLink to="/how-it-works" onClick={handleLinkClick}>
            How It Works
          </MobileNavLink>
          <MobileNavLink to="/pricing" onClick={handleLinkClick}>
            Pricing
          </MobileNavLink>
          <MobileNavLink to="/contact" onClick={handleLinkClick}>
            Contact
          </MobileNavLink>
          <button
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 px-6 rounded-full hover:shadow-[0_0_15px_rgba(128,90,213,0.5)] transition-all duration-300"
            onClick={handleSignupClick}
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

const NavLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`text-purple-400 hover:text-purple-400 transition-all duration-300 font-semibold relative group ${className}`}
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
  </Link>
);

const MobileNavLink = ({ to, children, className = "", onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block text-white hover:text-purple-500 transition duration-300 font-semibold ${className}`}
  >
    {children}
  </Link>
);
