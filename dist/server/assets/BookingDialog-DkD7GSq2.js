import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, MapPin, Star, Calendar, Users } from "lucide-react";
import { c as cn, u as useAuth, a as useCart, B as Button } from "./router-DY-WhKZH.js";
import { L as Label, I as Input } from "./label-B-NOTBy6.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, p as peso } from "./select-C-0mX85y.js";
import { toast } from "sonner";
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const TOUR_TYPES = [
  { value: "Day Tour", multiplier: 1 },
  { value: "2 Days 1 Night", multiplier: 1.7 },
  { value: "3 Days 2 Nights", multiplier: 2.3 }
];
function BookingDialog({
  destination,
  open,
  onOpenChange
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
      tourType
    });
    toast.success(`${destination.name} added to your cart.`);
    onOpenChange(false);
    setName("");
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-2xl overflow-hidden p-0", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative hidden md:block", children: [
      /* @__PURE__ */ jsx("img", { src: destination.image, alt: destination.name, className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-4 left-4 right-4 text-primary-foreground", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-xs", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
          " ",
          destination.location
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-1 text-xl font-bold", children: destination.name }),
        /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-1 text-xs", children: [
          /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-current text-amber-300" }),
          " ",
          destination.rating,
          " · ",
          destination.reviews,
          " reviews"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Book this trip" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Fill in the details to add it to your cart." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "bn", children: "Full name" }),
          /* @__PURE__ */ jsx(Input, { id: "bn", value: name, onChange: (e) => setName(e.target.value), placeholder: user?.name || "Your name" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Tour type" }),
          /* @__PURE__ */ jsxs(Select, { value: tourType, onValueChange: setTourType, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: TOUR_TYPES.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t.value, children: t.value }, t.value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "dt", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "mr-1 inline h-3 w-3" }),
              "Travel date"
            ] }),
            /* @__PURE__ */ jsx(Input, { id: "dt", type: "date", value: date, min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), onChange: (e) => setDate(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Label, { htmlFor: "tv", children: [
              /* @__PURE__ */ jsx(Users, { className: "mr-1 inline h-3 w-3" }),
              "Travelers"
            ] }),
            /* @__PURE__ */ jsx(Input, { id: "tv", type: "number", min: 1, max: 20, value: travelers, onChange: (e) => setTravelers(Math.max(1, Number(e.target.value) || 1)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border bg-secondary/40 p-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Per person" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: peso(unit) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Travelers" }),
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              "× ",
              travelers
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex justify-between border-t pt-2 text-base", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Total" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-primary", children: peso(total) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { className: "mt-4", children: user ? /* @__PURE__ */ jsx(Button, { onClick: handleAdd, className: "w-full", children: "Add to Cart" }) : /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Login to Book" }) }) })
    ] })
  ] }) }) });
}
export {
  BookingDialog as B
};
