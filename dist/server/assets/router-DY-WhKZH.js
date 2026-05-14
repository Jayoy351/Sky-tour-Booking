import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouter, Link, createRootRouteWithContext, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { ChevronRight, Check, Circle, Globe2, ShoppingCart, LogOut, User } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Toaster as Toaster$1 } from "sonner";
const appCss = "/assets/styles-BnoAbnqE.css";
const AuthContext = createContext(null);
const USERS_KEY = "skytour_users";
const SESSION_KEY = "skytour_session";
function readUsers() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      if (s) setUser(JSON.parse(s));
    } catch {
    }
  }, []);
  const register = (name, email, password) => {
    const users = readUsers();
    const key = email.toLowerCase().trim();
    if (!key || !password || !name) return { ok: false, error: "All fields are required." };
    if (users[key]) return { ok: false, error: "An account with this email already exists." };
    users[key] = { name, password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const u = { name, email: key };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return { ok: true };
  };
  const login = (email, password) => {
    const users = readUsers();
    const key = email.toLowerCase().trim();
    const rec = users[key];
    if (!rec || rec.password !== password) return { ok: false, error: "Invalid email or password." };
    const u = { name: rec.name, email: key };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return { ok: true };
  };
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: { user, register, login, logout }, children });
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
const CartContext = createContext(null);
const CART_KEY = "skytour_cart";
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const s = localStorage.getItem(CART_KEY);
      if (s) setItems(JSON.parse(s));
    } catch {
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);
  const add = (item) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
  };
  const update = (id, patch) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, ...patch } : it));
  };
  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
  const clear = () => setItems([]);
  const total = items.reduce((s, it) => s + it.pricePerPerson * it.travelers, 0);
  const count = items.reduce((s, it) => s + it.travelers, 0);
  return /* @__PURE__ */ jsx(CartContext.Provider, { value: { items, add, update, remove, clear, total, count }, children });
}
function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function Header() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 border-b bg-background/85 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Globe2, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-lg font-bold tracking-tight", children: "Sky Tour Booking" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-8 md:flex", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", activeOptions: { exact: true }, className: "text-sm font-medium text-muted-foreground hover:text-primary [&.active]:text-primary", children: "Home" }),
      /* @__PURE__ */ jsx(Link, { to: "/destinations", className: "text-sm font-medium text-muted-foreground hover:text-primary [&.active]:text-primary", children: "Destinations" }),
      /* @__PURE__ */ jsxs(Link, { to: "/cart", className: "relative flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary [&.active]:text-primary", children: [
        "Cart",
        /* @__PURE__ */ jsx("span", { className: "grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground", children: count })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/cart", className: "relative md:hidden", children: [
        /* @__PURE__ */ jsx(ShoppingCart, { className: "h-5 w-5" }),
        count > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground", children: count })
      ] }),
      user ? /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold", children: user.name[0]?.toUpperCase() }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: user.name.split(" ")[0] })
        ] }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "text-xs text-muted-foreground", children: user.email }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => router2.navigate({ to: "/cart" }), children: [
            /* @__PURE__ */ jsx(ShoppingCart, { className: "mr-2 h-4 w-4" }),
            " My Cart"
          ] }),
          /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: logout, children: [
            /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            " Logout"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsx(Button, { asChild: true, className: "gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/login", children: [
        /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
        " Login"
      ] }) })
    ] })
  ] }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This page doesn't exist." }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4 text-center", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsx("button", { onClick: () => {
      router2.invalidate();
      reset();
    }, className: "mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground", children: "Try again" })
  ] }) });
}
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sky Tour Booking — Discover the Philippines" },
      { name: "description", content: "Book curated island tours, beach escapes, and adventures across the Philippines with Sky Tour Booking." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxs("footer", { className: "border-t bg-card py-8 text-center text-sm text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Sky Tour Booking · Crafted for unforgettable Philippine getaways."
      ] })
    ] }),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) }) });
}
const $$splitComponentImporter$4 = () => import("./register-Dfuwr4C8.js");
const Route$4 = createFileRoute("/register")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: () => ({
    meta: [{
      title: "Create Account · Sky Tour Booking"
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./login-ZRdwK8wC.js");
const Route$3 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "Login · Sky Tour Booking"
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./destinations-C4SQuJ00.js");
const Route$2 = createFileRoute("/destinations")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Destinations · Sky Tour Booking"
    }]
  })
});
const $$splitComponentImporter$1 = () => import("./cart-CWze0zTe.js");
const Route$1 = createFileRoute("/cart")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  head: () => ({
    meta: [{
      title: "My Cart · Sky Tour Booking"
    }]
  })
});
const $$splitComponentImporter = () => import("./index-CXw921WN.js");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$4.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$5
});
const LoginRoute = Route$3.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$5
});
const DestinationsRoute = Route$2.update({
  id: "/destinations",
  path: "/destinations",
  getParentRoute: () => Route$5
});
const CartRoute = Route$1.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$5
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  CartRoute,
  DestinationsRoute,
  LoginRoute,
  RegisterRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  useCart as a,
  cn as c,
  router as r,
  useAuth as u
};
