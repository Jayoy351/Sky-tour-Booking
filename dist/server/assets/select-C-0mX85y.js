import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check, ChevronUp } from "lucide-react";
import { c as cn } from "./router-DY-WhKZH.js";
const DESTINATIONS = [
  {
    id: "boracay",
    name: "Boracay Island Escape",
    location: "Aklan, Philippines",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
    price: 3500,
    rating: 4.8,
    reviews: 124,
    description: "Powdery white sand, turquoise waters and unforgettable sunsets on world-famous White Beach.",
    highlights: ["White Beach access", "Island hopping", "Sunset sailing", "Welcome drink"]
  },
  {
    id: "palawan",
    name: "El Nido Lagoon Tour",
    location: "Palawan, Philippines",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cddc85?w=1200&q=80",
    price: 4200,
    rating: 4.9,
    reviews: 210,
    description: "Glide through hidden lagoons and limestone cliffs in one of the world's most beautiful seascapes.",
    highlights: ["Big & Small Lagoon", "Snorkeling gear", "Buffet lunch", "Licensed guide"]
  },
  {
    id: "cebu",
    name: "Cebu Whale Shark & Falls",
    location: "Oslob, Cebu",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=80",
    price: 2800,
    rating: 4.7,
    reviews: 98,
    description: "Swim with gentle whale sharks and chase the cool blue cascades of Kawasan Falls.",
    highlights: ["Whale shark watch", "Kawasan Falls", "Lunch included", "Hotel pickup"]
  },
  {
    id: "bohol",
    name: "Bohol Countryside Day Tour",
    location: "Bohol, Philippines",
    image: "https://images.unsplash.com/photo-1565073624497-7e91b5cc3843?w=1200&q=80",
    price: 2500,
    rating: 4.6,
    reviews: 76,
    description: "Chocolate Hills, tarsiers, and a relaxing Loboc River lunch cruise in one full day.",
    highlights: ["Chocolate Hills", "Tarsier sanctuary", "River cruise", "Heritage stops"]
  },
  {
    id: "siargao",
    name: "Siargao Surf & Island Hop",
    location: "Surigao del Norte",
    image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&q=80",
    price: 3800,
    rating: 4.9,
    reviews: 142,
    description: "Catch waves at Cloud 9 and explore Naked, Daku, and Guyam islands like a local.",
    highlights: ["Cloud 9 surf", "3-island hop", "Coconut lunch", "Drone-ready spots"]
  },
  {
    id: "batanes",
    name: "Batanes Highland Adventure",
    location: "Batanes, Philippines",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    price: 5200,
    rating: 5,
    reviews: 64,
    description: "Rolling green hills, stone houses, and the dramatic cliffs of the Philippines' northern frontier.",
    highlights: ["Marlboro hills", "Vayang ridges", "Stone village tour", "Local lunch"]
  }
];
const peso = (n) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(n);
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
export {
  DESTINATIONS as D,
  Select as S,
  SelectTrigger as a,
  SelectValue as b,
  SelectContent as c,
  SelectItem as d,
  peso as p
};
