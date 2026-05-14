import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DESTINATIONS, peso, type Destination } from "@/lib/destinations";
import { BookingDialog } from "@/components/BookingDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Search, Heart } from "lucide-react";

export const Route = createFileRoute("/destinations")({
  component: DestinationsPage,
  head: () => ({ meta: [{ title: "Destinations · Sky Tour Booking" }] }),
});

function DestinationsPage() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Destination | null>(null);
  const [open, setOpen] = useState(false);
  const filtered = DESTINATIONS.filter((d) =>
    `${d.name} ${d.location}`.toLowerCase().includes(q.toLowerCase()),
  );

  const book = (d: Destination) => { setSelected(d); setOpen(true); };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">All Destinations</h1>
          <p className="mt-2 text-muted-foreground">Click any place to fill in your booking and add it to your cart.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destinations…" className="pl-9" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <article key={d.id} className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <button onClick={() => book(d)} className="block w-full text-left">
              <div className="relative h-56 overflow-hidden">
                <img src={d.image} alt={d.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">
                  <Heart className="h-3 w-3 text-primary" /> Favorite
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{peso(d.price)} / pax</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{d.location}</span>
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{d.rating} ({d.reviews})</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{d.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{d.description}</p>
              </div>
            </button>
            <div className="flex gap-2 border-t bg-secondary/30 p-3">
              <Button onClick={() => book(d)} className="flex-1">Book Now</Button>
              <Button variant="outline" onClick={() => book(d)}>View Details</Button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">No destinations match "{q}".</p>
      )}

      <BookingDialog destination={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
