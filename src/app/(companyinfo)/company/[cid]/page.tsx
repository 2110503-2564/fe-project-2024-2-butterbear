"use client";

import { useParams } from "next/navigation";

export default function CompanyDetailPage() {
  const { id } = useParams();

  // You can replace this with real company data later
  const company = {
    name: "SCB Company",
    location: "https://maps.app.goo.gl/Loremipsumdolor",
    address: "Lorem ipsum dolor sit amet",
    district: "Lorem ipsum",
    province: "Lorem ipsum",
    postalCode: "99999",
    tel: "088-888-8888",
    region: "Lorem",
    salary: "30,000 THB",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
  };

  return (
    <div className="min-h-screen bg-[#3B1F0B] py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full px-8 py-10 mx-auto max-w-[95%] md:max-w-[90%]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {company.name}
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side: image + description */}
          <div className="flex-1">
            <div className="bg-gray-300 w-full h-48 rounded-md mb-4"></div>
            <p className="text-sm text-gray-600">{company.description}</p>
          </div>

          {/* Right side: read-only form */}
          <div className="flex-1 space-y-2">
            <Field label="Name" value={company.name} />
            <Field label="Location" value={company.location} />
            <Field label="Address" value={company.address} />
            <Field label="District" value={company.district} />
            <Field label="Province" value={company.province} />
            <Field label="Postal Code" value={company.postalCode} />
            <Field label="Tel" value={company.tel} />
            <Field label="Region" value={company.region} />
            <Field label="Salary" value={company.salary} />
          </div>
        </div>

        {/* Booking button */}
        <div className="mt-6 text-center">
          <button className="bg-[#3B1F0B] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#5a2f14]">
            Booking Interview
          </button>
        </div>
      </div>
    </div>
  );
}

//read-only input field
function Field({ label, value }: { label: string; value: string }) {
    return (
      <div className="flex items-center space-x-4">
        <label className="w-32 text-sm font-medium text-gray-700 text-right">
          {label}
        </label>
        <input
          type="text"
          value={value}
          readOnly
          className="flex-1 px-4 py-2 border rounded-md bg-gray-100 text-sm text-gray-800"
        />
      </div>
    );
  }
  