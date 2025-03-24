"use client";

import { useParams } from "next/navigation";

export default function CompanyDetailPage() {
  const { cid } = useParams();

  const companies = [
    {
      _id: "1",
      name: "SCB Company",
      location: "https://maps.app.goo.gl/Loremipsumdolor",
      address: "123 SCB Road",
      district: "Chatuchak",
      province: "Bangkok",
      postalCode: "10900",
      tel: "02-777-7777",
      region: "Central",
      salary: "30,000 THB",
      description:
        "SCB is a leading commercial bank offering full financial services...",
    },
    {
      _id: "2",
      name: "KBank",
      location: "https://maps.app.goo.gl/Somewhere",
      address: "99 Kasikorn Road",
      district: "Bang Kapi",
      province: "Bangkok",
      postalCode: "10240",
      tel: "02-888-8888",
      region: "Central",
      salary: "32,000 THB",
      description: "KBank is Thailand's digital banking leader...",
    },
    {
      _id: "3",
      name: "PTT",
      location: "https://maps.app.goo.gl/PTTmap",
      address: "Energy Complex, Vibhavadi Rangsit Rd",
      district: "Chatuchak",
      province: "Bangkok",
      postalCode: "10900",
      tel: "02-537-2000",
      region: "Central",
      salary: "35,000 THB",
      description: "PTT is the national energy company of Thailand, managing oil, gas, and renewable sectors across the nation and internationally."
    },
  ];

  const company = companies.find((c) => c._id === cid);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF3E2]">
        <p className="text-xl text-red-600 font-semibold">Company not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3B1F0B] py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full px-8 py-10 mx-auto max-w-[95%] md:max-w-[90%]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {company.name}
        </h2>

        <div className="flex flex-col md:flex-row">
          {/* Left side: image + description */}
          <div className="flex-1">
            <img
              src="/image/placeholder.jpg"
              alt={company.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="text-sm text-gray-600 p-3 rounded h-[218px] overflow-y-auto scrollbar-hide">
              {company.description}
            </div>
          </div>

          {/* Right side: read-only field group */}
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

// display-only field
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center space-x-4">
      <label className="w-32 text-sm font-medium text-gray-700 text-right">
        {label}
      </label>
      <div className="flex-1 px-4 py-2 border rounded-md bg-gray-100 text-sm text-gray-800">
        {value}
      </div>
    </div>
  );
}