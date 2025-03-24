"use client";
import { useState } from "react";
import LocationDateReserve from "@/components/DateReserve";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {
  const urlParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const bookings = useSelector((state: RootState) => state.bookSlice.bookItems);

  const vid = urlParams.get("vid");

  const companies = [
    {
      id: "1",
      name: "SCB Company",
      description: "Leading Thai commercial bank",
      location: "https://maps.app.goo.gl/Loremipsumdolor",
      address: "123 SCB Road, Chatuchak, Bangkok",
      tel: "088-888-8888",
      email: "scb@gmail.com",
    },
    {
      id: "2",
      name: "KBank",
      description: "Digital banking leader",
      location: "https://maps.app.goo.gl/Somewhere",
      address: "Kasikorn Building, Bang Kapi, Bangkok",
      tel: "089-999-9999",
      email: "kbank@gmail.com",
    },
    {
      id: "3",
      name: "PTT",
      description: "Energy company of Thailand",
      location: "https://maps.app.goo.gl/PTTmap",
      address: "Energy Complex, Vibhavadi Rangsit",
      tel: "087-777-7777",
      email: "ptt@gmail.com",
    },
  ];

  const selectedCompany = companies.find((c) => c.id === vid) || companies[0];

  const [bookingData, setBookingData] = useState({
    name: "",
    tel: "",
    email: "",
    companyName: selectedCompany.name,
    companyId: selectedCompany.id,
    bookDate: "",
    userId: "mock-user-id",
  });

  const handleFormDataChange = (data: Partial<BookingItem>) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const makeBooking = () => {
    if (bookings.length >= 3) {
      alert("You have reached the maximum of 3 bookings.");
      return;
    }

    const { name, tel, email, companyName, bookDate, companyId, userId } = bookingData;

    if (name && tel && email && companyName && bookDate) {
      const newBooking: BookingItem = {
        name,
        tel,
        email,
        bookDate,
        companyName,
        companyId,
        userId,
      };

      dispatch(addBooking(newBooking));
      router.push("/mybooking");
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <main className="min-h-screen bg-[#3B1F0B] py-10 px-4 text-black">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Booking Interview
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Company Info */}
          <div className="flex-1 bg-gray-100 p-6 rounded">
            <h3 className="text-lg font-bold mb-2">{selectedCompany.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedCompany.description}
            </p>
            <Field label="Location" value={selectedCompany.location} />
            <Field label="Address" value={selectedCompany.address} />
            <Field label="Tel" value={selectedCompany.tel} />
            <Field label="Email" value={selectedCompany.email} />
            <button className="bg-gray-300 text-gray-700 font-semibold rounded px-4 py-2 mt-4 cursor-pointer">
              More Detail
            </button>
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
