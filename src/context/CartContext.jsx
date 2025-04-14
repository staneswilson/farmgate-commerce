"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Client, Databases, ID } from "appwrite";
import { useToast } from "@/hooks/use-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  // Load cart from local storage or database
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (user) {
          // Try to load cart from database
          try {
            const response = await databases.listDocuments(
              process.env.NEXT_PUBLIC_DATABASE_ID,
              "cart",
              [
                // Filter by user ID
                user.$id && {
                  field: "userId",
                  operator: "equal",
                  value: user.$id,
                },
              ].filter(Boolean)
            );

            if (response.documents.length > 0) {
              const cartDoc = response.documents[0];
              setCartItems(JSON.parse(cartDoc.items || "[]"));
            } else {
              // No cart found for user, create empty cart
              setCartItems([]);
            }
          } catch (error) {
            console.error("Error loading cart from database:", error);
            // Fallback to local storage
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
              setCartItems(JSON.parse(storedCart));
            }
          }
        } else {
          // User not logged in, use local storage
          const storedCart = localStorage.getItem("cart");
          if (storedCart) {
            setCartItems(JSON.parse(storedCart));
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to local storage and database if user is logged in
  useEffect(() => {
    if (!loading) {
      // Always save to local storage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // If user is logged in, save to database
      if (user) {
        const saveCartToDatabase = async () => {
          try {
            // Check if user already has a cart
            const response = await databases.listDocuments(
              process.env.NEXT_PUBLIC_DATABASE_ID,
              "cart",
              [{ field: "userId", operator: "equal", value: user.$id }]
            );

            const totalAmount = cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            if (response.documents.length > 0) {
              // Update existing cart
              const cartDoc = response.documents[0];
              await databases.updateDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID,
                "cart",
                cartDoc.$id,
                {
                  items: JSON.stringify(cartItems),
                  totalAmount,
                  updatedAt: new Date().toISOString(),
                }
              );
            } else {
              // Create new cart
              await databases.createDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID,
                "cart",
                ID.unique(),
                {
                  userId: user.$id,
                  items: JSON.stringify(cartItems),
                  totalAmount,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }
              );
            }
          } catch (error) {
            console.error("Error saving cart to database:", error);
          }
        };

        saveCartToDatabase();
      }
    }
  }, [cartItems, user, loading]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if product already in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };

        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated in your cart.`,
        });

        return updatedItems;
      } else {
        // Add new item to cart
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart.`,
        });

        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} removed from your cart.`,
        });
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
