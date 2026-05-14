import { r as reactExports, W as jsxRuntimeExports } from "./server-C26A_EpO.js";
import { D as DESTINATIONS, p as peso } from "./select-CiQP6Bwc.js";
import { M as MapPin, S as Star, B as BookingDialog } from "./BookingDialog-CRaxfQAi.js";
import { c as createLucideIcon, B as Button } from "./router-DmwfAqjj.js";
import { I as Input } from "./label-Bj31XMF-.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function DestinationsPage() {
  const [q, setQ] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const [open, setOpen] = reactExports.useState(false);
  const filtered = DESTINATIONS.filter((d) => `${d.name} ${d.location}`.toLowerCase().includes(q.toLowerCase()));
  const book = (d) => {
    setSelected(d);
    setOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold sm:text-4xl", children: "All Destinations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Click any place to fill in your booking and add it to your cart." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search destinations…", className: "pl-9" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => book(d), className: "block w-full text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-56 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image, alt: d.name, className: "h-full w-full object-cover transition duration-500 group-hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3 w-3 text-primary" }),
            " Favorite"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground", children: [
            peso(d.price),
            " / pax"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              d.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }),
              d.rating,
              " (",
              d.reviews,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-lg font-semibold", children: d.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: d.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 border-t bg-secondary/30 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => book(d), className: "flex-1", children: "Book Now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => book(d), children: "View Details" })
      ] })
    ] }, d.id)) }),
    filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-12 text-center text-muted-foreground", children: [
      'No destinations match "',
      q,
      '".'
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BookingDialog, { destination: selected, open, onOpenChange: setOpen })
  ] });
}
export {
  DestinationsPage as component
};
