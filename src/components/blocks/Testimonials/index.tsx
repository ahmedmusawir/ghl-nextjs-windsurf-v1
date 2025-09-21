import React from "react";

type Testimonial = { quote: string; author?: string };
type TestimonialsProps = {
  items: Testimonial[];
  // Style props
  bg?: string;
  fg?: string;
  variant?: "solid" | "outline" | "minimal";
  align?: "left" | "center";
};

const Testimonials = ({ items, bg = "bg-white", fg = "text-gray-900", variant = "solid", align = "left" }: TestimonialsProps) => (
  <section id="testimonials" className={`relative mx-auto max-w-7xl px-6 py-20 scroll-mt-24 ${bg} ${fg} ${align === "center" ? "text-center" : "text-left"} ${variant === "outline" ? "border border-gray-200" : variant === "minimal" ? "bg-transparent" : ""}`}>
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
        Testimonials
      </h2>
    </div>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
      {items.map((t, i) => {
        const cardStyles = [
          "bg-gradient-to-br from-blue-50/60 to-indigo-50/40",
          "bg-gradient-to-br from-emerald-50/60 to-teal-50/40",
          "bg-gradient-to-br from-purple-50/60 to-pink-50/40",
          "bg-gradient-to-br from-amber-50/60 to-orange-50/40"
        ];
        
        return (
          <blockquote 
            key={i} 
            className={`group relative ${cardStyles[i % cardStyles.length]} rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-blue-100/30 hover:border-blue-200/30 transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-slate-700 leading-relaxed italic mb-4 group-hover:text-slate-800 transition-colors duration-300">
                    "{t.quote}"
                  </p>
                  {t.author && (
                    <footer className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-400 to-slate-500 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {t.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-slate-600 font-medium group-hover:text-slate-700 transition-colors duration-300">
                        — {t.author}
                      </span>
                    </footer>
                  )}
                </div>
              </div>
            </div>
          </blockquote>
        );
      })}
    </div>
  </section>
);
export default Testimonials;
