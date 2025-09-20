import React from "react";

type BestOfferProps = {
  title: string;
  subtitle?: string;
  bullets?: string[];
  ctaText?: string;
  ctaHref?: string;
};

const BestOffer = ({ title, subtitle, bullets = [], ctaText, ctaHref }: BestOfferProps) => {
  return (
    <section id="best-offer" className="relative mx-auto max-w-7xl px-6 py-20 scroll-mt-24">
      <div className="relative rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-12 shadow-xl shadow-blue-100/50 border border-blue-100/20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-6 text-xl text-slate-600 leading-relaxed font-medium">
              {subtitle}
            </p>
          )}
          {bullets.length > 0 && (
            <div className="mt-10">
              <ul className="grid gap-4 text-left max-w-2xl mx-auto">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-lg text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors duration-200">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {ctaText && ctaHref && (
            <div className="mt-12">
              <a 
                href={ctaHref} 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-200 text-lg"
              >
                {ctaText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestOffer;
