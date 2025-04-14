// src/app/dashboard/page.js
"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AlertTriangle,
  ShoppingBag,
  Package,
  BarChart,
  User,
  Settings,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, loading } = useAuth(); // Get user and loading state

  if (loading) {
    // Basic loading state
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!user) {
    // Should be handled by routing/layout, but added as a safeguard
    // You might want to redirect to login here instead
    return <p>Please log in to view your dashboard.</p>;
  }

  // *** IMPORTANT CHECK ***
  // Check the user preferences for accountType
  // Make sure 'accountType' is being fetched and is part of the 'user' object from AuthContext
  const isFarmer = user.prefs?.accountType === "farmer";
  // console.log("User Prefs:", user.prefs); // Add this log to debug if needed

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Welcome back, {user.name || "User"}!
      </h1>
      <p className="mb-6 text-sm text-gray-600">
        You are logged in as a:{" "}
        <span className="font-semibold capitalize">
          {isFarmer ? "Farmer" : "Customer"}
        </span>
      </p>

      {/* Conditional Rendering based on the check */}
      {isFarmer ? (
        <FarmerDashboardContent user={user} />
      ) : (
        <CustomerDashboardContent user={user} />
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" /> Account Settings
          </CardTitle>
          <CardDescription>
            Manage your profile and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/settings">
            <Button variant="outline">Go to Settings</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

// Example Customer Dashboard Components (Keep as previously defined or enhance)
function CustomerDashboardContent({ user }) {
  // Mock data - replace with actual data fetching
  const recentOrders = [
    {
      id: "123",
      date: "2025-04-13",
      total: 250,
      status: "Processing",
      warning: false,
    },
    {
      id: "124",
      date: "2025-04-12",
      total: 180,
      status: "Delivered",
      warning: false,
    },
    {
      id: "125",
      date: "2025-04-14",
      total: 300,
      status: "Shipped",
      warning: true,
    }, // Example warning
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Recent Orders
          </CardTitle>
          <CardDescription>View your recent purchases.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center text-sm"
            >
              <span>
                Order #{order.id} ({order.date})
              </span>
              <div className="flex items-center gap-1">
                {order.warning && (
                  <AlertTriangle
                    className="w-4 h-4 text-amber-500"
                    title="Delivery may take longer than 1 day"
                  />
                )}
                <span
                  className={`font-medium ${
                    order.warning ? "text-amber-600" : ""
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
          <Link href="/dashboard/orders">
            <Button variant="link" className="p-0 h-auto text-green-600">
              View All Orders
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" /> Saved Farmers
          </CardTitle>
          <CardDescription>Your favorite local producers.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add logic to display saved farmers */}
          <p className="text-sm text-gray-500">
            You haven't saved any farmers yet.
          </p>
          <Link href="/farmers">
            <Button variant="link" className="p-0 h-auto text-green-600 mt-2">
              Browse Farmers
            </Button>
          </Link>
        </CardContent>
      </Card>
      {/* Add more customer-specific cards as needed */}
    </div>
  );
}

// Example Farmer Dashboard Components (Keep as previously defined or enhance)
function FarmerDashboardContent({ user }) {
  // Mock data - replace with actual data fetching
  const pendingOrders = 3;
  const lowStockItems = 2;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Pending Orders
          </CardTitle>
          <CardDescription>Orders needing fulfillment.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{pendingOrders}</p>
          {/* Add delivery confirmation logic here */}
          <Link href="/dashboard/orders">
            <Button variant="link" className="p-0 h-auto text-green-600 mt-2">
              Manage Orders
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" /> Product Inventory
          </CardTitle>
          <CardDescription>Manage your listings and stock.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add inventory summary logic here */}
          {lowStockItems > 0 && (
            <p className="text-sm text-amber-600 flex items-center gap-1 mb-2">
              <AlertTriangle className="w-4 h-4" /> {lowStockItems} item(s) low
              on stock.
            </p>
          )}
          <Link href="/dashboard/products">
            <Button variant="link" className="p-0 h-auto text-green-600">
              Manage Products
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" /> Sales Analytics
          </CardTitle>
          <CardDescription>View your performance.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add analytics chart/summary here */}
          <p className="text-sm text-gray-500">Analytics coming soon.</p>
          <Link href="/dashboard/analytics">
            <Button variant="link" className="p-0 h-auto text-green-600 mt-2">
              View Analytics
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
