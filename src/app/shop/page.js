"use client";

import { Suspense } from "react";
import ShopContent from "./ShopContent"; // Move the main content to a separate component

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
