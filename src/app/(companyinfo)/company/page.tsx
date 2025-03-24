"use client";

import InteractiveCard from "@/components/InteractiveCard";
import Card from "@/components/Card";

export default function CompanyAllPage() {
  const companies = [
    {
      _id: "1",
      name: "SCB",
      description: "Thai commercial bank",
      image: "/image/bloom.jpg",
    },
    {
      _id: "2",
      name: "KBank",
      description: "Kasikornbank - leading digital bank",
      image: "/image/sparkspace.jpg",
    },
    {
      _id: "3",
      name: "PTT",
      description: "Energy company in Thailand",
      image: "/image/grandtable.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFF3E2] px-6 py-12">
      <h1 className="text-3xl font-bold text-[#3B1F0B] mb-4">All Companies</h1>

      <div className="flex flex-wrap gap-6">
        {companies.map((company) => (
          <InteractiveCard
            key={company._id}
            contentName={company.name}
            cid={company._id}
          >
            <Card
              venueName={company.name}
              imgSrc={company.image}
              description={company.description}
            />
          </InteractiveCard>
        ))}
      </div>
    </main>
  );
}