"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import BookingPageInner from "@/components/BookingPageInner";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-white">Loading...</div>}>
      <BookingPageInner />
    </Suspense>
  );
}
