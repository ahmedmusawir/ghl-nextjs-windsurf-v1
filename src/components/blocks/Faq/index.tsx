import React from "react";

const Faq = ({ items }: { items: { q: string; a: string }[] }) => (
  <section id="faq" className="relative mx-auto max-w-7xl px-6 py-20">
    <div className="border border-blue-200 rounded-2xl p-12 bg-gradient-to-br from-blue-50/20 to-indigo-50/10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          FAQ
        </h2>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
      {items.map((item, idx) => {
        const cardStyles = [
          "bg-gradient-to-br from-blue-50/40 to-indigo-50/30",
          "bg-gradient-to-br from-emerald-50/40 to-teal-50/30",
          "bg-gradient-to-br from-purple-50/40 to-pink-50/30",
          "bg-gradient-to-br from-amber-50/40 to-orange-50/30"
        ];
        
        return (
          <details 
            key={idx} 
            className={`group ${cardStyles[idx % cardStyles.length]} rounded-2xl shadow-lg shadow-slate-200/50 border border-blue-200 hover:shadow-xl hover:shadow-blue-100/30 hover:border-blue-300 transition-all duration-300 overflow-hidden`}
          >
            <summary className="cursor-pointer p-6 hover:bg-white/30 transition-colors duration-200 flex items-center justify-between">
              <span className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 pr-4">
                {item.q}
              </span>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 text-white transform group-open:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </summary>
            <div className="px-6 pb-6">
              <div className="pt-4 border-t border-slate-200/50">
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {item.a}
                </p>
              </div>
            </div>
          </details>
        );
      })}
      </div>
    </div>
  </section>
);
export default Faq;
