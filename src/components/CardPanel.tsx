"use client";

import { useEffect, useState } from "react";
import InteractiveCard from "@/components/InteractiveCard";
import Card from "@/components/Card";

interface CompanyItem {
  _id: string;
  name: string;
  image: string;
  description: string;
}

export default function CardPanel() {
  const [companies, setCompanies] = useState<CompanyItem[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("https://two110503-backend-project-butterbear.onrender.com/api/v1/companies");
        const data = await res.json();
        if (res.ok && data.success) {
          setCompanies(data.data);
        } else {
          console.error("Failed to fetch companies");
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="bg-gray-50 text-center py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Our company</h2>
      <p className="text-gray-600 mb-10">
        Connect with 300+ top companies. One platform. Endless opportunities.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {companies.map((company) => (
          <InteractiveCard
            key={company._id}
            contentName={company.name}
            cid={company._id}
          >
            <Card
              companyName={company.name}
              imgSrc={company.image
                ? company.image
                : "/image/placeholder.jpg"}
              description={company.description}
            />
          </InteractiveCard>
        ))}
      </div>
    </div>
  );
}
