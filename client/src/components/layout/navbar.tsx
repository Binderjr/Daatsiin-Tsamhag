import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  UserCircle, 
  Menu, 
  X, 
  ChevronDown 
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground border-b border-primary/20 shadow-xl">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-secondary p-2 rounded transform group-hover:rotate-3 transition-transform">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-wide uppercase">
            Apex<span className="text-secondary">Construct</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium hover:text-secondary transition-colors uppercase tracking-wider ${isActive(link.href) ? 'text-secondary font-bold' : 'text-gray-200'}`}>
              {link.label}
            </Link>
          ))}
          
          {/* Properties Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-secondary transition-colors uppercase tracking-wider text-gray-200 outline-none">
              Properties <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-gray-800 border-none shadow-xl rounded-md p-2 w-48 animate-in slide-in-from-top-2 fade-in duration-200">
              <DropdownMenuItem asChild>
                <Link href="/properties" className="cursor-pointer hover:bg-gray-100 rounded-sm font-medium">All Properties</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/properties?status=for_rent" className="cursor-pointer hover:bg-gray-100 rounded-sm font-medium">For Rent</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/properties?status=for_sale" className="cursor-pointer hover:bg-gray-100 rounded-sm font-medium">For Invest / Sale</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/20">
              <Link href="/dashboard" className={`text-sm font-medium hover:text-secondary transition-colors ${isActive('/dashboard') ? 'text-secondary' : 'text-gray-200'}`}>
                Dashboard
              </Link>
              {(user?.role === 'customer' || user?.role === 'worker') && (
                <Link href="/investments" className={`text-sm font-medium hover:text-secondary transition-colors ${isActive('/investments') ? 'text-secondary' : 'text-gray-200'}`}>
                  My Investments
                </Link>
              )}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-300 font-mono">
                  {user?.firstName || user?.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => logout()}
                  className="border-white/30 text-white hover:bg-white hover:text-primary bg-transparent h-8"
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <Link href="/api/login" className="ml-4">
              <Button variant="secondary" size="sm" className="font-bold">
                Client Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 p-4 absolute w-full shadow-2xl animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 font-medium hover:text-secondary">
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <Link href="/properties" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 font-medium hover:text-secondary">Properties</Link>
            <Link href="/properties?status=for_rent" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 pl-4 text-sm hover:text-secondary">For Rent</Link>
            <Link href="/properties?status=for_sale" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 pl-4 text-sm hover:text-secondary">For Sale</Link>
            
            <div className="h-px bg-white/10 my-1" />
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 font-medium hover:text-secondary">Dashboard</Link>
                <Link href="/investments" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-200 font-medium hover:text-secondary">My Investments</Link>
                <Button 
                  variant="destructive" 
                  className="w-full mt-2"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/api/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full mt-2">Client Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
