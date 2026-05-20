import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { testimonials } from "@/data/mock-data";

export function Testimonials() {
  return (
    <section className="px-6 pb-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Trusted by modern teams</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Built for velocity, trust, and transparency.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <Card key={item.name} className="border-slate-700/70 bg-slate-900/80">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <p className="text-sm text-slate-400">{item.title} • {item.company}</p>
              </CardHeader>
              <CardDescription>{item.quote}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
