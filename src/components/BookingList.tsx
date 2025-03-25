"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function BookingList() {
  const { user } = useUser();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editedDate, setEditedDate] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("https://two110503-backend-project-butterbear.onrender.com/api/v1/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setBookings(data.data);
        } else {
          console.error("Error fetching bookings", data.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBookings();
  }, [user]);

  const isValidBookingDate = (datetime: string) => {
    if (!datetime) return false;
    const d = new Date(datetime);
    const start = new Date("2022-05-10T00:00:00");
    const end = new Date("2022-05-13T23:59:59");
    return d >= start && d <= end;
  };

  const handleDelete = async (bookingId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`https://two110503-backend-project-butterbear.onrender.com/api/v1/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      } else {
        const data = await res.json();
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting the booking.");
    }
  };

  const handleEdit = (bookingId: string, currentDate?: string) => {
    setEditId(bookingId);

    const localDatetime = currentDate
      ? new Date(currentDate).toISOString().slice(0, 16)
      : "2022-05-10T09:00";

    setEditedDate(localDatetime);
  };

  const handleSave = async (bookingId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`https://two110503-backend-project-butterbear.onrender.com/api/v1/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingDate: editedDate }),
      });

      if (res.ok) {
        const updated = await res.json();
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? updated.data : b))
        );
        setEditId(null);
      } else {
        const data = await res.json();
        alert(`Update failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred while updating the booking.");
    }
  };

  if (loading) return <p className="text-center py-6">Loading bookings...</p>;
  if (!bookings.length) return <p className="text-center text-black py-6">No interview bookings</p>;
  
  return (
    <main className="min-h-screen bg-[#3B1F0B] py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">My Booking</h2>

        <div className="space-y-4">
          {bookings.map((booking) => {
            console.log("booking.bookDate =", booking.bookingDate);
            return(
            <div key={booking._id} className="bg-gray-100 text-black p-5 rounded flex justify-between items-center">
              <div>
                <h3 className="font-bold mb-1">{booking.company?.name ?? "Unknown Company"}</h3>
                <div className="text-sm mb-1">
                  <span className="font-medium">Date Interview:</span>{" "}
                  {editId === booking._id ? (
                    <>
                      <input
                        type="datetime-local"
                        value={editedDate}
                        min="2022-05-10T00:00"
                        max="2022-05-13T23:59"
                        onChange={(e) => setEditedDate(e.target.value)}
                        className="ml-2 p-1 border rounded text-sm"
                      />
                      {!isValidBookingDate(editedDate) && (
                        <p className="text-xs text-red-600 mt-1">
                          Date must be between May 10–13, 2022.
                        </p>
                      )}
                    </>
                  ) : (
                    new Date(booking.bookingDate).toLocaleString()
                  )}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Location:</span>{" "}
                  {booking.company?.website ? (
                    <a
                      href={booking.company.website}
                      className="text-blue-600 underline"
                      target="_blank"
                    >
                      {booking.company.website}
                    </a>
                  ) : (
                    "Not available"
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {editId === booking._id ? (
                  <button
                    onClick={() => handleSave(booking._id)}
                    disabled={!isValidBookingDate(editedDate)}
                    className={`px-4 py-1 rounded text-sm text-white ${
                      isValidBookingDate(editedDate)
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(booking._id, booking.bookingDate)}
                    className="bg-gray-300 px-4 py-1 rounded text-sm text-gray-700"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          )})}
        </div>

        <div className="text-center mt-8">
          <a href="/company">
            <button className="bg-[#3B1F0B] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#5a2f14]">
              Add Booking
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
