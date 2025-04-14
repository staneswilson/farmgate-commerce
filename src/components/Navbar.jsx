"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext"; // Added import for useCart
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart(); // Defined getCartCount from useCart
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Farmers", href: "/farmers" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">
              FarmGate<span className="text-amber-500">Commerce</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-amber-500">
                {getCartCount()} {/* Updated to get dynamic cart count */}
              </Badge>
            </Button>
          </Link>

          {user ? (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link href="/dashboard">
                <Avatar className="w-8 h-8 transition-opacity hover:opacity-80">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  />
                  <AvatarFallback className="bg-green-100 text-green-800">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button
                variant="outline"
                className="text-sm border-green-600 text-green-600 hover:bg-green-50"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-sm border-green-600 text-green-600 hover:bg-green-50"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="text-sm bg-green-600 hover:bg-green-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Toggle Menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="text-xl font-bold text-green-600">
                    FarmGate<span className="text-amber-500">Commerce</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto py-4">
                  <div className="flex flex-col space-y-3 px-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`py-2 text-base font-medium transition-colors ${
                          isActive(link.href)
                            ? "text-green-600"
                            : "text-gray-700 hover:text-green-600"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="h-px my-2 bg-gray-200" />
                    {user ? (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center py-2 space-x-2 text-base font-medium text-gray-700 transition-colors hover:text-green-600"
                        >
                          <User className="w-5 h-5" />
                          <span>Dashboard</span>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full mt-2 border-green-600 text-green-600 hover:bg-green-50"
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col space-y-3 mt-2">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="outline"
                            className="w-full border-green-600 text-green-600 hover:bg-green-50"
                          >
                            Login
                          </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsOpen(false)}>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
