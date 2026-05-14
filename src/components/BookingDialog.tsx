import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth, useCart } from "@/lib/store";
import { peso, type Destination } from "@/lib/destinations";
import { toast } from "sonner";
import { Calendar, Users, MapPin, Star } from "lucide-react";

const TOUR_TYPES = [
  { value: "Day Tour", multiplier: 1 },
  { value: "2 Days 1 Night", multiplier: 1.7 },
  { value: "3 Days 2 Nights", multiplier: 2.3 },
];

export function BookingDialog({
  destination,
  open,
  onOpenChange,
}: {
  destination: Destination | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { user } = useAuth();
  const { add } = useCart();
  const [travelers, setTravelers] = useState(2);
  const [date, setDate] = useState("");
  const [tourType, setTourType] = useState(TOUR_TYPES[0].value);
  const [name, setName] = useState("");

  const unit = useMemo(() => {
    if (!destination) return 0;
    const m = TOUR_TYPES.find((t) => t.value === tourType)?.multiplier ?? 1;
    return Math.round(destination.price * m);
  }, [destination, tourType]);
  const total = unit * travelers;

  if (!destination) return null;

  const handleAdd = () => {
    if (!user) {
      toast.error("Please log in to add bookings to your cart.");
      return;
    }
    if (!date) return toast.error("Please pick a travel date.");
    if (travelers < 1) return toast.error("At least 1 traveler.");
    add({
      destinationId: destination.id,
      title: destination.name,
      image: destination.image,
      pricePerPerson: unit,
      travelers,
      date,
      tourType,
    });
    toast.success(`${destination.name} added to your cart.`);
    onOpenChange(false);
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          <div className="relative hidden md:block">
            <img src={destination.image} alt={destination.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
              <div className="flex items-center gap-1 text-xs"><MapPin className="h-3 w-3" /> {destination.location}</div>
              <h3 className="mt-1 text-xl font-bold">{destination.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 fill-current text-amber-300" /> {destination.rating} · {destination.reviews} reviews
              </div>
            </div>
          </div>

          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Book this trip</DialogTitle>
              <DialogDescription>Fill in the details to add it to your cart.</DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="bn">Full name</Label>
                <Input id="bn" value={name} onChange={(e) => setName(e.target.value)} placeholder={user?.name || "Your name"} />
              </div>
              <div>
                <Label>Tour type</Label>
                <Select value={tourType} onValueChange={setTourType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TOUR_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.value}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="dt"><Calendar className="mr-1 inline h-3 w-3" />Travel date</Label>
                  <Input id="dt" type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="tv"><Users className="mr-1 inline h-3 w-3" />Travelers</Label>
                  <Input id="tv" type="number" min={1} max={20} value={travelers} onChange={(e) => setTravelers(Math.max(1, Number(e.target.value) || 1))} />
                </div>
              </div>

              <div className="rounded-lg border bg-secondary/40 p-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Per person</span><span className="font-medium">{peso(unit)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Travelers</span><span className="font-medium">× {travelers}</span></div>
                <div className="mt-2 flex justify-between border-t pt-2 text-base"><span className="font-semibold">Total</span><span className="font-bold text-primary">{peso(total)}</span></div>
              </div>
            </div>

            <DialogFooter className="mt-4">
              {user ? (
                <Button onClick={handleAdd} className="w-full">Add to Cart</Button>
              ) : (
                <Button asChild className="w-full"><Link to="/login">Login to Book</Link></Button>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
