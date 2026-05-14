import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ---------- Types ----------
export type User = { name: string; email: string };
export type CartItem = {
  id: string;
  destinationId: string;
  title: string;
  image: string;
  pricePerPerson: number;
  travelers: number;
  date: string;
  tourType: string;
};

// ---------- Auth ----------
type AuthCtx = {
  user: User | null;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

const USERS_KEY = "skytour_users";
const SESSION_KEY = "skytour_session";

function readUsers(): Record<string, { name: string; password: string }> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); } catch { return {}; }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      if (s) setUser(JSON.parse(s));
    } catch {}
  }, []);

  const register: AuthCtx["register"] = (name, email, password) => {
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

  const login: AuthCtx["login"] = (email, password) => {
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

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

// ---------- Cart ----------
type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "id">) => void;
  update: (id: string, patch: Partial<CartItem>) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartCtx | null>(null);
const CART_KEY = "skytour_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem(CART_KEY);
      if (s) setItems(JSON.parse(s));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const add: CartCtx["add"] = (item) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
  };
  const update: CartCtx["update"] = (id, patch) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  };
  const remove: CartCtx["remove"] = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
  const clear = () => setItems([]);

  const total = items.reduce((s, it) => s + it.pricePerPerson * it.travelers, 0);
  const count = items.reduce((s, it) => s + it.travelers, 0);

  return (
    <CartContext.Provider value={{ items, add, update, remove, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
