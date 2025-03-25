"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingList from "@/components/BookingList";

export default function MyBooking() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return null;

  return (
    <main>
      <BookingList />
    </main>
  );
}
