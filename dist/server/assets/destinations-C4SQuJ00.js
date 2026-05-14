import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { D as DESTINATIONS, p as peso } from "./select-C-0mX85y.js";
import { B as BookingDialog } from "./BookingDialog-DkD7GSq2.js";
import { B as Button } from "./router-DY-WhKZH.js";
import { I as Input } from "./label-B-NOTBy6.js";
import { Search, Heart, MapPin, Star } from "lucide-react";
import "@radix-ui/react-select";
import "@tanstack/react-router";
import "@radix-ui/react-dialog";
import "sonner";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-label";
function DestinationsPage() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const filtered = DESTINATIONS.filter((d) => `${d.name} ${d.location}`.toLowerCase().includes(q.toLowerCase()));
  const book = (d) => {
    setSelected(d);
    setOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold sm:text-4xl", children: "All Destinations" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Click any place to fill in your booking and add it to your cart." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-72", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search destinations…", className: "pl-9" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((d) => /* @__PURE__ */ jsxs("article", { className: "group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => book(d), className: "block w-full text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-56 overflow-hidden", children: [
          /* @__PURE__ */ jsx("img", { src: d.image, alt: d.name, className: "h-full w-full object-cover transition duration-500 group-hover:scale-110" }),
          /* @__PURE__ */ jsxs("span", { className: "absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium", children: [
            /* @__PURE__ */ jsx(Heart, { className: "h-3 w-3 text-primary" }),
            " Favorite"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground", children: [
            peso(d.price),
            " / pax"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
              d.location
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }),
              d.rating,
              " (",
              d.reviews,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 text-lg font-semibold", children: d.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: d.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 border-t bg-secondary/30 p-3", children: [
        /* @__PURE__ */ jsx(Button, { onClick: () => book(d), className: "flex-1", children: "Book Now" }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => book(d), children: "View Details" })
      ] })
    ] }, d.id)) }),
    filtered.length === 0 && /* @__PURE__ */ jsxs("p", { className: "mt-12 text-center text-muted-foreground", children: [
      'No destinations match "',
      q,
      '".'
    ] }),
    /* @__PURE__ */ jsx(BookingDialog, { destination: selected, open, onOpenChange: setOpen })
  ] });
}
export {
  DestinationsPage as component
};
