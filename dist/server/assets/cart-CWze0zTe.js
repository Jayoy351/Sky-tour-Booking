import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { u as useAuth, a as useCart, B as Button } from "./router-DY-WhKZH.js";
import { p as peso, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C-0mX85y.js";
import { L as Label, I as Input } from "./label-B-NOTBy6.js";
import { ShoppingBag, Calendar, Users, Save, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-select";
import "@radix-ui/react-label";
const TOUR_TYPES = ["Day Tour", "2 Days 1 Night", "3 Days 2 Nights"];
function CartPage() {
  const {
    user
  } = useAuth();
  const {
    items,
    update,
    remove,
    total,
    clear
  } = useCart();
  const router = useRouter();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({
    travelers: 1,
    date: "",
    tourType: "Day Tour"
  });
  if (!user) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md px-4 py-24 text-center", children: [
      /* @__PURE__ */ jsx(ShoppingBag, { className: "mx-auto h-12 w-12 text-primary" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-2xl font-bold", children: "Login to view your cart" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Sign in to save and manage your tour bookings." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Login" }) })
    ] });
  }
  const startEdit = (id) => {
    const it = items.find((i) => i.id === id);
    if (!it) return;
    setEditingId(id);
    setDraft({
      travelers: it.travelers,
      date: it.date,
      tourType: it.tourType
    });
  };
  const saveEdit = (id) => {
    update(id, draft);
    setEditingId(null);
    toast.success("Booking updated.");
  };
  const checkout = () => {
    toast.success("Booking confirmed! (demo)");
    clear();
    router.navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "My Cart" }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: "Edit travelers, dates, or remove bookings before checkout." }),
    items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-16 rounded-2xl border bg-card p-12 text-center", children: [
      /* @__PURE__ */ jsx(ShoppingBag, { className: "mx-auto h-12 w-12 text-muted-foreground" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-4 text-lg font-semibold", children: "Your cart is empty" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: "Browse destinations to start planning your trip." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/destinations", children: "Browse destinations" }) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: items.map((it) => {
        const editing = editingId === it.id;
        return /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border bg-card shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 p-4 sm:flex-row", children: [
          /* @__PURE__ */ jsx("img", { src: it.image, alt: it.title, className: "h-32 w-full rounded-xl object-cover sm:w-44" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: it.title }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  it.tourType,
                  " · ",
                  peso(it.pricePerPerson),
                  " per person"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-primary", children: peso(it.pricePerPerson * it.travelers) })
              ] })
            ] }),
            editing ? /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-3 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Tour type" }),
                /* @__PURE__ */ jsxs(Select, { value: draft.tourType, onValueChange: (v) => setDraft({
                  ...draft,
                  tourType: v
                }), children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: TOUR_TYPES.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t, children: t }, t)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Date" }),
                /* @__PURE__ */ jsx(Input, { type: "date", value: draft.date, onChange: (e) => setDraft({
                  ...draft,
                  date: e.target.value
                }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Travelers" }),
                /* @__PURE__ */ jsx(Input, { type: "number", min: 1, value: draft.travelers, onChange: (e) => setDraft({
                  ...draft,
                  travelers: Math.max(1, Number(e.target.value) || 1)
                }) })
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "h-3.5 w-3.5" }),
                it.date || "No date set"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Users, { className: "h-3.5 w-3.5" }),
                it.travelers,
                " traveler(s)"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
              editing ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: () => saveEdit(it.id), className: "gap-1", children: [
                  /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
                  "Save"
                ] }),
                /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", onClick: () => setEditingId(null), children: "Cancel" })
              ] }) : /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => startEdit(it.id), className: "gap-1", children: [
                /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }),
                "Edit"
              ] }),
              /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", className: "gap-1 text-destructive hover:text-destructive", onClick: () => {
                remove(it.id);
                toast.success("Removed from cart.");
              }, children: [
                /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
                "Remove"
              ] })
            ] })
          ] })
        ] }) }, it.id);
      }) }),
      /* @__PURE__ */ jsxs("aside", { className: "h-fit rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-24", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Order Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Items" }),
            /* @__PURE__ */ jsx("span", { children: items.length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Travelers" }),
            /* @__PURE__ */ jsx("span", { children: items.reduce((s, i) => s + i.travelers, 0) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Service fee" }),
            /* @__PURE__ */ jsx("span", { children: "Free" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex justify-between border-t pt-3 text-base", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Total" }),
            /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-primary", children: peso(total) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { className: "mt-5 w-full", onClick: checkout, children: "Confirm Booking" }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "mt-2 w-full text-muted-foreground", onClick: () => {
          clear();
          toast.success("Cart cleared.");
        }, children: "Clear cart" })
      ] })
    ] })
  ] });
}
export {
  CartPage as component
};
