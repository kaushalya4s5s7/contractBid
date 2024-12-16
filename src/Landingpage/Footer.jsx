import React from "react";
import { Blocks, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16 p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6">
              Get the latest updates about DecentraBid directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg font-medium text-white hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <Blocks className="h-10 w-10 text-sky-500" />
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 text-transparent bg-clip-text">
                DecentraBid
              </span>
            </div>
            <p className="text-gray-400 text-lg">
              Revolutionizing contractor bidding with blockchain technology.
            </p>
            <div className="flex space-x-5">
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Github} />
              <SocialLink href="#" icon={Linkedin} />
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#roadmap">Roadmap</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#careers">Careers</FooterLink>
              <FooterLink href="#blog">Blog</FooterLink>
              <FooterLink href="#press">Press</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#terms">Terms of Service</FooterLink>
              <FooterLink href="#cookies">Cookie Policy</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} DecentraBid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const SocialLink = ({ href, icon: Icon }) => (
  <a
    href={href}
    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:scale-110 hover:bg-gradient-to-r from-sky-500/20 to-blue-500/20 hover:text-white transition-all duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);

const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
    >
      {children}
    </a>
  </li>
);
