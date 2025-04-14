"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-600">
              FarmGate<span className="text-amber-500">Commerce</span>
            </h3>
            <p className="text-sm text-gray-600">
              Connecting farmers directly with consumers for fresher produce and
              fairer prices.
            </p>
            <div className="flex space-x-4">
              <a
                href=" #"
                className="text-gray-500 transition-colors hover:text-green-600"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-green-600"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-green-600"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-gray-600 hover:text-green-600"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=vegetables"
                  className="text-gray-600 hover:text-green-600"
                >
                  Vegetables
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=fruits"
                  className="text-gray-600 hover:text-green-600"
                >
                  Fruits
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=dairy"
                  className="text-gray-600 hover:text-green-600"
                >
                  Dairy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-green-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/farmers"
                  className="text-gray-600 hover:text-green-600"
                >
                  Our Farmers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-green-600"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-green-600"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-green-600"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-green-600"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-green-600"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-green-600"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} FarmGate Commerce. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
