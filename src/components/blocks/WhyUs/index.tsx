import React from "react";

type WhyUsProps = { heading: string; points: { title: string; desc?: string }[] };
const WhyUs = ({ heading, points }: WhyUsProps) => (
  <section id="why-us" className="relative mx-auto max-w-7xl px-6 py-20 scroll-mt-24">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
        {heading}
      </h2>
    </div>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {points.map((p, i) => {
        // Different background colors and icon gradients for each card
        const cardStyles = [
          {
            bg: "bg-gradient-to-br from-blue-50/80 to-indigo-50/60",
            iconBg: "bg-gradient-to-r from-blue-500 to-indigo-500",
            hoverShadow: "hover:shadow-blue-100/40"
          },
          {
            bg: "bg-gradient-to-br from-emerald-50/80 to-teal-50/60", 
            iconBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
            hoverShadow: "hover:shadow-emerald-100/40"
          },
          {
            bg: "bg-gradient-to-br from-purple-50/80 to-pink-50/60",
            iconBg: "bg-gradient-to-r from-purple-500 to-pink-500", 
            hoverShadow: "hover:shadow-purple-100/40"
          }
        ];
        
        // Different icons for each card
        const icons = [
          // Star icon for first card
          <svg key="star" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>,
          // Shield icon for second card  
          <svg key="shield" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>,
          // Users icon for third card
          <svg key="users" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        ];
        
        const style = cardStyles[i % cardStyles.length];
        const icon = icons[i % icons.length];
        
        return (
          <div 
            key={i} 
            className={`group relative ${style.bg} rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl ${style.hoverShadow} hover:border-blue-200/30 transition-all duration-300 hover:-translate-y-2`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className={`w-12 h-12 rounded-2xl ${style.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                {p.title}
              </h3>
              {p.desc && (
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {p.desc}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </section>
);
export default WhyUs;
