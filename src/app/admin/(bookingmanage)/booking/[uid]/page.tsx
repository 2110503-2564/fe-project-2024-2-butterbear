"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useUser } from "@/context/UserContext";

interface Booking {
  _id: string;
  bookingDate: string;
  company: {
    name: string;
    location: string;
  };
}

export default function UserBookingPage() {
  const { uid } = useParams();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editedDates, setEditedDates] = useState<{ [id: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  
  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://2110503-backend-project-sable.vercel.app//api/v1/bookings", {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        console.log("📦 All bookings:", data.data);
        if (res.ok && data.success) {
            const filtered = data.data.filter((b: any) => {
                const bookingUserId = typeof b.user === "string" ? b.user : b.user?._id;
                return bookingUserId === uid;
            });              
          setBookings(filtered);
          const initialEdited: { [id: string]: string } = {};
          filtered.forEach((b: Booking) => {
            initialEdited[b._id] = dayjs(b.bookingDate).format("YYYY-MM-DDTHH:mm");
          });
          setEditedDates(initialEdited);
        } else {
          setError("Failed to fetch bookings");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [uid]);

  const handleDateChange = (id: string, value: string) => {
    setEditedDates((prev) => ({ ...prev, [id]: value }));
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this booking?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`https://2110503-backend-project-sable.vercel.app//api/v1/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } else {
      alert("Failed to delete booking");
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    for (const id of Object.keys(editedDates)) {
      const newDate = editedDates[id];
      await fetch(`https://2110503-backend-project-sable.vercel.app//api/v1/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingDate: newDate }),
      });
    }

    alert("Booking dates updated");
    router.refresh();
  };

  if (loading) return <p className="text-center py-6">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;

  return (
    <main className="min-h-screen bg-[#f9f9f9] py-10 px-4 text-black">
      <div className="bg-white max-w-4xl mx-auto rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Bookings for User ID: {uid}
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">
            No bookings found for this user.
          </p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="border p-4 rounded bg-gray-50">
                <h3 className="font-bold">{booking.company.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Location: <a href={booking.company.location} className="text-blue-600 underline">{booking.company.location}</a>
                </p>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <input
                    type="datetime-local"
                    value={editedDates[booking._id]}
                    min="2022-05-10T00:00"
                    max="2022-05-13T23:59"
                    onChange={(e) => handleDateChange(booking._id, e.target.value)}
                    className="border px-3 py-2 rounded text-sm bg-white text-black"
                  />
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <div className="text-center mt-6">
              <button
                onClick={handleSave}
                className="bg-[#3B1F0B] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#5a2f14]"
              >
                Save All Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
