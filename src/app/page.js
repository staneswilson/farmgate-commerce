"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Truck,
  Leaf,
  IndianRupee,
  Clock,
  Star,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { user, loading: userLoading } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Mock data for featured products
    setFeaturedProducts([
      {
        id: 1,
        name: "Organic Tomatoes",
        price: 30,
        unit: "kg",
        image: "https://api.switchx.dev/api/mocks/images?query=tomatoes",
        farmer: "Green Valley Farm",
        rating: 4.8,
        sameDay: true,
      },
      {
        id: 2,
        name: "Fresh Strawberries",
        price: 150,
        unit: "basket",
        image: "https://api.switchx.dev/api/mocks/images?query=strawberries",
        farmer: "Berry Fields",
        rating: 4.9,
        sameDay: true,
      },
      {
        id: 3,
        name: "Organic Spinach",
        price: 65,
        unit: "bunch",
        image: "https://api.switchx.dev/api/mocks/images?query=spinach",
        farmer: "Riverside Organics",
        rating: 4.7,
        sameDay: false,
      },
      {
        id: 4,
        name: "Farm Fresh Eggs",
        price: 5.25,
        unit: "each",
        image: "https://api.switchx.dev/api/mocks/images?query=eggs",
        farmer: "Happy Hen Farm",
        rating: 4.9,
        sameDay: true,
      },
    ]);

    // Mock data for categories
    setCategories([
      {
        id: "vegetables",
        name: "Vegetables",
        image: "https://api.switchx.dev/api/mocks/images?query=vegetables",
        count: 45,
      },
      {
        id: "fruits",
        name: "Fruits",
        image: "https://api.switchx.dev/api/mocks/images?query=fruits",
        count: 38,
      },
      {
        id: "dairy",
        name: "Dairy",
        image: "https://api.switchx.dev/api/mocks/images?query=dairy",
        count: 24,
      },
      {
        id: "meat",
        name: "Meat & Poultry",
        image: "https://api.switchx.dev/api/mocks/images?query=meat",
        count: 19,
      },
    ]);
  }, []);

  const features = [
    {
      icon: <Truck className="w-10 h-10 text-green-600" />,
      title: "Same-Day Delivery",
      description:
        "Get fresh produce delivered to your doorstep on the same day it's harvested.",
    },
    {
      icon: <Leaf className="w-10 h-10 text-green-600" />,
      title: "Farm Fresh Quality",
      description:
        "All products come directly from local farms with no middlemen involved.",
    },
    {
      icon: <IndianRupee className="w-10 h-10 text-green-600" />,
      title: "Fair Pricing",
      description:
        "Farmers get better prices and you pay less by cutting out middlemen.",
    },
    {
      icon: <Clock className="w-10 h-10 text-green-600" />,
      title: "Real-Time Updates",
      description:
        "Get notifications when farmers update their inventory with fresh products.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Customer",
      content:
        "I've been using Farm-Direct-Connect for 3 months now and the quality of produce is amazing! I love knowing exactly which farm my food comes from.",
      avatar: "https://api.switchx.dev/api/mocks/images?query=woman",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Small-Scale Farmer",
      content:
        "This platform has transformed my business. I can now sell directly to customers and get fair prices for my produce. The same-day delivery option has been a game-changer.",
      avatar: "https://api.switchx.dev/api/mocks/images?query=farmer",
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Food Enthusiast",
      content:
        "The difference in taste between supermarket produce and what I get from Farm-Direct-Connect is incredible. Everything is so fresh and flavorful!",
      avatar: "https://api.switchx.dev/api/mocks/images?query=woman2",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-50 to-amber-50 overflow-hidden">
          <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg"
              >
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  <span className="block text-green-600">Farm Fresh</span>
                  <span className="block">Delivered Direct</span>
                </h1>
                <p className="mt-6 text-xl text-gray-600">
                  Connect directly with local farmers for the freshest produce.
                  Support small-scale agriculture and enjoy same-day delivery
                  from farm to table.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link href="/shop">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Shop Now
                    </Button>
                  </Link>
                  <Link href="/farmers">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                    >
                      Meet Our Farmers
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
              >
                <Image
                  src="https://api.switchx.dev/api/mocks/images?query=farm+vegetables"
                  alt="Fresh farm produce"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Why Choose FarmGate Commerce?
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                We're revolutionizing how fresh produce gets from farms to your
                table, making it better for everyone involved.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg"
                >
                  <div className="p-3 bg-green-100 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Shop by Category
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                  Explore our wide range of farm-fresh products
                </p>
              </div>
              <Link href="/shop" className="mt-4 md:mt-0">
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-700 flex items-center"
                >
                  View All Categories
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/shop?category=${category.id}`}>
                    <div className="group relative h-64 overflow-hidden rounded-lg">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-semibold">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {category.count} products
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Featured Products
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                  Handpicked fresh items from our local farmers
                </p>
              </div>
              <Link href="/shop" className="mt-4 md:mt-0">
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-700 flex items-center"
                >
                  View All Products
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
                    <div className="relative h-48">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.sameDay && (
                        <Badge className="absolute top-2 right-2 bg-green-600">
                          Same-Day Delivery
                        </Badge>
                      )}
                      {!product.sameDay && (
                        <Badge
                          variant="outline"
                          className="absolute top-2 right-2 bg-amber-100 text-amber-800 border-amber-300"
                        >
                          2-Day Delivery
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            by {product.farmer}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-500 mr-1" />
                          <span className="text-sm font-medium">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="font-semibold text-lg">
                          ₹{product.price.toFixed(2)}
                          <span className="text-sm text-gray-500 ml-1">
                            /{product.unit}
                          </span>
                        </p>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-green-50">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform makes it easy to connect farmers with consumers
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-600 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Browse & Select
                </h3>
                <p className="text-gray-600">
                  Explore products from local farmers and add your favorites to
                  your cart.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-600 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Farmers Prepare
                </h3>
                <p className="text-gray-600">
                  Farmers harvest your order fresh and prepare it for delivery.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 text-green-600 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Same-Day Delivery
                </h3>
                <p className="text-gray-600">
                  Receive your fresh produce directly at your doorstep on the
                  same day.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                What Our Community Says
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from farmers and customers who are part of our growing
                community
              </p>
            </div>

            <Tabs defaultValue="customers" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="farmers">Farmers</TabsTrigger>
              </TabsList>
              <TabsContent value="customers">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {testimonials
                    .filter(
                      (t) =>
                        t.role.includes("Customer") ||
                        t.role.includes("Enthusiast")
                    )
                    .map((testimonial, index) => (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 p-6 rounded-lg"
                      >
                        <div className="flex items-center mb-4">
                          <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 italic">
                          "{testimonial.content}"
                        </p>
                        <div className="flex mt-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-amber-500"
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="farmers">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {testimonials
                    .filter((t) => t.role.includes("Farmer"))
                    .map((testimonial, index) => (
                      <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 p-6 rounded-lg"
                      >
                        <div className="flex items-center mb-4">
                          <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 italic">
                          "{testimonial.content}"
                        </p>
                        <div className="flex mt-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-amber-500"
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to Experience Farm-Fresh Goodness?
              </h2>
              <p className="mt-4 text-lg text-green-100">
                Join our community today and start enjoying fresh, locally-grown
                produce delivered directly to your door.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-green-700 hover:bg-green-50"
                  >
                    Sign Up Now
                  </Button>
                </Link>
                <Link href="/farmers/join">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-green-700"
                  >
                    Join as a Farmer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
