import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FarmGate Commerce",
  description:
    "Connect directly with local farmers for fresh produce with same-day delivery options.",
  openGraph: {
    title: "FarmGate Commerce",
    description:
      "Connect directly with local farmers for fresh produce with same-day delivery options.",
    images: [
      {
        url: "https://switchx.dev/landing.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FarmGate Commerce",
    description:
      "Connect directly with local farmers for fresh produce with same-day delivery options.",
    images: ["https://switchx.dev/landing.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
