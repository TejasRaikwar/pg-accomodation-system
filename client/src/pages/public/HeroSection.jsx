import React from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/Home/hero-bg.jpg"

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Find Your Perfect PG
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover comfortable, affordable, and convenient paying guest
          accommodations near you
        </p>

        {/* Search Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSearchClick}
            className="bg-blue-600 text-white px-8 py-4 cursor-pointer rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center text-lg shadow-lg"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search PG
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
