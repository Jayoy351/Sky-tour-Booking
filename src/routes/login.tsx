import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Login · Sky Tour Booking" }] }),
});

function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = login(email, password);
    if (!r.ok) return toast.error(r.error || "Login failed");
    toast.success("Welcome back!");
    router.navigate({ to: "/" });
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden rounded-3xl lg:block">
        <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80" alt="Travel" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-primary-foreground">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mt-2 text-white/80">Login to continue building your customized travel experience.</p>
        </div>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary"><Lock className="h-6 w-6" /></span>
        <h1 className="mt-4 text-center text-2xl font-bold">Login</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Welcome back! Please login to your account.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="em">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="em" type="email" required placeholder="you@example.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="pw">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="pw" type={show ? "text" : "password"} required placeholder="Enter your password" className="pl-9 pr-9" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
