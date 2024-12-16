import React from "react";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-black to-sky-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            Get in Touch
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Have questions? We're here to help
          </p>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transform transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-sky-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Email Us
                </h3>
                <p className="text-gray-400 mb-2">
                  Our friendly team is here to help.
                </p>
                <a
                  href="mailto:hello@decentrabid.com"
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                >
                  hello@decentrabid.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-sky-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Live Chat
                </h3>
                <p className="text-gray-400 mb-2">
                  Available 24/7 for urgent inquiries.
                </p>
                <button className="text-sky-400 hover:text-sky-300 transition-colors">
                  Start a conversation
                </button>
              </div>
            </div>
          </div>

          <form className="space-y-6 bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-sky-500/50"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-sky-500/50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-sky-500/50"
                placeholder="Your message..."
              />
            </div>
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 group">
              Send Message
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
