"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function Cart() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } =
    useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode) return;

    setIsApplyingCoupon(true);

    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false);
      setCouponCode("");
      // In a real app, you would apply the discount here
    }, 1000);
  };

  const handleCheckout = () => {
    if (user) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=/checkout");
    }
  };

  // Calculate summary
  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-lg shadow-sm p-8 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Link href="/shop">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center">
                            <div className="relative w-full sm:w-24 h-24 rounded-md overflow-hidden mb-4 sm:mb-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 sm:ml-4">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <Link href={`/shop/${item.id}`}>
                                    <h3 className="font-semibold text-lg text-gray-900 hover:text-green-600">
                                      {item.name}
                                    </h3>
                                  </Link>
                                  <p className="text-sm text-gray-500">
                                    {formatCurrency(item.price)} per {item.unit}
                                  </p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                  <p className="font-semibold text-lg text-gray-900">
                                    {formatCurrency(item.price * item.quantity)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    disabled={item.quantity <= 1}
                                    className="h-8 w-8 rounded-none rounded-l-md"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </Button>
                                  <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateQuantity(
                                        item.id,
                                        parseInt(e.target.value) || 1
                                      )
                                    }
                                    min="1"
                                    className="h-8 w-12 border-0 text-center"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="h-8 w-8 rounded-none rounded-r-md"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </Button>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                          {index < cartItems.length - 1 && (
                            <Separator className="my-6" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-6 pt-0">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="text-red-500 border-red-500 hover:bg-red-50"
                    >
                      Clear Cart
                    </Button>
                    <Link href="/shop">
                      <Button variant="outline">Continue Shopping</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">
                          {formatCurrency(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-medium">
                          {deliveryFee === 0
                            ? "Free"
                            : formatCurrency(deliveryFee)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (5%)</span>
                        <span className="font-medium">
                          {formatCurrency(tax)}
                        </span>
                      </div>
                      {deliveryFee > 0 && (
                        <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md flex items-start">
                          <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                          <span>
                            Add {formatCurrency(500 - subtotal)} more to qualify
                            for free delivery
                          </span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex space-x-2 mb-4">
                        <Input
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyCoupon}
                          disabled={isApplyingCoupon || !couponCode}
                        >
                          Apply
                        </Button>
                      </div>
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
