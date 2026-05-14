import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { B as Button } from "./router-DY-WhKZH.js";
import { p as peso, D as DESTINATIONS } from "./select-C-0mX85y.js";
import { B as BookingDialog } from "./BookingDialog-DkD7GSq2.js";
import { ArrowRight, Sun, Moon, Mountain, Compass, MapPin, Star, ShieldCheck, Tag, Headphones, ThumbsUp } from "lucide-react";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "sonner";
import "@radix-ui/react-select";
import "@radix-ui/react-dialog";
import "./label-B-NOTBy6.js";
import "@radix-ui/react-label";
const TOUR_TYPES = [{
  icon: Sun,
  label: "Day Tour",
  desc: "Quick getaways to your favorite attractions."
}, {
  icon: Moon,
  label: "2 Days 1 Night",
  desc: "Short escape with a relaxing overnight stay."
}, {
  icon: Mountain,
  label: "3 Days 2 Nights",
  desc: "More time to relax and enjoy amazing places."
}, {
  icon: Compass,
  label: "Custom Tour",
  desc: "Build your own itinerary based on your preference."
}];
const FEATURES = [{
  icon: ShieldCheck,
  title: "Best Price Guarantee",
  desc: "We promise the best deals for your trips."
}, {
  icon: Tag,
  title: "Secure Booking",
  desc: "Your payments are 100% safe with us."
}, {
  icon: Headphones,
  title: "24/7 Support",
  desc: "We're here to help you anytime."
}, {
  icon: ThumbsUp,
  title: "Easy & Hassle-Free",
  desc: "Plan, book, and travel with confidence."
}];
function Index() {
  const featured = DESTINATIONS.slice(0, 3);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const book = (d) => {
    setSelected(d);
    setOpen(true);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative isolate overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80", alt: "Tropical beach", className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-24 text-primary-foreground sm:px-6 sm:py-32", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium uppercase tracking-[0.2em] text-amber-200", children: "Sky Tour Booking" }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-3 max-w-2xl text-4xl font-extrabold leading-tight sm:text-6xl", children: [
          "Plan Your ",
          /* @__PURE__ */ jsx("span", { className: "text-amber-300", children: "Perfect Trip" }),
          " Across the Philippines"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-base text-white/85 sm:text-lg", children: "Customized travel experiences by choosing your destination, dates, and preferences. Browse, book, and go." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/destinations", children: [
            "Explore Destinations ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "secondary", children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Create Free Account" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Choose Your Tour Type" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Pick the option that fits your travel plan." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: TOUR_TYPES.map((t) => /* @__PURE__ */ jsxs("div", { className: "group rounded-2xl border bg-card p-6 text-center transition hover:-translate-y-1 hover:border-primary hover:shadow-lg", children: [
        /* @__PURE__ */ jsx("span", { className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground", children: /* @__PURE__ */ jsx(t.icon, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-semibold", children: t.label }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t.desc })
      ] }, t.label)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-secondary/40 py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Featured Destinations" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Hand-picked trips loved by our travelers." })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/destinations", className: "hidden text-sm font-medium text-primary hover:underline sm:inline-flex", children: "View all destinations →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-3", children: featured.map((d) => /* @__PURE__ */ jsxs("button", { onClick: () => book(d), className: "group overflow-hidden rounded-2xl border bg-card text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-52 overflow-hidden", children: [
          /* @__PURE__ */ jsx("img", { src: d.image, alt: d.name, className: "h-full w-full object-cover transition duration-500 group-hover:scale-110" }),
          /* @__PURE__ */ jsxs("span", { className: "absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary", children: [
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
              d.rating
            ] })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 text-lg font-semibold", children: d.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: d.description }),
          /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary", children: [
            "Book now ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }, d.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6", children: /* @__PURE__ */ jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-4", children: FEATURES.map((f) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("span", { className: "mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-primary/40 text-primary", children: /* @__PURE__ */ jsx(f.icon, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("h3", { className: "mt-4 font-semibold", children: f.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: f.desc })
    ] }, f.title)) }) }),
    /* @__PURE__ */ jsx(BookingDialog, { destination: selected, open, onOpenChange: setOpen })
  ] });
}
export {
  Index as component
};
