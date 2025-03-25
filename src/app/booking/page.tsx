"use client";

import { useEffect, useState } from "react";
import LocationDateReserve from "@/components/DateReserve";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Booking() {
  const urlParams = useSearchParams();
  const router = useRouter();
  const { user } = useUser();
  const cid = urlParams.get("cid");

  const [company, setCompany] = useState<any>(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    tel: "",
    email: "",
    bookingDate: "",
  });

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/companies/${cid}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setCompany(data.data);
        }
      } catch (err) {
        console.error("Error fetching company:", err);
      }
    };

    if (cid) fetchCompany();
  }, [cid]);

  const handleFormDataChange = (data: any) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const makeBooking = async () => {
    if (!user) return alert("Please login first");
    const { name, tel, email, bookingDate } = bookingData;
    if (!name || !tel || !email || !bookingDate) {
      return alert("Please fill in all required fields");
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/v1/companies/${cid}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...bookingData }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/mybooking");
      } else {
        alert(data.message || "Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("An error occurred");
    }
  };

  if (!company) {
    return <div className="min-h-screen bg-[#FFF3E2] flex items-center justify-center">Loading company...</div>;
  }

  return (
    <main className="min-h-screen bg-[#3B1F0B] py-10 px-4 text-black">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Booking Interview
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Company Info */}
          <div className="flex-1 bg-gray-100 p-6 rounded">
            <h3 className="text-lg font-bold mb-2">{company.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{company.description}</p>
            <Field label="Location" value={company.location} />
            <Field label="Address" value={company.address} />
            <Field label="Tel" value={company.tel} />
            <Field label="Email" value={company.email} />
          </div>

          {/* User Form */}
          <div className="flex-1 space-y-4">
            <InputField label="Name" value={bookingData.name} onChange={(val) => setBookingData({ ...bookingData, name: val })} />
            <InputField label="Tel" value={bookingData.tel} onChange={(val) => setBookingData({ ...bookingData, tel: val })} />
            <InputField label="Email" value={bookingData.email} onChange={(val) => setBookingData({ ...bookingData, email: val })} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Interview</label>
              <LocationDateReserve onChange={handleFormDataChange} />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={makeBooking}
            className="bg-[#3B1F0B] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#5a2f14]"
          >
            Continue
          </button>
          <div className="mt-2 text-xs text-gray-500">
            Create booking at {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input type="text" value={value} readOnly className="w-full px-3 py-2 border rounded bg-gray-200 text-sm" />
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        className="w-full border rounded px-4 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
