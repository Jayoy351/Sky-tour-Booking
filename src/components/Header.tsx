import { Link, useRouter } from "@tanstack/react-router";
import { Globe2, ShoppingCart, User as UserIcon, LogOut } from "lucide-react";
import { useAuth, useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
            <Globe2 className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">Sky Tour Booking</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" activeOptions={{ exact: true }} className="text-sm font-medium text-muted-foreground hover:text-primary [&.active]:text-primary">Home</Link>
          <Link to="/destinations" className="text-sm font-medium text-muted-foreground hover:text-primary [&.active]:text-primary">Destinations</Link>
          <Link to="/cart" className="relative flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary [&.active]:text-primary">
            Cart
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
              {count}
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative md:hidden">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {user.name[0]?.toUpperCase()}
                  </span>
                  <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs text-muted-foreground">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.navigate({ to: "/cart" })}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> My Cart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="gap-2">
              <Link to="/login"><UserIcon className="h-4 w-4" /> Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
