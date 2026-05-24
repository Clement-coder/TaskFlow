import { testimonials } from "@/data/mock-data";

export function Testimonials() {
  return (
    <section className="px-6 pb-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-400">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Trusted by modern teams
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight sm:text-5xl">
            Built for velocity, trust, and transparency
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="relative rounded-2xl border border-white/[0.07] bg-slate-900/50 p-7 hover:border-white/15 transition duration-300"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-5xl font-serif text-slate-800 leading-none select-none">"</div>

              <p className="text-base leading-relaxed text-slate-300 mb-6 relative z-10">"{item.quote}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.title} · {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
