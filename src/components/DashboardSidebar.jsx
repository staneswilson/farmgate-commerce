"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Home,
  Package,
  ShoppingBag,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Truck,
  Store,
  BarChart,
} from "lucide-react";

export default function DashboardSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isFarmer = user?.prefs?.accountType === "farmer";

  const farmerLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Inventory", href: "/dashboard/inventory", icon: Store },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const customerLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Saved Farmers", href: "/dashboard/saved-farmers", icon: Users },
    { name: "Delivery Status", href: "/dashboard/delivery", icon: Truck },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const links = isFarmer ? farmerLinks : customerLinks;

  return (
    <div
      className={`h-screen flex flex-col bg-green-50 border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">
              FarmGate<span className="text-amber-500">Commerce</span>
            </span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-gray-500 hover:text-green-600"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                } ${collapsed ? "justify-center" : "justify-start"}`}
              >
                <link.icon className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/help"
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors ${
            collapsed ? "justify-center" : "justify-start"
          }`}
        >
          <HelpCircle className={`w-5 h-5 ${collapsed ? "" : "mr-3"}`} />
          {!collapsed && <span>Help & Support</span>}
        </Link>
      </div>
    </div>
  );
}
