// app/admin/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"; // ✅ ใช้ useUser แทน useSession
import Link from "next/link";

export default function AdminHome() {
  const { user } = useUser();
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const now = new Date();
    setTimestamp(
      now.toLocaleString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, []);

  const name = user?.name || "Admin";

  return (
    <div className="min-h-screen bg-[#3B1F0B] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Management</h1>
        <p className="text-md text-gray-600 mb-6">
          Hello, <span className="font-semibold">{name}</span>
          <br />
          <span className="text-sm text-gray-500">Logged in at {timestamp}</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SessionCard title="Company" href="/admin/company" />
          <SessionCard title="Booking" href="/admin/bookings" />
        </div>
      </div>
    </div>
  );
}

function SessionCard({ title, href }: { title: string; href: string }) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-gray-800">{title} Session</h3>
      <Link href={href}>
        <button className="mt-4 bg-[#3B1F0B] text-white px-6 py-2 rounded-md font-medium hover:bg-[#5a2f14]">
          Manage
        </button>
      </Link>
    </div>
  );
}
