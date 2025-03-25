"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CompanyDetailPage() {
  const { cid } = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/companies/${cid}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setCompany(data.data);
        } else {
          console.error("Company not found:", data.message);
          setCompany(null);
        }
      } catch (err) {
        console.error("Error fetching company:", err);
      } finally {
        setLoading(false);
      }
    };

    if (cid) fetchCompany();
  }, [cid]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FFF3E2]">Loading...</div>;
  }

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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{company.name}</h2>

        <div className="flex flex-col md:flex-row">
          {/* Left: image + description */}
          <div className="flex-1">
            <img
              src={`/image/company/${company.image ?? "placeholder.jpg"}`}
              alt={company.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="text-sm text-gray-600 p-3 rounded h-[100px] overflow-y-auto scrollbar-hide">
              {company.description}
            </div>
          </div>

          {/* Right: fields */}
          <div className="flex-1 space-y-2">
            <Field label="Name" value={company.name} />
            <Field label="Location" value={company.location} isLink />
            <Field label="Address" value={company.address} />
            <Field label="District" value={company.district} />
            <Field label="Province" value={company.province} />
            <Field label="Postal Code" value={company.postalcode} />
            <Field label="Tel" value={company.tel} />
            <Field label="Region" value={company.region} />
            <Field label="Website" value={company.website} isLink />
            <Field label="Salary" value={company.salary} />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            className="bg-[#3B1F0B] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#5a2f14]"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                router.push("/login");
              } else {
                router.push(`/booking?cid=${company._id}`);
              }
            }}
          >
            Booking Interview
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex items-center space-x-4">
      <label className="w-32 text-sm font-medium text-gray-700 text-right">
        {label}
      </label>
      <div className="flex-1 px-4 py-2 border rounded-md bg-gray-100 text-sm text-gray-800 break-words">
        {isLink ? (
          <a
            href={value}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
