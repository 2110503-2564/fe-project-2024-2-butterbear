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
        const res = await fetch("http://localhost:5000/api/v1/companies");
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

  const convertDriveUrl = (url: string): string => {
    const match = url.match(/\/d\/([^/]+)\//);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }

    const idParamMatch = url.match(/id=([^&]+)/);
    if (idParamMatch && idParamMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${idParamMatch[1]}`;
    }

    return url;
  };

  return (
    <main className="min-h-screen bg-[#FFF3E2] px-6 py-12">
      <h1 className="text-3xl font-bold text-[#3B1F0B] mb-4">All Companies</h1>

      {loading ? (
        <p className="text-center">Loading companies...</p>
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
                    ? `/image/company/${company.image}`
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
