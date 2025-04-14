"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast"; // Adjusted import
import { formatCurrency } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Client, Databases, ID } from "appwrite";
import { Loader2, CreditCard, Truck, MapPin, ShieldCheck } from "lucide-react";

export default function Checkout() {
  const router = useRouter();
  const { user, loading: userLoading } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [addressType, setAddressType] = useState("home");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    saveAddress: true,
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (!userLoading && cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router, userLoading]);

  // Prefill user data if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      saveAddress: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      const requiredFields = [
        "fullName",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "pincode",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
      }

      // Create order in database
      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

      const databases = new Databases(client);

      const subtotal = getCartTotal();
      const deliveryFee = subtotal > 500 ? 0 : 50;
      const tax = subtotal * 0.05; // 5% tax
      const total = subtotal + deliveryFee + tax;

      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

      // Create order
      await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        "orders",
        ID.unique(),
        {
          userId: user.$id,
          items: JSON.stringify(cartItems),
          totalAmount: total,
          status: "pending",
          paymentMethod,
          shippingAddress,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );

      // Clear cart
      clearCart();

      // Show success message
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be processed soon.",
        variant: "success",
      });

      // Redirect to order confirmation
      router.push("/dashboard/orders");
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description:
          error.message ||
          "An error occurred during checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate summary
  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;

  // Redirect if not logged in
  if (!userLoading && !user) {
    router.push("/login?redirect=/checkout");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-600" />
                      Shipping Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="address">Address *</Label>
                        <RadioGroup
                          value={addressType}
                          onValueChange={setAddressType}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="home" id="home" />
                            <Label
                              htmlFor="home"
                              className="text-sm cursor-pointer"
                            >
                              Home
                            </Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="work" id="work" />
                            <Label
                              htmlFor="work"
                              className="text-sm cursor-pointer"
                            >
                              Work
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your street address"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter your city"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter your state"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">PIN Code *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="Enter your PIN code"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox
                        id="saveAddress"
                        checked={formData.saveAddress}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label
                        htmlFor="saveAddress"
                        className="text-sm cursor-pointer"
                      >
                        Save this address for future orders
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-green-600" />
                      Delivery Options
                    </h2>

                    <RadioGroup defaultValue="standard" className="space-y-3">
                      <div className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <div>
                            <Label
                              htmlFor="standard"
                              className="font-medium cursor-pointer"
                            >
                              Standard Delivery
                            </Label>
                            <p className="text-sm text-gray-500">
                              Delivery within 2-3 days
                            </p>
                          </div>
                        </div>
                        <span className="font-medium">
                          {deliveryFee === 0
                            ? "Free"
                            : formatCurrency(deliveryFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="express"
                            id="express"
                            disabled
                          />
                          <div>
                            <Label
                              htmlFor="express"
                              className="font-medium cursor-pointer"
                            >
                              Express Delivery
                            </Label>
                            <p className="text-sm text-gray-500">
                              Same-day delivery (Not available for your area)
                            </p>
                          </div>
                        </div>
                        <span className="font-medium text-gray-400">
                          {formatCurrency(150)}
                        </span>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                      Payment Method
                    </h2>

                    <Tabs
                      defaultValue="cod"
                      onValueChange={setPaymentMethod}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                        <TabsTrigger value="upi">UPI</TabsTrigger>
                        <TabsTrigger value="card">
                          Credit/Debit Card
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="cod" className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <ShieldCheck className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Pay when you receive
                              </p>
                              <p className="text-sm text-gray-600">
                                Pay with cash upon delivery. Please keep the
                                exact amount ready.
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="upi" className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="upiId">UPI ID</Label>
                            <Input
                              id="upiId"
                              placeholder="yourname@upi"
                              className="mt-1"
                            />
                          </div>
                          <div className="bg-amber-50 p-4 rounded-lg">
                            <p className="text-sm text-amber-800">
                              You will receive a payment request on your UPI app
                              when you place the order.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="card" className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="mt-1"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                type="password"
                                placeholder="123"
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="nameOnCard">Name on Card</Label>
                            <Input
                              id="nameOnCard"
                              placeholder="Enter name as on card"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-green-600 hover:bg-green-700"
                    disabled={loading || cartItems.length === 0}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Place Order • {formatCurrency(total)}</>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">
                        {deliveryFee === 0
                          ? "Free"
                          : formatCurrency(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (5%)</span>
                      <span className="font-medium">{formatCurrency(tax)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <div className="mt-6 bg-green-50 p-3 rounded-lg">
                    <div className="flex items-start">
                      <ShieldCheck className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                      <div className="text-sm text-green-800">
                        <p className="font-medium">Secure Payment</p>
                        <p>Your payment information is processed securely.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link href="/cart">
                      <Button variant="outline" className="w-full">
                        Back to Cart
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
