import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, User as UserIcon, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "Create Account · Sky Tour Booking" }] }),
});

function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (password !== confirm) return toast.error("Passwords do not match.");
    const r = register(name, email, password);
    if (!r.ok) return toast.error(r.error || "Registration failed");
    toast.success("Account created. Welcome aboard!");
    router.navigate({ to: "/" });
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden rounded-3xl lg:block">
        <img src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=1200&q=80" alt="Adventure" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 text-primary-foreground">
          <h2 className="text-3xl font-bold">Start Your Adventure</h2>
          <p className="mt-2 text-white/80">Create your free account to book unforgettable Philippine getaways.</p>
        </div>
      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary"><UserPlus className="h-6 w-6" /></span>
        <h1 className="mt-4 text-center text-2xl font-bold">Create Account</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Just a few details to get you started.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="nm">Full Name</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="nm" required placeholder="Juan Dela Cruz" className="pl-9" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
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
              <Input id="pw" type={show ? "text" : "password"} required placeholder="At least 6 characters" className="pl-9 pr-9" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="cf">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="cf" type={show ? "text" : "password"} required placeholder="Repeat your password" className="pl-9" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="w-full">Create Account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
