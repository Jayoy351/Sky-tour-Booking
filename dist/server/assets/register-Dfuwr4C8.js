import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { u as useAuth, B as Button } from "./router-DY-WhKZH.js";
import { L as Label, I as Input } from "./label-B-NOTBy6.js";
import { UserPlus, User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-label";
function RegisterPage() {
  const {
    register
  } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (password !== confirm) return toast.error("Passwords do not match.");
    const r = register(name, email, password);
    if (!r.ok) return toast.error(r.error || "Registration failed");
    toast.success("Account created. Welcome aboard!");
    router.navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative hidden overflow-hidden rounded-3xl lg:block", children: [
      /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200&q=80", alt: "Adventure", className: "h-full w-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-8 left-8 right-8 text-primary-foreground", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Start Your Adventure" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-white/80", children: "Create your free account to book unforgettable Philippine getaways." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border bg-card p-8 shadow-sm sm:p-10", children: [
      /* @__PURE__ */ jsx("span", { className: "mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(UserPlus, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-center text-2xl font-bold", children: "Create Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-center text-sm text-muted-foreground", children: "Just a few details to get you started." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "nm", children: "Full Name" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { id: "nm", required: true, placeholder: "Juan Dela Cruz", className: "pl-9", value: name, onChange: (e) => setName(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "em", children: "Email Address" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { id: "em", type: "email", required: true, placeholder: "you@example.com", className: "pl-9", value: email, onChange: (e) => setEmail(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "pw", children: "Password" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { id: "pw", type: show ? "text" : "password", required: true, placeholder: "At least 6 characters", className: "pl-9 pr-9", value: password, onChange: (e) => setPassword(e.target.value) }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setShow((s) => !s), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground", children: show ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "cf", children: "Confirm Password" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { id: "cf", type: show ? "text" : "password", required: true, placeholder: "Repeat your password", className: "pl-9", value: confirm, onChange: (e) => setConfirm(e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: "Create Account" })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "font-semibold text-primary hover:underline", children: "Login here" })
      ] })
    ] })
  ] });
}
export {
  RegisterPage as component
};
