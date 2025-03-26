"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface Company {
  _id: string;
  name: string;
  tel: string;
  website: string;
}

export default function ManageCompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { user } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }
  }, [user]);
  
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await fetch("https://2110503-backend-project-sable.vercel.app/api/v1/companies");
      if (!res.ok) throw new Error("Failed to fetch");
      const responseData = await res.json();
      console.log("Fetched companies:", responseData);
  
      if (Array.isArray(responseData.data)) {
        setCompanies(responseData.data);
      } else {
        console.error("Invalid data format:", responseData);
      }
    } catch (err) {
      console.error("Failed to fetch companies:", err);
    }
  };

  
  const handleDelete = async (cid: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in as admin to delete a company.");
        return;
      }
  
      const res = await fetch(`https://2110503-backend-project-sable.vercel.app/api/v1/companies/${cid}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        const data = await res.json();
        alert("Delete failed: " + data.message);
        throw new Error("Delete failed");
      }

      fetchCompanies();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };  

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Company</h1>
        <Link href="/admin/company/add">
          <button className="bg-[#3B1F0B] text-white px-4 py-2 rounded hover:bg-[#5a2f14]">
            + Add Company
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto text-black">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Telephone</th>
              <th className="px-4 py-2">Website</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="border-t border-gray-300">
                <td className="px-4 py-2">{company.name}</td>
                <td className="px-4 py-2">{company.tel}</td>
                <td className="px-4 py-2 text-blue-600 underline">
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Link href={`/admin/company/${company._id}`}>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(company._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No companies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
