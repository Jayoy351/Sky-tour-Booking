import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth, useCart } from "@/lib/store";
import { peso } from "@/lib/destinations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Pencil, Save, ShoppingBag, Calendar, Users } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "My Cart · Sky Tour Booking" }] }),
});

const TOUR_TYPES = ["Day Tour", "2 Days 1 Night", "3 Days 2 Nights"];

function CartPage() {
  const { user } = useAuth();
  const { items, update, remove, total, clear } = useCart();
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ travelers: number; date: string; tourType: string }>({ travelers: 1, date: "", tourType: "Day Tour" });

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-2xl font-bold">Login to view your cart</h1>
        <p className="mt-2 text-muted-foreground">Sign in to save and manage your tour bookings.</p>
        <Button asChild className="mt-6"><Link to="/login">Login</Link></Button>
      </div>
    );
  }

  const startEdit = (id: string) => {
    const it = items.find((i) => i.id === id);
    if (!it) return;
    setEditingId(id);
    setDraft({ travelers: it.travelers, date: it.date, tourType: it.tourType });
  };

  const saveEdit = (id: string) => {
    update(id, draft);
    setEditingId(null);
    toast.success("Booking updated.");
  };

  const checkout = () => {
    toast.success("Booking confirmed! (demo)");
    clear();
    router.navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">My Cart</h1>
      <p className="mt-1 text-muted-foreground">Edit travelers, dates, or remove bookings before checkout.</p>

      {items.length === 0 ? (
        <div className="mt-16 rounded-2xl border bg-card p-12 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold">Your cart is empty</h2>
          <p className="mt-1 text-muted-foreground">Browse destinations to start planning your trip.</p>
          <Button asChild className="mt-6"><Link to="/destinations">Browse destinations</Link></Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((it) => {
              const editing = editingId === it.id;
              return (
                <div key={it.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                  <div className="flex flex-col gap-4 p-4 sm:flex-row">
                    <img src={it.image} alt={it.title} className="h-32 w-full rounded-xl object-cover sm:w-44" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold">{it.title}</h3>
                          <p className="text-sm text-muted-foreground">{it.tourType} · {peso(it.pricePerPerson)} per person</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Subtotal</p>
                          <p className="text-lg font-bold text-primary">{peso(it.pricePerPerson * it.travelers)}</p>
                        </div>
                      </div>

                      {editing ? (
                        <div className="mt-3 grid gap-3 sm:grid-cols-3">
                          <div>
                            <Label className="text-xs">Tour type</Label>
                            <Select value={draft.tourType} onValueChange={(v) => setDraft({ ...draft, tourType: v })}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>{TOUR_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs">Date</Label>
                            <Input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
                          </div>
                          <div>
                            <Label className="text-xs">Travelers</Label>
                            <Input type="number" min={1} value={draft.travelers} onChange={(e) => setDraft({ ...draft, travelers: Math.max(1, Number(e.target.value) || 1) })} />
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{it.date || "No date set"}</span>
                          <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{it.travelers} traveler(s)</span>
                        </div>
                      )}

                      <div className="mt-4 flex gap-2">
                        {editing ? (
                          <>
                            <Button size="sm" onClick={() => saveEdit(it.id)} className="gap-1"><Save className="h-4 w-4" />Save</Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                          </>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => startEdit(it.id)} className="gap-1"><Pencil className="h-4 w-4" />Edit</Button>
                        )}
                        <Button size="sm" variant="ghost" className="gap-1 text-destructive hover:text-destructive" onClick={() => { remove(it.id); toast.success("Removed from cart."); }}>
                          <Trash2 className="h-4 w-4" />Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span>{items.length}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Travelers</span><span>{items.reduce((s, i) => s + i.travelers, 0)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Service fee</span><span>Free</span></div>
              <div className="mt-3 flex justify-between border-t pt-3 text-base"><span className="font-semibold">Total</span><span className="text-xl font-bold text-primary">{peso(total)}</span></div>
            </div>
            <Button className="mt-5 w-full" onClick={checkout}>Confirm Booking</Button>
            <Button variant="ghost" className="mt-2 w-full text-muted-foreground" onClick={() => { clear(); toast.success("Cart cleared."); }}>Clear cart</Button>
          </aside>
        </div>
      )}
    </div>
  );
}
