"use client";

import DashboardSidebar from "@/components/DashboardSidebar"; //
import { AuthProvider } from "@/context/AuthContext"; //
import { CartProvider } from "@/context/CartContext"; //
import { Toaster } from "@/components/ui/toaster"; //
import Footer from "@/components/Footer";

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      {" "}
      {/* */}
      <CartProvider>
        {" "}
        {/* */}
        <div className="flex h-screen bg-gray-100">
          <DashboardSidebar /> {/* */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* You could add a dashboard-specific header here if needed */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
              {children}
            </main>
            <Toaster /> {/* */}
          </div>
        </div>
      </CartProvider>
      <Footer />
    </AuthProvider>
  );
}
