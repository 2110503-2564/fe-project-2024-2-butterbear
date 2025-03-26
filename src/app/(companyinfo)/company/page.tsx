"use client";

import { useEffect, useState } from "react";
import InteractiveCard from "@/components/InteractiveCard";
import Card from "@/components/Card";

export default function CompanyAllPage() {
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("https://2110503-backend-project-sable.vercel.app//api/v1/companies");
        const data = await res.json();
        if (data.success) {
          setCompanies(data.data);
        } else {
          console.error("Failed to load companies");
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <main className="min-h-screen bg-[#FFFFFF] px-6 py-12">
      <h1 className="text-3xl font-bold text-[#3B1F0B] mb-4">All Companies</h1>

      {loading ? (
        <p className="text-center text-black">Loading companies...</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {companies.map((company) => (
            <InteractiveCard
              key={company._id}
              contentName={company.name}
              cid={company._id}
            >
              <Card
                companyName={company.name}
                imgSrc={
                  company.image
                    ? company.image
                    : "/image/placeholder.jpg"
                }
                description={company.description}
              />
            </InteractiveCard>
          ))}
        </div>
      )}
    </main>
  );
}
