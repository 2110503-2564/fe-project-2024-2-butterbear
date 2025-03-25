"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";

export default function BookingPage() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid") ?? "";

  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!cid) return;
      console.log("Fetching company with id:", cid);
      const res = await fetch(`http://localhost:5000/api/v1/companies/${cid}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setCompany(data.data);
      } else {
        console.error("Failed to fetch company:", data.message);
      }
    };

    fetchCompany();
  }, [cid]);

  console.log("Submitting booking with company id:", company?._id);

  const handleSubmit = async () => {
    if (!user || !company || !date || !time) return alert("Missing fields");
  
    const fullDate = date
      .hour(time.hour())
      .minute(time.minute())
      .second(0)
      .millisecond(0);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      setSubmitting(true);
  
      const res = await fetch(`http://localhost:5000/api/v1/companies/${company._id}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingDate: fullDate.toISOString(),
        }),
      });
  
      if (res.ok) {
        alert("Booking successful!");
        router.push("/booking");
      } else {
        const error = await res.json();
        alert("Booking failed: " + error.message);
      }      
  
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
    

  if (!company || !user) return <p className="text-center py-6">Loading...</p>;

  return (
    
    <main className="min-h-screen bg-[#3B1F0B] py-10 px-4 text-black">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Booking Interview
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Company Info */}
          <div className="flex-1 bg-gray-100 p-6 rounded text-sm space-y-3">
            <h3 className="text-lg font-bold mb-1">{company.name}</h3>
            <p className="text-gray-600 mb-2">{company.description}</p>
            <Field label="Location" value={company.location} />
            <Field label="Address" value={company.address} />
            <Field label="Tel" value={company.tel} />
            <Field label="Email" value={company.website} />
            <Link href={`/company/${company._id}`}>
              <button className="bg-gray-300 text-gray-700 font-semibold rounded px-4 py-2 mt-2 hover:bg-gray-400">
                More Detail
              </button>
            </Link>
          </div>

          {/* User Form */}
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-bold mb-2">My Profile</h3>
            <ReadOnly label="Name" value={user.name} />
            <ReadOnly label="Tel" value={user.tel} />
            <ReadOnly label="Email" value={user.email} />

            <h3 className="text-lg font-bold mt-6 mb-2">Date Interview</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  minDate={dayjs("2022-05-10")}
                  maxDate={dayjs("2022-05-13")}
                  slotProps={{
                    textField: {
                      className: "w-full bg-white rounded border px-3 py-2 text-sm",
                      size: "small",
                    },
                  }}
                />

                <TimePicker
                  label="Time"
                  ampm={false}
                  // minutesStep={30}
                  value={time}
                  onChange={(newTime) => setTime(newTime)}
                  // minTime={dayjs("2022-05-10T09:00")}
                  // maxTime={dayjs("2022-05-13T18:00")}
                  slotProps={{
                    textField: {
                      className: "w-full bg-white rounded border px-3 py-2 text-sm",
                      size: "small",
                    },
                  }}
                />
              </div>
            </LocalizationProvider>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            disabled={submitting || !date || !time}
            className={`${
              submitting || !date || !time
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#3B1F0B] hover:bg-[#5a2f14]"
            } text-white px-6 py-2 rounded-md font-semibold`}
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
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full px-3 py-2 border rounded bg-white text-sm"
      />
    </div>
  );
}

function ReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-100"
      />
    </div>
  );
}
