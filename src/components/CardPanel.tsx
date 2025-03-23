"use client";
import Card from "@/components/Card";

export default function CardPanel() {
  const companies = [
    {
      cid: "001",
      name: "SCB",
      image: "/image/bloom.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
    },
    {
      cid: "002",
      name: "KBank",
      image: "/image/sparkspace.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
    },
    {
      cid: "003",
      name: "Krungthai",
      image: "/image/grandtable.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
    },
  ];

  return (
    <div className="bg-gray-50 text-center py-12 px-4">
      {/* Headline */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Our company</h2>
      <p className="text-gray-600 mb-10">
        Connect with 300+ top companies. One platform. Endless opportunities.
      </p>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {companies.map((company) => (
          <Card
            key={company.cid}
            venueName={company.name}
            imgSrc={company.image}
            description={company.description}
          />
        ))}
      </div>
    </div>
  );
}
