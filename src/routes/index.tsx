import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DESTINATIONS, peso } from "@/lib/destinations";
import { BookingDialog } from "@/components/BookingDialog";
import { MapPin, Star, ShieldCheck, Headphones, Tag, ThumbsUp, ArrowRight, Sun, Moon, Mountain, Compass } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

const TOUR_TYPES = [
  { icon: Sun, label: "Day Tour", desc: "Quick getaways to your favorite attractions." },
  { icon: Moon, label: "2 Days 1 Night", desc: "Short escape with a relaxing overnight stay." },
  { icon: Mountain, label: "3 Days 2 Nights", desc: "More time to relax and enjoy amazing places." },
  { icon: Compass, label: "Custom Tour", desc: "Build your own itinerary based on your preference." },
];

const FEATURES = [
  { icon: ShieldCheck, title: "Best Price Guarantee", desc: "We promise the best deals for your trips." },
  { icon: Tag, title: "Secure Booking", desc: "Your payments are 100% safe with us." },
  { icon: Headphones, title: "24/7 Support", desc: "We're here to help you anytime." },
  { icon: ThumbsUp, title: "Easy & Hassle-Free", desc: "Plan, book, and travel with confidence." },
];

function Index() {
  const featured = DESTINATIONS.slice(0, 3);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof DESTINATIONS[number] | null>(null);

  const book = (d: typeof DESTINATIONS[number]) => { setSelected(d); setOpen(true); };

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Tropical beach"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-primary-foreground sm:px-6 sm:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-200">Sky Tour Booking</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Plan Your <span className="text-amber-300">Perfect Trip</span> Across the Philippines
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            Customized travel experiences by choosing your destination, dates, and preferences. Browse, book, and go.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2"><Link to="/destinations">Explore Destinations <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="secondary"><Link to="/register">Create Free Account</Link></Button>
          </div>
        </div>
      </section>

      {/* Tour types */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Choose Your Tour Type</h2>
          <p className="mt-2 text-muted-foreground">Pick the option that fits your travel plan.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOUR_TYPES.map((t) => (
            <div key={t.label} className="group rounded-2xl border bg-card p-6 text-center transition hover:-translate-y-1 hover:border-primary hover:shadow-lg">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <t.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 font-semibold">{t.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Destinations</h2>
              <p className="mt-2 text-muted-foreground">Hand-picked trips loved by our travelers.</p>
            </div>
            <Link to="/destinations" className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex">View all destinations →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((d) => (
              <button key={d.id} onClick={() => book(d)} className="group overflow-hidden rounded-2xl border bg-card text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-52 overflow-hidden">
                  <img src={d.image} alt={d.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary">{peso(d.price)} / pax</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{d.location}</span>
                    <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{d.rating}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{d.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{d.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Book now <ArrowRight className="h-4 w-4" /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-primary/40 text-primary">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <BookingDialog destination={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
