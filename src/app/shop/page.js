"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ShoppingBag,
  Search,
  Filter,
  Grid3X3,
  List,
  AlertTriangle,
} from "lucide-react";

export default function Shop() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam || "all"
  );
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sameDayOnly, setSameDayOnly] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Mock data for products
    const mockProducts = [
      {
        id: 1,
        name: "Organic Tomatoes",
        price: 30,
        unit: "kg",
        image: "https://api.switchx.dev/api/mocks/images?query=tomatoes",
        farmer: "Green Valley Farm",
        rating: 4.8,
        sameDay: true,
        organic: true,
        category: "vegetables",
        description:
          "Fresh, juicy organic tomatoes harvested daily from our greenhouse.",
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
        organic: true,
        category: "fruits",
        description:
          "Sweet and juicy strawberries, perfect for desserts or snacking.",
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
        organic: true,
        category: "vegetables",
        description:
          "Nutrient-rich organic spinach, freshly harvested from our fields.",
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
        organic: true,
        category: "dairy",
        description:
          "Free-range eggs from pasture-raised hens, collected daily.",
      },
      {
        id: 5,
        name: "Grass-Fed Ground Beef",
        price: 250,
        unit: "kg",
        image: "https://api.switchx.dev/api/mocks/images?query=beef",
        farmer: "Green Pastures Ranch",
        rating: 4.8,
        sameDay: false,
        organic: true,
        category: "meat",
        description: "Lean ground beef from grass-fed, pasture-raised cattle.",
      },
      {
        id: 6,
        name: "Honey",
        price: 600,
        unit: "kg",
        image: "https://api.switchx.dev/api/mocks/images?query=honey",
        farmer: "Busy Bee Apiary",
        rating: 5.0,
        sameDay: true,
        organic: true,
        category: "other",
        description: "Raw, unfiltered honey from our local beehives.",
      },
      {
        id: 7,
        name: "Artisan Cheese",
        price: 300,
        unit: "250g",
        image: "https://api.switchx.dev/api/mocks/images?query=cheese",
        farmer: "Dairy Dell Farm",
        rating: 4.7,
        sameDay: true,
        organic: false,
        category: "dairy",
        description:
          "Handcrafted artisan cheese made with milk from our own cows.",
      },
      {
        id: 8,
        name: "Fresh Carrots",
        price: 70,
        unit: "kg",
        image: "https://api.switchx.dev/api/mocks/images?query=carrots",
        farmer: "Root & Stem Farm",
        rating: 4.6,
        sameDay: true,
        organic: true,
        category: "vegetables",
        description: "Sweet, crunchy carrots pulled fresh from the ground.",
      },
      {
        id: 9,
        name: "Apples",
        price: 80,
        unit: "kg",
        image: "https://api.switchx.dev/api/mocks/images?query=apples",
        farmer: "Orchard Hills",
        rating: 4.8,
        sameDay: false,
        organic: false,
        category: "fruits",
        description: "Crisp, juicy apples picked at peak ripeness.",
      },
      {
        id: 10,
        name: "Fresh Basil",
        price: 20,
        unit: "100g",
        image: "https://api.switchx.dev/api/mocks/images?query=basil",
        farmer: "Herb Haven",
        rating: 4.9,
        sameDay: true,
        organic: true,
        category: "herbs",
        description:
          "Aromatic basil leaves, perfect for pasta dishes and salads.",
      },
      {
        id: 11,
        name: "Chicken",
        price: 120,
        unit: "kg",
        image: "https://api.switchx.dev/api/mocks/images?query=chicken",
        farmer: "Freedom Range Farms",
        rating: 4.7,
        sameDay: false,
        organic: true,
        category: "meat",
        description:
          "Pasture-raised whole chicken, never given antibiotics or hormones.",
      },
      {
        id: 12,
        name: "Fresh Beets",
        price: 25,
        unit: "kg",
        image: "https://api.switchx.dev/api/mocks/images?query=beets",
        farmer: "Root & Stem Farm",
        rating: 4.5,
        sameDay: true,
        organic: true,
        category: "vegetables",
        description: "Vibrant, earthy beets with greens attached.",
      },
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);

    // Extract unique categories
    const uniqueCategories = [...new Set(mockProducts.map((p) => p.category))];
    setCategories(uniqueCategories);

    // Apply initial category filter if provided in URL
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.farmer.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by same-day delivery
    if (sameDayOnly) {
      result = result.filter((product) => product.sameDay);
    }

    // Filter by organic
    if (organicOnly) {
      result = result.filter((product) => product.organic);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'recommended' - no specific sorting
        break;
    }

    setFilteredProducts(result);
  }, [
    products,
    searchQuery,
    selectedCategory,
    priceRange,
    sameDayOnly,
    organicOnly,
    sortBy,
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Shop Fresh Produce
            </h1>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={viewMode === "grid" ? "bg-gray-200" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={viewMode === "list" ? "bg-gray-200" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="md:hidden flex items-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Desktop */}
            <div
              className={`w-full md:w-64 md:block ${
                isFilterOpen ? "block" : "hidden"
              }`}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Categories</h3>
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
                        All Products
                      </TabsTrigger>
                      {categories.map((category) => (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className="justify-start px-3 py-2 capitalize data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
                        >
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 50]}
                      value={priceRange}
                      min={0}
                      max={50}
                      step={1}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="same-day"
                      checked={sameDayOnly}
                      onCheckedChange={setSameDayOnly}
                    />
                    <label
                      htmlFor="same-day"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Same-day delivery only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="organic"
                      checked={organicOnly}
                      onCheckedChange={setOrganicOnly}
                    />
                    <label
                      htmlFor="organic"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Organic products only
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-green-600 hover:bg-green-700"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm">
                  <div className="p-3 bg-amber-100 rounded-full mb-4">
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 text-center max-w-md">
                    We couldn't find any products matching your current filters.
                    Try adjusting your search criteria or browse all products.
                  </p>
                  <Button
                    className="mt-6 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setPriceRange([0, 50]);
                      setSameDayOnly(false);
                      setOrganicOnly(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
                        <div className="relative h-48">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                          {product.sameDay ? (
                            <Badge className="absolute top-2 right-2 bg-green-600">
                              Same-Day Delivery
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="absolute top-2 right-2 bg-amber-100 text-amber-800 border-amber-300"
                            >
                              2-Day Delivery
                            </Badge>
                          )}
                          {product.organic && (
                            <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 border-green-300">
                              Organic
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
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {product.description}
                          </p>
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
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden transition-shadow hover:shadow-md">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative w-full md:w-48 h-48">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="flex-1 p-4">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="font-semibold text-lg text-gray-900">
                                    {product.name}
                                  </h3>
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-amber-500 mr-1" />
                                    <span className="text-sm font-medium">
                                      {product.rating}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">
                                  by {product.farmer}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {product.sameDay ? (
                                    <Badge className="bg-green-600">
                                      Same-Day Delivery
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="bg-amber-100 text-amber-800 border-amber-300"
                                    >
                                      2-Day Delivery
                                    </Badge>
                                  )}
                                  {product.organic && (
                                    <Badge className="bg-green-100 text-green-800 border-green-300">
                                      Organic
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-4 md:max-w-md">
                                  {product.description}
                                </p>
                              </div>
                              <div className="flex flex-row md:flex-col items-center md:items-end justify-between mt-4 md:mt-0">
                                <p className="font-semibold text-lg">
                                  ₹{product.price.toFixed(2)}
                                  <span className="text-sm text-gray-500 ml-1">
                                    /{product.unit}
                                  </span>
                                </p>
                                <Button className="bg-green-600 hover:bg-green-700 mt-0 md:mt-4">
                                  <ShoppingBag className="w-4 h-4 mr-1" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
