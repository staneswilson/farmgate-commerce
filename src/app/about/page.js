"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Vysakh Praveen",
    title: "CEO",
    // You can add image URLs if available, otherwise AvatarFallback will be used
    // imageUrl: "https://example.com/vysakh.jpg",
    bio: "Visionary leader driving the mission of FarmDirect.",
    initials: "VP",
  },
  {
    name: "Stanes Wilson",
    title: "CTO",
    // imageUrl: "https://example.com/stanes.jpg",
    bio: "Technology expert building the platform that connects farms and consumers.",
    initials: "SW",
  },
  {
    name: "Vaishnava O.J",
    title: "CFO",
    // imageUrl: "https://example.com/vaishnava.jpg",
    bio: "Financial strategist ensuring sustainable growth and fair economics.",
    initials: "VO",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              About <span className="text-green-600">Farm</span>
              <span className="text-amber-500">Direct</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              We're passionate about bridging the gap between local farmers and
              consumers, delivering fresh, high-quality produce directly to your
              doorstep while ensuring fair prices for those who grow our food.
            </p>
          </motion.section>

          {/* Mission/Vision Section (Optional) */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16 bg-white p-8 rounded-lg shadow-sm"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
              To empower local farmers by providing a direct market connection,
              and to provide consumers with the freshest, most nutritious
              produce available, fostering a sustainable and transparent food
              system.
            </p>
          </motion.section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full transition-shadow hover:shadow-lg">
                    <CardHeader className="items-center">
                      <Avatar className="w-24 h-24 mb-4 border-2 border-green-200">
                        {member.imageUrl ? (
                          <AvatarImage
                            src={member.imageUrl}
                            alt={member.name}
                          />
                        ) : (
                          <AvatarFallback className="text-3xl bg-green-100 text-green-800">
                            {member.initials ||
                              member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <CardDescription className="text-green-600 font-medium">
                        {member.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Add other sections as needed (e.g., Company Values, History) */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
