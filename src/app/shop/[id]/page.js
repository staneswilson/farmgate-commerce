"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Star,
  Truck,
  ShieldCheck,
  AlertTriangle,
  Minus,
  Plus,
  ShoppingBag,
  Heart,
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Mock data for product details
    const mockProducts = [
      {
        id: "1",
        name: "Organic Tomatoes",
        price: 80,
        unit: "kg",
        image: "https://api.switchx.dev/api/mocks/images?query=tomatoes",
        farmer: {
          name: "Green Valley Farm",
          id: "1",
          location: "Nashik, Maharashtra",
          image: "https://api.switchx.dev/api/mocks/images?query=farm",
        },
        rating: 4.8,
        reviewCount: 124,
        sameDay: true,
        organic: true,
        category: "vegetables",
        description:
          "Fresh, juicy organic tomatoes harvested daily from our greenhouse. These tomatoes are grown without synthetic pesticides or fertilizers, ensuring you get the purest flavor and highest nutritional value.",
        stock: 50,
        nutritionInfo:
          "Rich in vitamins A, C, and K, as well as potassium and antioxidants like lycopene.",
        storageInfo:
          "Store at room temperature away from direct sunlight. Refrigerate after ripening to extend shelf life.",
        images: [
          "https://api.switchx.dev/api/mocks/images?query=tomatoes",
          "https://api.switchx.dev/api/mocks/images?query=tomato+plant",
          "https://api.switchx.dev/api/mocks/images?query=tomato+harvest",
        ],
      },
      {
        id: "2",
        name: "Fresh Strawberries",
        price: 120,
        unit: "box",
        image: "https://api.switchx.dev/api/mocks/images?query=strawberries",
        farmer: {
          name: "Berry Fields",
          id: "2",
          location: "Mahabaleshwar, Maharashtra",
          image: "https://api.switchx.dev/api/mocks/images?query=berry+farm",
        },
        rating: 4.9,
        reviewCount: 89,
        sameDay: true,
        organic: true,
        category: "fruits",
        description:
          "Sweet and juicy strawberries, perfect for desserts or snacking. Handpicked at peak ripeness to ensure maximum flavor and freshness.",
        stock: 30,
        nutritionInfo:
          "Excellent source of vitamin C, manganese, folate, and potassium.",
        storageInfo:
          "Refrigerate immediately. Do not wash until ready to eat. Best consumed within 2-3 days of purchase.",
        images: [
          "https://api.switchx.dev/api/mocks/images?query=strawberries",
          "https://api.switchx.dev/api/mocks/images?query=strawberry+field",
          "https://api.switchx.dev/api/mocks/images?query=strawberry+plant",
        ],
      },
      {
        id: "3",
        name: "Organic Spinach",
        price: 60,
        unit: "bunch",
        image: "https://api.switchx.dev/api/mocks/images?query=spinach",
        farmer: {
          name: "Riverside Organics",
          id: "3",
          location: "Pune, Maharashtra",
          image: "https://api.switchx.dev/api/mocks/images?query=organic+farm",
        },
        rating: 4.7,
        reviewCount: 56,
        sameDay: false,
        organic: true,
        category: "vegetables",
        description:
          "Nutrient-rich organic spinach, freshly harvested from our fields. Our spinach is grown using sustainable farming practices that protect the environment and ensure the highest quality greens.",
        stock: 25,
        nutritionInfo: "High in iron, calcium, vitamins A, C, K, and folate.",
        storageInfo:
          "Store in the refrigerator in a plastic bag with a paper towel to absorb moisture. Best used within 3-5 days.",
        images: [
          "https://api.switchx.dev/api/mocks/images?query=spinach",
          "https://api.switchx.dev/api/mocks/images?query=spinach+field",
          "https://api.switchx.dev/api/mocks/images?query=spinach+harvest",
        ],
      },
      {
        id: "4",
        name: "Farm Fresh Eggs",
        price: 120,
        unit: "dozen",
        image: "https://api.switchx.dev/api/mocks/images?query=eggs",
        farmer: {
          name: "Happy Hen Farm",
          id: "4",
          location: "Bengaluru, Karnataka",
          image: "https://api.switchx.dev/api/mocks/images?query=chicken+farm",
        },
        rating: 4.9,
        reviewCount: 112,
        sameDay: true,
        organic: true,
        category: "dairy",
        description:
          "Free-range eggs from pasture-raised hens, collected daily. Our hens are fed a natural diet and allowed to roam freely, resulting in eggs with rich, golden yolks and exceptional flavor.",
        stock: 40,
        nutritionInfo:
          "Excellent source of protein, vitamin D, B12, and choline.",
        storageInfo:
          "Refrigerate immediately. Can be stored for up to 3-4 weeks in the refrigerator.",
        images: [
          "https://api.switchx.dev/api/mocks/images?query=eggs",
          "https://api.switchx.dev/api/mocks/images?query=chicken+coop",
          "https://api.switchx.dev/api/mocks/images?query=free+range+chickens",
        ],
      },
    ];

    const foundProduct = mockProducts.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);

      // Get related products (same category)
      const related = mockProducts
        .filter((p) => p.category === foundProduct.category && p.id !== id)
        .slice(0, 3);
      setRelatedProducts(related);
    } else {
      // Product not found, redirect to shop
      router.push("/shop");
    }

    setLoading(false);
  }, [id, router]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(value, product?.stock || 10));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Product not found
            </h1>
            <p className="mt-2 text-gray-600">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/shop">
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                Back to Shop
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-green-600">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:text-green-600 capitalize"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
              {/* Product Images */}
              <div className="lg:col-span-1">
                <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.organic && (
                    <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 border-green-300">
                      Organic
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="relative h-20 rounded-md overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:col-span-2">
                <div className="flex flex-col h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {product.name}
                      </h1>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="mt-2 flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-amber-500 fill-amber-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/farmers/${product.farmer.id}`}
                        className="flex items-center text-sm text-gray-600 hover:text-green-600"
                      >
                        <span>by </span>
                        <span className="font-medium ml-1">
                          {product.farmer.name}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{product.farmer.location}</span>
                      </Link>
                    </div>

                    <div className="mt-6">
                      <p className="text-3xl font-bold text-gray-900">
                        {formatCurrency(product.price)}
                        <span className="text-sm font-normal text-gray-600 ml-1">
                          per {product.unit}
                        </span>
                      </p>
                    </div>

                    <div className="mt-4 flex items-center space-x-4">
                      {product.sameDay ? (
                        <div className="flex items-center text-green-600">
                          <Truck className="w-5 h-5 mr-1" />
                          <span className="text-sm font-medium">
                            Same-Day Delivery
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600">
                          <Truck className="w-5 h-5 mr-1" />
                          <span className="text-sm font-medium">
                            2-Day Delivery
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-gray-600">
                        <ShieldCheck className="w-5 h-5 mr-1" />
                        <span className="text-sm">Quality Guaranteed</span>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          Description
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                          {product.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          Stock
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {product.stock > 10
                            ? "In Stock"
                            : product.stock > 0
                            ? `Only ${product.stock} left in stock`
                            : "Out of Stock"}
                        </p>
                      </div>

                      {product.stock <= 5 && product.stock > 0 && (
                        <div className="flex items-center text-amber-600 bg-amber-50 p-2 rounded-md">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          <span className="text-xs">
                            Low stock, order soon!
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex items-center">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className="h-10 w-10 rounded-none rounded-l-md"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(parseInt(e.target.value) || 1)
                          }
                          min="1"
                          max={product.stock}
                          className="h-10 w-16 border-0 text-center"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= product.stock}
                          className="h-10 w-10 rounded-none rounded-r-md"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        className="ml-4 bg-green-600 hover:bg-green-700 flex-1"
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t border-gray-200 mt-8">
              <Tabs defaultValue="details" className="p-6">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                  <TabsTrigger value="storage">Storage</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="details"
                  className="text-sm text-gray-600 space-y-4"
                >
                  <p>{product.description}</p>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Farm Information
                    </h4>
                    <p className="mt-1">
                      This product is grown at {product.farmer.name} located in{" "}
                      {product.farmer.location}.
                      {product.organic &&
                        " All products from this farm are certified organic."}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent
                  value="nutrition"
                  className="text-sm text-gray-600"
                >
                  <p>{product.nutritionInfo}</p>
                </TabsContent>
                <TabsContent value="storage" className="text-sm text-gray-600">
                  <p>{product.storageInfo}</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="overflow-hidden h-full transition-shadow hover:shadow-md">
                      <div className="relative h-48">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover"
                        />
                        {relatedProduct.organic && (
                          <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 border-green-300">
                            Organic
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link href={`/shop/${relatedProduct.id}`}>
                              <h3 className="font-semibold text-lg text-gray-900 hover:text-green-600">
                                {relatedProduct.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500">
                              by {relatedProduct.farmer.name}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-500 mr-1" />
                            <span className="text-sm font-medium">
                              {relatedProduct.rating}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <p className="font-semibold text-lg">
                            {formatCurrency(relatedProduct.price)}
                            <span className="text-sm text-gray-500 ml-1">
                              /{relatedProduct.unit}
                            </span>
                          </p>
                          <Link href={`/shop/${relatedProduct.id}`}>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
