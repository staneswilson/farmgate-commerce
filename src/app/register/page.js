// src/app/register/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Client, Account, ID } from "appwrite"; // <-- Import Appwrite classes

// --- Add Appwrite Client and Account Initialization ---
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client); // <-- Initialize account object
// --- End of Added Initialization ---

export default function Register() {
  const router = useRouter();
  // registerEmailPassword now comes from useAuth, we use the 'account' object directly here
  const {
    registerEmailPassword,
    loginEmailPassword,
    user,
    loading: userLoading,
  } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("customer");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (!userLoading && user) {
    router.push("/dashboard");
    return null;
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Use the imported 'account' object directly for creation
      await account.create(ID.unique(), email, password, name);

      // Log in the user after successful creation
      await loginEmailPassword(email, password); // Use the function from AuthContext for session

      // Get the newly created user account to update prefs
      // account.get() should work now because the user is logged in via loginEmailPassword
      const loggedInUser = await account.get();
      if (loggedInUser) {
        // Use the imported 'account' object to update prefs
        await account.updatePrefs({
          ...loggedInUser.prefs, // Keep existing prefs if any
          accountType: accountType, // Save the selected type
        });
        console.log("User account type preference saved:", accountType);
      } else {
        console.warn("Could not get logged in user immediately after login.");
        // Might need a slight delay or re-fetch logic if session isn't ready instantly
      }

      toast({
        title: "Registration successful",
        description: "Welcome to FarmGate Commerce!",
        variant: "success", // Make sure you have a 'success' variant defined for your toast
      });

      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 bg-gray-50">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-green-100 shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center text-gray-900">
                    Create an Account
                  </CardTitle>
                  <CardDescription className="text-center text-gray-600">
                    Join FarmGate Commerce today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    defaultValue="customer"
                    onValueChange={setAccountType} // This correctly updates the local state
                    className="mb-6"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="customer">Customer</TabsTrigger>
                      <TabsTrigger value="farmer">Farmer</TabsTrigger>
                    </TabsList>
                    {/* TabsContent remains the same */}
                    <TabsContent value="customer">
                      <p className="text-sm text-gray-600 mt-2">
                        Sign up as a customer to buy fresh produce directly from
                        local farmers.
                      </p>
                    </TabsContent>
                    <TabsContent value="farmer">
                      <p className="text-sm text-gray-600 mt-2">
                        Sign up as a farmer to sell your products directly to
                        consumers.
                      </p>
                    </TabsContent>
                  </Tabs>

                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Form inputs remain the same */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </CardContent>
                {/* CardFooter remains the same */}
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-green-600 hover:text-green-700"
                    >
                      Sign in
                    </Link>
                  </div>
                  <p className="text-xs text-center text-gray-500">
                    By creating an account, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="underline hover:text-green-600"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-green-600"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
