"use client";

import { Button } from "../ui/button";
import { heroData } from "@/data/hero";

const Hero = () => {
  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center text-center text-white -mt-[0px] scroll-mt-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroData.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
          {heroData.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
          {heroData.subtitle}
        </p>
        
        {/* Newsletter Form */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <input
            type="email"
            placeholder={heroData.cta.placeholder}
            className="w-full sm:w-2/3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Button 
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-blue-900 hover:bg-blue-50 transition-colors duration-200"
          >
            {heroData.cta.text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
