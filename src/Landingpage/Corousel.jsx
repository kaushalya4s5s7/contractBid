import React from "react";

export default function FunkyCarousel() {
  return (
    <div className="carousel-container p-10 flex justify-center items-center">
      <div className="carousel-wrapper flex gap-6  scrollbar-hide">
        <div className="carousel-content flex">
          {/* Slide 1 */}
          <div className="carousel-slide bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300">
            <div className="slide-content text-center text-white">
              <h1 className="project-name text-2xl font-bold mb-2">
                Luxury Villa Construction
              </h1>
              <p className="countdown text-lg mb-2">2d 5h 20m left</p>
              <p className="highest-bid text-sm mb-4">
                Current Highest Bid:{" "}
                <span className="bid-amount font-bold">$25,000</span>
              </p>
              <button className="cta-btn bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300">
                Place Your Bid Now
              </button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-slide bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300">
            <div className="slide-content text-center text-white">
              <h1 className="project-name text-2xl font-bold mb-2">
                Skyline Office Building
              </h1>
              <p className="countdown text-lg mb-2">2d 12h 30m left</p>
              <p className="highest-bid text-sm mb-4">
                Current Highest Bid:{" "}
                <span className="bid-amount font-bold">$45,000</span>
              </p>
              <button className="cta-btn bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300">
                Place Your Bid Now
              </button>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-slide bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300">
            <div className="slide-content text-center text-white">
              <h1 className="project-name text-2xl font-bold mb-2">
                City Park Landscaping
              </h1>
              <p className="countdown text-lg mb-2">1d 8h 15m left</p>
              <p className="highest-bid text-sm mb-4">
                Current Highest Bid:{" "}
                <span className="bid-amount font-bold">$12,000</span>
              </p>
              <button className="cta-btn bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300">
                Place Your Bid Now
              </button>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="carousel-slide bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300">
            <div className="slide-content text-center text-white">
              <h1 className="project-name text-2xl font-bold mb-2">
                Subway System Expansion
              </h1>
              <p className="countdown text-lg mb-2">4d 22h 50m left</p>
              <p className="highest-bid text-sm mb-4">
                Current Highest Bid:{" "}
                <span className="bid-amount font-bold">$125,000</span>
              </p>
              <button className="cta-btn bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300">
                Place Your Bid Now
              </button>
            </div>
          </div>

          {/* Slide 5 */}
          <div className="carousel-slide bg-gradient-to-r from-purple-900 to-indigo-900 p-6 rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300">
            <div className="slide-content text-center text-white">
              <h1 className="project-name text-2xl font-bold mb-2">
                Bridge Construction Over River
              </h1>
              <p className="countdown text-lg mb-2">3d 1h 10m left</p>
              <p className="highest-bid text-sm mb-4">
                Current Highest Bid:{" "}
                <span className="bid-amount font-bold">$80,000</span>
              </p>
              <button className="cta-btn bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300">
                Place Your Bid Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
