"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Search, Filter, ChevronRight } from "lucide-react";

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Mock data for farmers
    const mockFarmers = [
      {
        id: 1,
        name: "Green Valley Farm",
        location: "Riverside County, CA",
        distance: 12,
        image: "https://api.switchx.dev/api/mocks/images?query=farm",
        rating: 4.8,
        specialties: ["Vegetables", "Fruits"],
        description:
          "Family-owned organic farm specializing in heirloom vegetables and seasonal fruits. We've been farming the same land for three generations using sustainable practices.",
        sameDay: true,
        organic: true,
        featured: true,
      },
      {
        id: 2,
        name: "Berry Fields",
        location: "Santa Barbara, CA",
        distance: 18,
        image: "https://api.switchx.dev/api/mocks/images?query=berry+farm",
        rating: 4.9,
        specialties: ["Berries", "Fruits"],
        description:
          "Specializing in strawberries, blueberries, and raspberries. Our berries are grown without pesticides and picked at peak ripeness.",
        sameDay: true,
        organic: true,
        featured: true,
      },
      {
        id: 3,
        name: "Riverside Organics",
        location: "Ventura County, CA",
        distance: 25,
        image: "https://api.switchx.dev/api/mocks/images?query=organic+farm",
        rating: 4.7,
        specialties: ["Vegetables", "Herbs"],
        description:
          "Certified organic farm growing a wide variety of vegetables and culinary herbs. We focus on soil health and biodiversity.",
        sameDay: false,
        organic: true,
        featured: false,
      },
      {
        id: 4,
        name: "Happy Hen Farm",
        location: "San Luis Obispo, CA",
        distance: 15,
        image: "https://api.switchx.dev/api/mocks/images?query=chicken+farm",
        rating: 4.9,
        specialties: ["Eggs", "Poultry"],
        description:
          "Free-range, pasture-raised chickens producing the freshest eggs. Our hens are raised humanely with access to open pasture.",
        sameDay: true,
        organic: false,
        featured: true,
      },
      {
        id: 5,
        name: "Green Pastures Ranch",
        location: "Santa Ynez Valley, CA",
        distance: 30,
        image: "https://api.switchx.dev/api/mocks/images?query=cattle+ranch",
        rating: 4.8,
        specialties: ["Beef", "Dairy"],
        description:
          "Grass-fed beef and dairy products from our pasture-raised cattle. No hormones or antibiotics ever.",
        sameDay: false,
        organic: true,
        featured: false,
      },
      {
        id: 6,
        name: "Busy Bee Apiary",
        location: "Ojai Valley, CA",
        distance: 22,
        image: "https://api.switchx.dev/api/mocks/images?query=beehive",
        rating: 5.0,
        specialties: ["Honey", "Beeswax"],
        description:
          "Small-scale apiary producing raw, unfiltered honey and beeswax products. Our bees forage on wildflowers and local crops.",
        sameDay: true,
        organic: true,
        featured: false,
      },
      {
        id: 7,
        name: "Dairy Dell Farm",
        location: "Petaluma, CA",
        distance: 45,
        image: "https://api.switchx.dev/api/mocks/images?query=dairy+farm",
        rating: 4.7,
        specialties: ["Cheese", "Dairy"],
        description:
          "Artisanal cheese maker using traditional methods. Our small herd of Jersey cows produces rich, creamy milk for our cheeses.",
        sameDay: true,
        organic: false,
        featured: false,
      },
      {
        id: 8,
        name: "Root & Stem Farm",
        location: "Sonoma County, CA",
        distance: 28,
        image: "https://api.switchx.dev/api/mocks/images?query=vegetable+farm",
        rating: 4.6,
        specialties: ["Root Vegetables", "Greens"],
        description:
          "Specializing in root vegetables and leafy greens. We use no-till farming methods to preserve soil structure and health.",
        sameDay: true,
        organic: true,
        featured: false,
      },
    ];

    setFarmers(mockFarmers);
    setFilteredFarmers(mockFarmers);
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...farmers];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (farmer) =>
          farmer.name.toLowerCase().includes(query) ||
          farmer.location.toLowerCase().includes(query) ||
          farmer.description.toLowerCase().includes(query) ||
          farmer.specialties.some((s) => s.toLowerCase().includes(query))
      );
    }

    // Filter by category/specialty
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((farmer) =>
        farmer.specialties.some(
          (s) => s.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    setFilteredFarmers(result);
  }, [farmers, searchQuery, selectedCategory]);

  // Extract unique specialties for filtering
  const specialties = [
    ...new Set(farmers.flatMap((farmer) => farmer.specialties)),
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Meet Our Farmers
              </h1>
              <p className="mt-4 text-lg text-green-100">
                Connect directly with local farmers who are passionate about
                sustainable agriculture and providing the freshest produce
                possible.
              </p>
              <div className="mt-8">
                <Link href="/farmers/join">
                  <Button
                    size="lg"
                    className="bg-white text-green-700 hover:bg-green-50"
                  >
                    Join as a Farmer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Farmers */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Farmers
              </h2>
              <Link href="#all-farmers" className="mt-4 md:mt-0">
                <Button
                  variant="link"
                  className="text-green-600 hover:text-green-700 flex items-center"
                >
                  View All Farmers
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {farmers
                .filter((farmer) => farmer.featured)
                .map((farmer, index) => (
                  <motion.div
                    key={farmer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
                      <div className="relative h-48">
                        <Image
                          src={farmer.image}
                          alt={farmer.name}
                          fill
                          className="object-cover"
                        />
                        {farmer.sameDay && (
                          <Badge className="absolute top-2 right-2 bg-green-600">
                            Same-Day Delivery
                          </Badge>
                        )}
                        {farmer.organic && (
                          <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 border-green-300">
                            Organic
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              {farmer.name}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{farmer.location}</span>
                              <span className="mx-2">•</span>
                              <span>{farmer.distance} miles away</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-500 mr-1" />
                            <span className="text-sm font-medium">
                              {farmer.rating}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {farmer.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="outline"
                              className="bg-gray-100"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                          {farmer.description}
                        </p>
                        <div className="mt-4">
                          <Link href={`/farmers/${farmer.id}`}>
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                              View Farm
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* All Farmers */}
        <section id="all-farmers" className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              All Farmers
            </h2>

            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="w-full lg:w-64">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Search</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search farmers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Specialties</h3>
                    <Tabs
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                      className="w-full"
                      orientation="vertical"
                    >
                      <TabsList className="flex flex-col h-auto bg-gray-100 p-0">
                        <TabsTrigger
                          value="all"
                          className="justify-start px-3 py-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                        >
                          All Specialties
                        </TabsTrigger>
                        {specialties.map((specialty) => (
                          <TabsTrigger
                            key={specialty}
                            value={specialty.toLowerCase()}
                            className="justify-start px-3 py-2 capitalize data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                          >
                            {specialty}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFarmers.map((farmer, index) => (
                    <motion.div
                      key={farmer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
                        <div className="relative h-48">
                          <Image
                            src={farmer.image}
                            alt={farmer.name}
                            fill
                            className="object-cover"
                          />
                          {farmer.sameDay && (
                            <Badge className="absolute top-2 right-2 bg-green-600">
                              Same-Day Delivery
                            </Badge>
                          )}
                          {farmer.organic && (
                            <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 border-green-300">
                              Organic
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">
                                {farmer.name}
                              </h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{farmer.location}</span>
                                <span className="mx-2">•</span>
                                <span>{farmer.distance} miles away</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-amber-500 mr-1" />
                              <span className="text-sm font-medium">
                                {farmer.rating}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {farmer.specialties.map((specialty) => (
                              <Badge
                                key={specialty}
                                variant="outline"
                                className="bg-gray-100"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                            {farmer.description}
                          </p>
                          <div className="mt-4">
                            <Link href={`/farmers/${farmer.id}`}>
                              <Button className="w-full bg-green-600 hover:bg-green-700">
                                View Farm
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
