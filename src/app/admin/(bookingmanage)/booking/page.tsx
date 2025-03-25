"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  _id: string;
  name: string;
  email: string;
  tel: string;
};

export default function AdminBookingUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/v1/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok && data.success) {
          // ดึง user ไม่ซ้ำจาก booking list
          const uniqueUsers: Record<string, User> = {};
          for (const booking of data.data) {
            const user = booking.user;
            if (user && !uniqueUsers[user._id]) {
              uniqueUsers[user._id] = user;
            }
          }

          setUsers(Object.values(uniqueUsers));
        } else {
          setError("Failed to load bookings");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Server error");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">All Users with Bookings</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Tel</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-300">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.tel}</td>
                <td className="px-4 py-2">
                  <Link href={`/admin/booking/${user._id}`}>
                    <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
                      View Bookings
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
